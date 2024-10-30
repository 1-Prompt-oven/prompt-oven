import React from "react"
import CategoryItem from "@/components/main/atom/CategoryItem"

interface CategoryListProps {
	categories: { title: string; images: string[] }[]
}

function CategoryList({ categories }: CategoryListProps) {
	return (
		<div className="flex flex-wrap justify-center gap-4">
			{categories.map((category, index) => (
				<CategoryItem
					// eslint-disable-next-line react/no-array-index-key -- This is a list of static items // todo 이미지를 API에서 패치해서 받아올 예정
					key={index}
					title={category.title}
					images={category.images}
				/>
			))}
		</div>
	)
}

export default CategoryList
