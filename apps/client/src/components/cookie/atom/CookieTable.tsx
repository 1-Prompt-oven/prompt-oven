"use client"

import { Badge } from "@repo/ui/badge"
import dayjs from "dayjs"
import { cn } from "@/lib/utils"
import type { GetCookieResultType } from "@/types/cookie/cookieTableType"
import { CookieEmptyState } from "./CookieEmptyState"

interface CookieTableProps {
	cookies: GetCookieResultType[]
}

const TableHeadList = ["Number", "Status", "Amount", "Remain", "Date"]

export default function CookieTable({ cookies }: CookieTableProps) {
	return (
		<div className={cn("hide-scrollbar w-full max-w-[1070px] overflow-x-auto")}>
			{cookies.length === 0 ? (
				<CookieEmptyState />
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
										index === 0 ? "w-[20%]" : "w-[15%]",
									)}>
									{head}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{cookies.map((cookie, index) => (
							<tr
								// eslint-disable-next-line react/no-array-index-key -- TableHeadList is static
								key={index}
								className="border-b border-white/15 bg-po-black-200">
								<td className="w-[10%] p-4 text-sm text-white">{index + 1}</td>
								<td className="w-[20%] p-4 text-sm text-white">
									<Badge
										className={
											cookie.paymentType === "USE"
												? "bg-[#424242] hover:bg-[#525252]"
												: "bg-po-purple-100 hover:bg-[#8A10D0]"
										}>
										{cookie.paymentType}
									</Badge>
								</td>
								<td className="w-[20%] p-4 text-sm text-white">
									{cookie.cookieAmount}
								</td>
								<td className="w-[20%] p-4 text-sm text-white">
									{cookie.quantity}
								</td>
								<td className="w-[30%] p-4 text-sm text-white">
									{dayjs(cookie.approvedAt).format("YYYY-MM-DD")}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}
