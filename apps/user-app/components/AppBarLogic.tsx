"use client"

import { Appbar } from "@repo/ui/AppBar"
import { signIn, signOut, useSession } from "next-auth/react"

const AppBarLogic = () => {
    const session=useSession()
  return (
    <div> 
      <Appbar onSignin={()=>signIn()} onSignout={()=>signOut()} user={session.data?.user}/>
    </div>
  )
}

export default AppBarLogic
