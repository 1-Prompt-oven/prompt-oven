import { useState } from "react"
import { Label } from "@repo/ui/label"
import { RadioGroup, RadioGroupItem } from "@repo/ui/radio-group"
import { Button } from "@repo/ui/button"
import { getSubCategory } from "@/action/prompts/getCategoryData"
import type { CategoryType } from "@/types/prompts/categoryType"

interface SelectCategoryValue {
	top: {
		uuid: string | null
		name: string | null
	}
	sub: {
		uuid: string | null
		name: string | null
	}
}

export function PromptsFilterCategory({
	categoryList,
	topCategoryUUID,
	topCategoryName,
	subCategoryUUID,
	subCategoryName,
}: {
	categoryList: CategoryType[]
	topCategoryUUID: string
	topCategoryName: string
	subCategoryUUID: string
	subCategoryName: string
}) {
	const [subCategories, setSubCategories] = useState<
		Record<string, CategoryType[]>
	>({})
	const [openCategory, setOpenCategory] = useState<string | null>(null)
	const [selectedCategory, setSelectedCategory] = useState<SelectCategoryValue>(
		{
			top: { uuid: topCategoryUUID, name: topCategoryName },
			sub: { uuid: subCategoryUUID, name: subCategoryName },
		},
	)

	const subCategoryUpdate = async (selected: string) => {
		if (!(selected in subCategories)) {
			const res = await getSubCategory(selected)
			setSubCategories((prev) => ({
				...prev,
				[selected]: res,
			}))
		}
	}

	const toggleCategory = (categoryUuid: string) => {
		setOpenCategory((prev) => (prev === categoryUuid ? null : categoryUuid))
	}

	const handleCategoryClick = (
		categoryClass: string,
		categoryUuid: string,
		categoryName: string,
	) => {
		setSelectedCategory((prevSelectedCategory) => {
			if (categoryClass === "top") {
				// 이전 top 값과 새로 설정할 top 값 비교
				if (prevSelectedCategory.top.uuid === categoryUuid) {
					return prevSelectedCategory // 같은 경우 이전 상태 반환
				}

				return {
					top: { uuid: categoryUuid, name: categoryName },
					sub: { uuid: "", name: "ALL" },
				}
			} else if (categoryClass === "sub") {
				return {
					top: prevSelectedCategory.top, // 기존 top 값 유지
					sub: { uuid: categoryUuid, name: categoryName },
				}
			}
			return prevSelectedCategory // 기본적으로 이전 상태 반환
		})

		toggleCategory(categoryUuid)

		// 선택된 값 업데이트 (top 카테고리의 경우에만)
		if (categoryClass === "top") {
			subCategoryUpdate(categoryUuid)
		}
	}

	const handletest = () => {
		setSelectedCategory({
			top: { uuid: null, name: null },
			sub: { uuid: null, name: null },
		})
	}

	return (
		<RadioGroup>
			<input
				type="hidden"
				name="topCategoryUuid"
				value={selectedCategory.top.uuid || ""}
			/>
			<input
				type="hidden"
				name="topCategoryName"
				value={selectedCategory.top.name || ""}
			/>
			<input
				type="hidden"
				name="subCategoryUuid"
				value={selectedCategory.sub.uuid || ""}
			/>
			<input
				type="hidden"
				name="subCategoryName"
				value={selectedCategory.sub.name || ""}
			/>

			{selectedCategory.top.name ? (
				<div className="flex flex-col text-xs text-white">
					<div className="flex items-center justify-between gap-2">
						<p>
							<span className="rounded-lg bg-[#524f4f] px-3 py-[2px]">
								{selectedCategory.top.name}
							</span>
						</p>

						<Button
							type="button"
							onClick={handletest}
							className="h-full bg-[#281f36] p-1">
							<span className="text-[10px] font-semibold text-white">
								reset
							</span>
						</Button>
					</div>

					{selectedCategory.sub.name !== "ALL" ? (
						<p>
							<span className="rounded-lg bg-[#524f4f] px-3 py-[2px]">
								{selectedCategory.sub.name}
							</span>
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
									"top",
									category.categoryUuid,
									category.categoryName,
								)
							}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									handleCategoryClick(
										"top",
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
											checked={!selectedCategory.sub.uuid}
											id="ALL"
											className="rounded-sm border-white/70 text-white"
											isRectangle
											onClick={() => handleCategoryClick("sub", "ALL", "")}
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
													selectedCategory.sub.uuid === subCategory.categoryUuid
												}
												id={subCategory.categoryUuid}
												className="rounded-sm border-white/70 text-white"
												isRectangle
												onClick={() =>
													handleCategoryClick(
														"sub",
														subCategory.categoryUuid,
														subCategory.categoryName,
													)
												}
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
