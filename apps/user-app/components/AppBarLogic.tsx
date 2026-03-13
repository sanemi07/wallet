"use client"

import { Appbar } from "@repo/ui/AppBar"
import { signIn, signOut } from "next-auth/react"

const AppBarLogic = () => {
  return (
    <div> 
      <Appbar onSignin={()=>signIn()} onSignout={()=>signOut()}/>
    </div>
  )
}

export default AppBarLogic
