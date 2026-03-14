import { OnRampStatus, prisma } from "@repo/db";
import express from "express";
import { z } from "zod";

const app = express();

const hookSchema = z.object({
  userId: z.coerce.number().int().positive(),
  token: z.string().min(1),
  amount: z.coerce.number().int().positive(),
});

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  try {
    const parsedInput = hookSchema.safeParse(req.body);

    if (!parsedInput.success) {
      return res.status(400).json({
        message: "invalid payload",
        errors: parsedInput.error.flatten(),
      });
    }

    const { userId, token, amount } = parsedInput.data;

    await prisma.$transaction([
      prisma.balance.update({
        where: { userId },
        data: {
          amount: {
            increment: amount,
          },
        },
      }),
      prisma.onRampTransaction.updateMany({
        where: {
          userId,
          token,
        },
        data: {
          status: OnRampStatus.Success,
        },
      }),
    ]);

    return res.status(200).json({
      message: "captured",
    });
  } catch (error) {
    console.error("bank webhook failed", error);

    return res.status(500).json({
      message: "internal server error",
    });
  }
});

app.listen(3003, () => {
  console.log("bank webhook running on port 3003");
});
