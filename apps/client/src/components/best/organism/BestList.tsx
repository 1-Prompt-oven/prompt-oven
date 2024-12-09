import React from "react"
import type { BestCreatorDataTypes } from "@/types/best/bestTypes"
import { BestCreatorListItem } from "../molecule/BestCreatorListItem"

interface BestListProps<T> {
	data: T[]
}

function BestList({ data }: BestListProps<BestCreatorDataTypes>) {
	return (
		<div className="mx-auto w-full max-w-[1716px]">
			<div>
				<div className="ml-2 grid grid-cols-6 gap-5 px-6 py-4 text-lg font-semibold text-white">
					<div>Rank</div>
					<div className="col-span-2">Creator&apos;s Name</div>
					<div className="col-span-3">Creator&apos;s Tag</div>
				</div>
				<div className="h-1 w-full bg-rose-200" />
			</div>
			{data.map((creator) => (
				<BestCreatorListItem key={creator.id} {...creator} />
			))}
		</div>
	)
}

export default BestList

