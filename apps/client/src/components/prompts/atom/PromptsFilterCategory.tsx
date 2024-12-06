import { useEffect, useState } from "react"
import { RadioGroup, RadioGroupItem } from "@repo/ui/radio-group"
import { Label } from "@repo/ui/label"
import { getSubCategory } from "@/action/prompts/getCategoryData"
import type { CategoryType } from "@/types/prompts/categoryType"

interface SelectCategoryValue {
	top: string | null
	sub: string | null
}

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

	const [selectedCategory, setSelectedCategory] = useState<SelectCategoryValue>(
		{ top: null, sub: null },
	)

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

	const handleCategoryClick = (categoryUuid: string, categoryName: string) => {
		if (topCategoryUUID !== categoryUuid) {
			setTopCategoryUUID(categoryUuid) // topCategoryUUID 업데이트
			handleChange(categoryUuid) // 선택된 값 업데이트
		}
		toggleCategory(categoryUuid) // 카테고리 열기/닫기

		setSelectedCategory((prevState) => {
			if (prevState.top !== categoryName) {
				return {
					...prevState,
					top: categoryName,
					sub: "ALL",
				}
			}
			return prevState
		})
	}

	const changeName = (categoryName: string) => {
		setSelectedCategory((prevState) => ({
			...prevState,
			sub: categoryName,
		}))
	}

	useEffect(() => {
		if (topCategoryUUID === "") {
			setOpenCategory(null)

			setSelectedCategory((prevState) => ({
				...prevState,
				top: null,
				sub: null,
			}))
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

			{selectedCategory.top ? (
				<div className="flex items-center gap-2 text-xs text-white">
					<p className="rounded-lg bg-[#524f4f] px-3 py-[2px]">
						{selectedCategory.top}
					</p>

					{selectedCategory.sub !== "ALL" ? (
						<p className="rounded-lg bg-[#524f4f] px-3 py-[2px]">
							{selectedCategory.sub}
						</p>
					) : null}
				</div>
			) : null}

			<ul className="relative z-[10] grid grid-cols-2 gap-2">
				{categoryList.map((category) => (
					<li key={category.categoryUuid} className="flex flex-col">
						<button
							type="button"
							className="flex w-full cursor-pointer items-center justify-between rounded bg-gray-700 p-2 text-left"
							onClick={() =>
								handleCategoryClick(
									category.categoryUuid,
									category.categoryName,
								)
							}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									handleCategoryClick(
										category.categoryUuid,
										category.categoryName,
									)
									e.preventDefault() // 기본 동작 방지
								}
							}}
							tabIndex={0} // 버튼은 기본적으로 키보드 탐색 가능
						>
							<p className="flex items-center space-x-2 text-sm text-white">
								{category.categoryName}
							</p>
							<p className="text-white focus:outline-none">
								{openCategory === category.categoryUuid ? "-" : "+"}
							</p>
						</button>

						<div className="absolute top-[40px] rounded-md bg-gradient-to-r from-[#3F1C24] to-[#262038] md:left-[170px] md:top-[0] md:min-w-[200px] lg:left-[185px]">
							{openCategory === category.categoryUuid &&
							Array.isArray(subCategories[category.categoryUuid]) &&
							subCategories[category.categoryUuid].length > 0 ? (
								<ul className="my-4 ml-4 mr-6 flex flex-col space-y-2 pl-1">
									<li className="flex items-center space-x-2">
										<RadioGroupItem
											value={category.categoryUuid} // ALL의 value 설정
											id="ALL"
											className="rounded-sm border-white/70 text-white"
											isRectangle
											onClick={() => changeName("ALL")}
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
												checked={
													selectedCategory.sub === subCategory.categoryName
												}
												id={subCategory.categoryUuid}
												className="rounded-sm border-white/70 text-white"
												isRectangle
												onClick={() => changeName(subCategory.categoryName)}
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
						</div>
					</li>
				))}
			</ul>
		</RadioGroup>
	)
}
