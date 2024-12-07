"use client"

import { useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import SpProductTable from "@/components/seller/molecule/SpProductTable"
import { SpProductFilter } from "@/components/seller/molecule/SpProductFilter.tsx"
import type {
	GetSellerProductListRequestType,
	GetSellerProductListResponseType,
} from "@/types/product/productUpsertType"
import SpPaginationControls from "@/components/seller/atom/SpPaginationControl.tsx"
import {
	extractProductStatusOption,
	extractProductStatusOptionReverse,
} from "@/lib/sellerProduct.ts"
import type { ProductStatusOption } from "@/types/seller/sellerProduct.ts"

interface ProductDashboardProps {
	initialData: GetSellerProductListResponseType
	initialRequest: GetSellerProductListRequestType
}

export default function SpProductDashboard({
	initialData,
	initialRequest,
}: ProductDashboardProps) {
	const router = useRouter()
	const searchParams = useSearchParams()

	const extractStatus = useCallback(
		(enable: boolean, temporary: boolean) => {
			return extractProductStatusOptionReverse({ enable, temporary })
		},
		[initialRequest.enable, initialRequest.temporary],
	)
	const status = extractStatus(
		initialRequest.enable ?? true,
		initialRequest.temporary ?? false,
	)

	const updateQueryParams = (
		params: Partial<GetSellerProductListRequestType>,
	) => {
		const newParams = new URLSearchParams(searchParams.toString())
		Object.entries(params).forEach(([key, value]) => {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- we want to remove the key if value is undefined
			if (value === undefined) {
				newParams.delete(key)
			} else {
				newParams.set(key, value.toString())
			}
		})
		router.push(`/account?${newParams.toString()}`)
	}

	const handleSearch = (searchTerm: string) => {
		updateQueryParams({ searchBar: searchTerm, cursorId: undefined })
	}

	const handleSort = (
		sortOption: "price" | "sells" | "createdAt",
		sortBy: "ASC" | "DESC",
	) => {
		updateQueryParams({ sortOption, sortBy, cursorId: undefined })
	}

	const handleStatusChange = (_status: ProductStatusOption) => {
		const { enable, temporary } = extractProductStatusOption(_status)

		updateQueryParams({
			enable,
			temporary,
			cursorId: undefined,
		})
	}

	const handleNextPage = () => {
		//  updateQueryParams({ cursorId: data.nextCursorId })
	}
	const handlePrevPage = () => {
		//	updateQueryParams({ cursorId: data.prevCursorId })
	}

	return (
		<div className="mx-auto w-full max-w-[1070px] px-4 sm:px-6 lg:px-8">
			<SpProductFilter
				onSearch={handleSearch}
				onSort={handleSort}
				onStatusChange={handleStatusChange}
				initSort={initialRequest.sortOption}
				initSortDirection={initialRequest.sortBy}
				initStatus={status as ProductStatusOption}
			/>
			<SpProductTable products={initialData.productList} />
			<div className="mt-4 flex items-center justify-between">
				<SpPaginationControls
					hasNext={initialData.hasNext}
					onPrevPage={handlePrevPage}
					onNextPage={handleNextPage}
					isFirstPage={!initialRequest.cursorId}
				/>
			</div>
		</div>
	)
}
