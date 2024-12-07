import { MoreHorizontal, Edit, Trash2 } from "@repo/ui/lucide"
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
import { cn } from "@/lib/utils"
import type { GetSellerProductResultType } from "@/types/product/productUpsertType"
import { extractProductStatusOptionReverse } from "@/lib/sellerProduct.ts"

interface ProductTableProps {
	products: GetSellerProductResultType[]
}

const TableHeadList = ["Product Name", "Price", "Sold", "Status", "Action"]

export default function ProductTable({ products }: ProductTableProps) {
	return (
		<div className={cn("hide-scrollbar w-full max-w-[1070px] overflow-x-auto")}>
			<table className="w-full border-collapse">
				<thead>
					<tr className="bg-po-black-200 text-white">
						{TableHeadList.map((head, index) => (
							<th
								// eslint-disable-next-line react/no-array-index-key -- it's a static list
								key={index}
								className="whitespace-nowrap p-4 text-left text-sm font-medium">
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
									<div className="flex items-center">
										<div className="mr-4 h-[40px] w-[56px] rounded-lg bg-blue-600/20" />
										<span className="text-sm text-white">
											{product.productName}
										</span>
									</div>
								</td>
								<td className="p-4 text-sm text-white">
									${product.price.toFixed(2)}
								</td>
								<td className="p-4 text-sm text-white">{product.sells}</td>
								<td className="p-4">
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
								<td className="p-4">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" className="h-8 w-8 p-0">
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
											<DropdownMenuItem className="text-white hover:bg-opacity-75">
												<Edit className="mr-2 h-4 w-4" />
												Edit
											</DropdownMenuItem>
											<DropdownMenuItem className="text-white hover:bg-opacity-75">
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
		</div>
	)
}