"use client"

import { Appbar } from "@repo/ui/AppBar"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


const AppBarLogic = () => {
    const session=useSession()
    const router=useRouter()
  return (

      <Appbar onSignin={()=>signIn()} onSignout={async()=>{
        
        signOut()
        router.push('/api/auth/signin')
       

      }} user={session.data?.user}/>
   
  )
}


export default AppBarLogic
