import { useEffect, useState } from "react"
import { RadioGroup, RadioGroupItem } from "@repo/ui/radio-group"
import { Label } from "@repo/ui/label"
import { getSubCategory } from "@/action/prompts/getCategoryData"
import type { CategoryType } from "@/types/prompts/categoryType"

export function PromptsFilterCategory({
	categoryList,
	topCategoryUUID,
	selectedValue,
	setTopCategoryUUID,
	setSelectedValue,
}: {
	categoryList: CategoryType[]
	topCategoryUUID: string
	selectedValue: string
	setTopCategoryUUID: (uuid: string) => void
	setSelectedValue: (value: string) => void
}) {
	const [subCategories, setSubCategories] = useState<
		Record<string, CategoryType[]>
	>({})
	const [openCategory, setOpenCategory] = useState<string | null>(null)

	const handleChange = async (selected: string) => {
		if (!(selected in subCategories)) {
			const res = await getSubCategory(selected)
			setSubCategories((prev) => ({
				...prev,
				[selected]: res,
			}))
		}
		setSelectedValue(selected) // 선택된 값 업데이트
	}

	const toggleCategory = (categoryUuid: string) => {
		setOpenCategory((prev) => (prev === categoryUuid ? null : categoryUuid))
	}

	const handleCategoryClick = (categoryUuid: string) => {
		setTopCategoryUUID(categoryUuid) // topCategoryUUID 업데이트
		handleChange(categoryUuid) // 선택된 값 업데이트
		toggleCategory(categoryUuid) // 카테고리 열기/닫기
	}

	// topCategoryUUID가 빈 문자열일 때 openCategory를 null로 설정
	useEffect(() => {
		if (topCategoryUUID === "") {
			setOpenCategory(null)
		}
	}, [topCategoryUUID])

	return (
		<RadioGroup value={selectedValue} onValueChange={handleChange}>
			<input type="hidden" name="topCategoryUuid" value={topCategoryUUID} />
			<input
				type="hidden"
				name="subCategoryUuid"
				value={topCategoryUUID === selectedValue ? "" : selectedValue}
			/>
			<ul className="space-y-2">
				{categoryList.map((category) => (
					<li key={category.categoryUuid} className="flex flex-col">
						<button
							className="flex w-full cursor-pointer items-center justify-between rounded bg-gray-700 p-2 text-left"
							type="button"
							onClick={() => handleCategoryClick(category.categoryUuid)}
							onKeyPress={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									handleCategoryClick(category.categoryUuid)
								}
							}}
							aria-expanded={openCategory === category.categoryUuid} // 접근성을 위한 속성 추가
						>
							<p className="flex items-center space-x-2 text-sm text-white">
								{category.categoryName}
							</p>
							<p className="text-white focus:outline-none">
								{openCategory === category.categoryUuid ? "-" : "+"}
							</p>
						</button>

						{openCategory === category.categoryUuid &&
						Array.isArray(subCategories[category.categoryUuid]) &&
						subCategories[category.categoryUuid].length > 0 ? (
							<ul className="my-4 ml-4 space-y-2">
								<li className="flex items-center space-x-2">
									<RadioGroupItem
										value={category.categoryUuid} // ALL의 value 설정
										checked={selectedValue === category.categoryUuid} // ALL이 선택된 경우 체크
										id="ALL"
										className="rounded-sm border-white/70 text-white"
										isRectangle
									/>
									<Label htmlFor="ALL" className="text-sm text-white">
										ALL
									</Label>
								</li>
								{subCategories[category.categoryUuid].map((subCategory) => (
									<li
										key={subCategory.categoryUuid}
										className="flex items-center space-x-2">
										<RadioGroupItem
											value={subCategory.categoryUuid}
											checked={selectedValue === subCategory.categoryUuid} // 선택된 경우 체크
											id={subCategory.categoryUuid}
											className="rounded-sm border-white/70 text-white"
											isRectangle
										/>
										<Label
											htmlFor={subCategory.categoryUuid}
											className="text-sm text-white">
											{subCategory.categoryName}
										</Label>
									</li>
								))}
							</ul>
						) : null}
					</li>
				))}
			</ul>
		</RadioGroup>
	)
}
