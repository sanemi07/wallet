"use client"

import { StoreProvider } from "@repo/store/provider"
import { SessionProvider } from "next-auth/react"

export const Providers=({children}:{children:React.ReactNode})=>{
    return <StoreProvider>
        <SessionProvider>
        {children}
        </SessionProvider>
        </StoreProvider>
}
