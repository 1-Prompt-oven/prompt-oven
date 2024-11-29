"use client"

import { createContext, useContext } from "react"

export const SessionContext = createContext<boolean | null>(null)

export const useSession = () => useContext(SessionContext)
