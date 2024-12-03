import type { PromptsType } from "@/types/prompts/promptsType"
import ProfileFilterSidebar from "./ProfileFilterSidebar"
import ProfileItemFilter from "./ProfileItemFilter"
import ProfilePromptList from "./ProfilePromptList"

interface ProfilePromptProps {
	listData: PromptsType[]
	handleFilter: (formData: FormData) => void // Ensure this is correctly typed
}

export default function ProfilePrompt({
	listData,
	handleFilter,
}: ProfilePromptProps) {
	return (
		<form action={handleFilter}>
			<div className="mx-12 mb-16 flex flex-col gap-8 md:!flex-row">
				<ProfileFilterSidebar />
				<div className="flex w-full flex-col gap-8">
					<ProfileItemFilter
						promptCount={listData.length}
						handleFilter={handleFilter}
					/>
					<ProfilePromptList listData={listData} />
				</div>
			</div>
		</form>
	)
}

