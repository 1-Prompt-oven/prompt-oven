"use client"

import React, { useCallback } from "react"
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
import SellerListTitle from "../atoms/SellorListTitle"

interface SellerBoardProps {
	initialData: GetSellerProductListResponseType
	initialRequest: GetSellerProductListRequestType
	sellerName: string
	userName: string
}

export default function SellerBoard({
	initialData,
	initialRequest,
	sellerName,
	userName,
}: SellerBoardProps) {
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

	const sellerListTitleProps = {
		sellerUuid: initialRequest.sellerUuid,
		sellerName,
		userName,
	}

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
		router.push(`/profile/seller/${sellerName}?${newParams.toString()}`)
	}

	const handleSearch = (searchTerm: string) => {
		updateQueryParams({ searchBar: searchTerm, page: 0 })
	}

	const handleSort = (
		sortOption: "price" | "sells" | "createdAt",
		sortBy: "ASC" | "DESC",
	) => {
		updateQueryParams({ sortOption, sortBy, page: 0 })
	}

	const handleStatusChange = (_status: ProductStatusOption) => {
		const { enable, temporary } = extractProductStatusOption(_status)

		updateQueryParams({
			enable,
			temporary,
			page: 0,
		})
	}

	const handleNextPage = () => {
		// note:  현재 커서 위치를 알아야 이전 커서 위치를 저장할 수 있을 거 같음
		updateQueryParams({ page: initialData.number + 1 })
	}
	const handlePrevPage = () => {
		// note: 추가 정보가 있어야 구현 가능함
		updateQueryParams({ page: initialData.number - 1 })
	}

	return (
		<div className="mx-auto flex w-full flex-col items-center justify-center gap-4 px-4 sm:px-6 lg:px-8">
			<SellerListTitle initialRequest={sellerListTitleProps} />

			<SpProductFilter
				onSearch={handleSearch}
				onSort={handleSort}
				onStatusChange={handleStatusChange}
				initSort={initialRequest.sortOption}
				initSortDirection={initialRequest.sortBy}
				initStatus={status as ProductStatusOption}
			/>

			<SpProductTable products={initialData.content} />

			<SpPaginationControls
				className="mt-4"
				total={initialData.totalElements}
				currentPage={initialData.number}
				pageSize={initialData.size}
				hasNext={!initialData.last}
				onPrevPage={handlePrevPage}
				onNextPage={handleNextPage}
				isFirstPage={initialData.first}
			/>
		</div>
	)
}
