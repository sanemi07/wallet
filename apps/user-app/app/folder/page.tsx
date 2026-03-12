"use client"
import {useBalance} from "@repo/store/useBalance"


export default function Page() {
  const balance=useBalance()
  
  return <div>hii there {balance}</div>;
}
