"use client"

import { Button } from "@repo/ui/button"
import { Card, CardContent } from "@repo/ui/card"
import { ArrowLeft, CheckCircle2, ExternalLink } from "@repo/ui/lucide"
import Link from "next/link"
import type { CreateProductQueryParams } from "@/types/account/searchParams.ts"

interface CreateSuccessPageProps {
	searchParams: CreateProductQueryParams
}
export default function CreateSuccessPage({
	searchParams,
}: CreateSuccessPageProps) {
	return (
		<div className="flex min-h-screen items-center justify-center bg-[#111111] p-4">
			<Card className="w-full max-w-2xl border-[#A913F9]/20 bg-[#1B1818]">
				<CardContent className="p-6">
					<div className="mb-8 flex flex-col items-center justify-center space-y-4">
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#A913F9]/10">
							<CheckCircle2 className="h-8 w-8 text-[#A913F9]" />
						</div>
						<h1 className="text-center text-2xl font-semibold text-white">
							Product Registration Complete!
						</h1>
						<p className="text-center text-[#94A3B8]">
							Your product has been successfully registered and is now ready for
							review.
						</p>
					</div>

					<div className="mb-8 space-y-6">
						<div className="rounded-lg bg-black/50 p-4">
							<h2 className="mb-4 font-medium text-[#E2ADFF]">
								Product Details
							</h2>
							<dl className="space-y-2">
								<div className="flex justify-between">
									<dt className="text-[#94A3B8]">Status</dt>
									<dd className="text-white">Pending Review</dd>
								</div>
								<div className="flex justify-between">
									<dt className="text-[#94A3B8]">Product ID</dt>
									<dd className="text-white">{searchParams.productName}</dd>
								</div>
								<div className="flex justify-between">
									<dt className="text-[#94A3B8]">Submission Date</dt>
									<dd className="text-white">
										{new Date().toLocaleDateString()}
									</dd>
								</div>
							</dl>
						</div>
					</div>

					<div className="flex flex-col gap-4 sm:flex-row">
						<Button
							variant="outline"
							className="flex-1 border-[#A913F9] text-[#E2ADFF] hover:bg-[#A913F9] hover:text-white"
							asChild>
							<Link href="/products">
								<ArrowLeft className="mr-2 h-4 w-4" />
								Back to Products
							</Link>
						</Button>
						<Button
							className="flex-1 bg-[#A913F9] text-white hover:bg-[#A913F9]/90"
							asChild>
							<Link href="/account?view=product-list">
								Go to Product List
								<ExternalLink className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
