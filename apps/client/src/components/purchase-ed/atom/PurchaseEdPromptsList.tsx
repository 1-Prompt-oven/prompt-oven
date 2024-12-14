import Image from "next/image"
import Link from "next/link"
import type { PurchaseSearchWithDetailProps } from "@/types/purchase.ts/purchase-ongoing"

interface PurchaseEdPromptsListProps {
	purchaseUuid: string
	purchaseItem: PurchaseSearchWithDetailProps[] | undefined
}

export default function PurchaseEdPromptsList({
	purchaseItem,
}: PurchaseEdPromptsListProps) {
	return (
		<ul className="grid max-w-[800px] grid-cols-2 gap-2 sm:!grid-cols-4">
			{purchaseItem?.length !== undefined && purchaseItem.length > 0
				? purchaseItem.map((item) => (
						<li key={item.productDetail.contents[0].contentUrl}>
							<Link
								href={`/prompt-detail/${item.productUuid}`}
								className="flex flex-col gap-1">
								<div className="relative h-[100px] w-[100px] rounded-md xl:!h-[150px] xl:!w-[150px]">
									<Image
										src={item.productDetail.contents[0].contentUrl}
										width={150}
										height={150}
										alt={item.productDetail.description}
										className="rounded-md bg-white"
										priority
										unoptimized
									/>
								</div>
								<div className="w-[100px] xl:!w-[150px]">
									<p className="text-[10px] text-white md:!text-xs">
										{item.productDetail.productName}
									</p>
								</div>
							</Link>
						</li>
					))
				: null}
		</ul>
	)
}
