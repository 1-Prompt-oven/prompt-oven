"use client"

import { Button } from "@repo/ui/button"
import { Card, CardContent } from "@repo/ui/card"
import { ArrowLeft, CheckCircle2, ExternalLink } from "@repo/ui/lucide"
import Link from "next/link"
import type { CreateProductQueryParams } from "@/types/account/searchParams.ts"

interface CreateProductSuccessPageProps {
	searchParams: CreateProductQueryParams
}
export default function CreateProductSuccessPage({
	searchParams,
}: CreateProductSuccessPageProps) {
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="w-full max-w-2xl border-po-purple-100/50 bg-po-black-200">
				<CardContent className="p-6">
					<div className="mb-8 flex flex-col items-center justify-center space-y-4">
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-po-purple-100/10">
							<CheckCircle2 className="h-8 w-8 text-po-purple-100" />
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
							<h2 className="mb-4 font-medium text-po-purple-50">
								Product Details
							</h2>
							<dl className="space-y-2">
								<div className="flex justify-between">
									<dt className="text-[#94A3B8]">Status</dt>
									<dd className="text-white">Approved</dd>
									{/*<dd className="text-white">Pending Review</dd>*/}
								</div>
								<div className="flex justify-between">
									<dt className="text-[#94A3B8]">Product Name</dt>
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
							className="flex-1 border-po-purple-100 text-po-purple-50 hover:bg-po-purple-100 hover:text-white"
							asChild>
							<Link href="/account?view=product-list">
								<ArrowLeft className="mr-2 h-4 w-4" />
								Back to Products
							</Link>
						</Button>
						<Button
							className="flex-1 bg-po-purple-100 text-white hover:bg-po-purple-100/90"
							asChild>
							{/* todo: 판매자 상품 상세 페이지로 이동시키기 */}
							<Link href={`/prompt-detail/${searchParams.productUuid}`}>
								View Product
								<ExternalLink className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
