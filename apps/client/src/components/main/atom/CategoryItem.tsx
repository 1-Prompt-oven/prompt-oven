import React from "react"
import { Card, CardContent } from "@repo/ui/card"
import Image from "next/image"

interface CategoryItemProps {
	title: string
	images: string[]
}
// todo 해당 컴포넌트를 누를 시에 특정 경로로 이동할 수 있도록 수정할 예정 (href 추가)
function CategoryItem({ title, images }: CategoryItemProps) {
	return (
		<Card className="relative box-border h-[340px] w-[340px] overflow-hidden rounded-[10px] bg-[#111111]">
			<CardContent className="flex gap-[10px] p-5">
				{/* Tall image on the left */}
				<div className="relative h-[250px] w-[145px] overflow-hidden rounded-[10px]">
					<Image
						sizes="(max-width: 145px) 100vw, 145px"
						src={images[0] || "/placeholder.jpg"}
						alt={`${title} image 1`}
						fill
						style={{ objectFit: "cover" }}
					/>
				</div>
				{/* Two square images stacked vertically on the right */}
				<div className="flex flex-col gap-[10px]">
					<div className="relative h-[122px] w-[145px] overflow-hidden rounded-[10px]">
						<Image
							sizes="(max-width: 145px) 100vw, 145px"
							src={images[1] || "/placeholder.jpg"}
							alt={`${title} image 2`}
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>
					<div className="relative h-[122px] w-[145px] overflow-hidden rounded-[10px]">
						<Image
							sizes="(max-width: 145px) 100vw, 145px"
							src={images[2] || "/placeholder.jpg"}
							alt={`${title} image 3`}
							fill
							style={{ objectFit: "cover" }}
						/>
					</div>
				</div>
			</CardContent>
			<div className="absolute bottom-0 left-0 right-0 flex h-[49px] items-center justify-center pb-[20px]">
				<h3 className="font-sora text-[21px] font-semibold leading-[29px] text-white">
					{title}
				</h3>
			</div>
		</Card>
	)
}

export default CategoryItem
