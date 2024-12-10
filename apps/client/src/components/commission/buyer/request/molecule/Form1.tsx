import { Input } from "@repo/ui/input"
import { Textarea } from "@repo/ui/textarea"
import { FormField } from "./FormField"
import { SubmitButton } from "../atom/SubmitButton"

interface FormProps {
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
	errors: Record<string, string>
}

export function Form({ onSubmit, errors }: FormProps) {
	return (
		<form onSubmit={onSubmit} className="space-y-6">
			<FormField
				id="title"
				label="Commission Title"
				required
				error={errors.title}>
				<Input
					id="title"
					placeholder="Enter commission title"
					className="border-gray-700 bg-gray-900 text-white"
					required
				/>
			</FormField>

			<FormField id="price" label="Price" required error={errors.price}>
				<Input
					id="price"
					type="number"
					placeholder="Enter price"
					className="border-gray-700 bg-gray-900 text-white"
					required
				/>
			</FormField>

			<FormField
				id="description"
				label="Description"
				required
				error={errors.description}>
				<Textarea
					id="description"
					placeholder="Provide detailed information about your commission request"
					className="min-h-[100px] border-gray-700 bg-gray-900 text-white"
					required
				/>
			</FormField>

			<FormField
				id="deadline"
				label="Deadline"
				required
				error={errors.deadline}>
				<Input
					id="deadline"
					type="date"
					className="border-gray-700 bg-gray-900 text-white"
					required
				/>
			</FormField>

			<FormField id="model" label="LLM Model" required error={errors.model}>
				<Input
					id="model"
					placeholder="Select LLM Model"
					className="border-gray-700 bg-gray-900 text-white"
					required
				/>
			</FormField>

			<FormField
				id="additionalRequirements"
				label="Additional Requirements"
				error={errors.additionalRequirements}>
				<Textarea
					id="additionalRequirements"
					placeholder="Any additional requirements or special requests"
					className="min-h-[100px] border-gray-700 bg-gray-900 text-white"
				/>
			</FormField>

			<SubmitButton>Create Commission</SubmitButton>
		</form>
	)
}
