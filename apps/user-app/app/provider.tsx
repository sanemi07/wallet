"use client"

import { StoreProvider } from "@repo/store/provider"

export const Providers=({children}:{children:React.ReactNode})=>{
    return <StoreProvider>
        {children}
        </StoreProvider>
}
