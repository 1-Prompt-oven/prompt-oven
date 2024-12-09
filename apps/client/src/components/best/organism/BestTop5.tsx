import React from "react"
import type { BestCreatorDataTypes } from "@/types/best/bestTypes"
import BestTop5Card from "../molecule/BestTop5Card"

interface BestListProps<T> {
	data: T[]
}
function BestTop5({ data }: BestListProps<BestCreatorDataTypes>) {
	const top1Data = data[0]
	const restData = data.slice(1, 5)
	return (
		<div className="container mx-auto p-8">
			<div className="grid grid-cols-1 gap-8">
				<div className="flex justify-center">
					<BestTop5Card key={top1Data.id} {...top1Data} />
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8">
					{restData.map((creator) => (
						<BestTop5Card key={creator.id} {...creator} />
					))}
				</div>
			</div>
		</div>
	)
}

export default BestTop5
