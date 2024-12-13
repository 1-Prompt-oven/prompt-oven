"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"

const queryClient = new QueryClient()

export interface QueryProviderProps {
	children: React.ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
