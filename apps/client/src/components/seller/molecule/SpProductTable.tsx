"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Trash2 } from "@repo/ui/lucide"
import { Button } from "@repo/ui/button"
import { Badge } from "@repo/ui/badge"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { GetSellerProductResultType } from "@/types/product/productUpsertType"
import { extractProductStatusOptionReverse } from "@/lib/sellerProduct.ts"
import { SpEmptyState } from "@/components/seller/atom/SpEmtpyState.tsx"
import SpDeleteProductConfirmDialog from "@/components/seller/atom/SpDeleteProductConfirmDialog.tsx"
import { deleteProduct } from "@/action/product/productAction.ts"
import SpProductThumbnail from "@/components/seller/atom/SpProductThumbnail.tsx"

export type ProductUuid = string

interface ProductTableProps {
	products: GetSellerProductResultType[]
}

const TableHeadList = ["Product Name", "Price", "Sold", "Status", "Action"]

export default function ProductTable({ products }: ProductTableProps) {
	const router = useRouter()
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [productToDelete, setProductToDelete] =
		useState<GetSellerProductResultType | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const handleDeleteClick = (product: GetSellerProductResultType) => {
		setProductToDelete(product)
		setDeleteDialogOpen(true)
	}

	const handleDeleteConfirm = async () => {
		if (productToDelete) {
			setIsLoading(true)
			await deleteProduct({ productUuid: productToDelete.productUuid })
			setIsLoading(false)
			setDeleteDialogOpen(false)
			setProductToDelete(null)
			router.refresh()
		}
	}

	const handleEditClick = (productUuid: string) => {
		// note: 현재는 생성 페이지로 이동함 -- 기능상 크게 문제는 없음
		router.push(
			`/account?view=create-product&step=1&productUuid=${productUuid}`,
		)
	}

	return (
		<>
			<div
				className={cn("hide-scrollbar w-full max-w-[1070px] overflow-x-auto")}>
				{products.length === 0 ? (
					<SpEmptyState />
				) : (
					<table className="w-full border-collapse">
						<thead>
							<tr className="bg-po-black-200 text-white">
								{TableHeadList.map((head, index) => (
									<th
										// eslint-disable-next-line react/no-array-index-key -- it's a static list
										key={index}
										className={cn(
											"whitespace-nowrap p-4 text-left text-sm font-medium",
											index === 0 ? "w-[40%]" : "w-[15%]",
										)}>
										{head}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{products.map((product) => {
								const status = extractProductStatusOptionReverse({
									enable: product.enable,
									temporary: product.temporary,
								})
								return (
									<tr
										key={product.productUuid}
										className="border-b border-white/15 bg-po-black-200">
										<td className="p-4 text-left">
											<Link
												className="cursor-pointer"
												href={`/prompt-detail/${product.productUuid}`}>
												<div className="flex items-center">
													<SpProductThumbnail
														thumbnail={product.thumbnailUrl}
														productName={product.productName}
													/>
													<span className="max-w-[200px] truncate text-sm text-white">
														{product.productName}
													</span>
												</div>
											</Link>
										</td>
										<td className="w-[15%] p-4 text-sm text-white">
											₩{product.price.toFixed(2)}
										</td>
										<td className="w-[15%] p-4 text-sm text-white">
											{product.sells}
										</td>
										<td className="w-[15%] p-4">
											<Badge
												className={
													// eslint-disable-next-line no-nested-ternary -- it's a static list
													status === "draft"
														? "bg-[#424242] hover:bg-[#525252]"
														: status === "approved"
															? "bg-po-purple-100 hover:bg-[#8A10D0]"
															: "bg-[#FF4D4F] hover:bg-[#D93F41]"
												}>
												{
													// eslint-disable-next-line no-nested-ternary -- it's a static list
													status === "draft"
														? "Draft"
														: status === "approved"
															? "Approved"
															: "Declined"
												}
											</Badge>
										</td>
										<td className="w-[15%] p-4">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant="ghost"
														className="h-8 w-8 p-0 transition-opacity duration-200 hover:bg-transparent hover:opacity-75">
														<span className="sr-only">Open menu</span>
														<MoreHorizontal className="h-4 w-4 text-white" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent
													align="end"
													className="border-[#E2ADFF]/25 bg-[#120F1E]">
													<DropdownMenuLabel className="text-white">
														Actions
													</DropdownMenuLabel>
													<DropdownMenuSeparator className="bg-white/15" />
													<DropdownMenuItem
														className="cursor-pointer text-white hover:bg-opacity-75"
														onClick={() =>
															handleEditClick(product.productUuid)
														}>
														<Edit className="mr-2 h-4 w-4" />
														Edit
													</DropdownMenuItem>
													<DropdownMenuItem
														className="cursor-pointer text-white hover:bg-opacity-75"
														onClick={() => handleDeleteClick(product)}>
														<Trash2 className="mr-2 h-4 w-4" />
														Delete
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				)}
			</div>

			<SpDeleteProductConfirmDialog
				isOpen={deleteDialogOpen}
				isLoading={isLoading}
				onClose={() => {
					setDeleteDialogOpen(false)
					setProductToDelete(null)
				}}
				onConfirm={handleDeleteConfirm}
				productName={productToDelete?.productName || ""}
			/>
		</>
	)
}
