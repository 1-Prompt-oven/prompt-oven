"use client"

import { useState } from "react"
import { Calendar } from "@repo/ui/lucide"
import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import { Textarea } from "@repo/ui/textarea"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/ui/select"
import { Calendar as CalendarComponent } from "@repo/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@repo/ui/popover"
import { FormField } from "../molecule/FormField"

export function CommissionForm() {
	const [date, setDate] = useState<Date>()

	return (
		<form className="space-y-8">
			<FormField
				id="title"
				label="Commission Title"
				required
				description="Give your commission a clear and descriptive title">
				<Input
					id="title"
					placeholder="Enter commission title"
					className="border-gray-700 bg-gray-900"
				/>
			</FormField>

			<FormField
				id="price"
				label="Price"
				required
				description="Set the price for your commission">
				<Input
					id="price"
					type="number"
					placeholder="Enter price"
					className="border-gray-700 bg-gray-900"
				/>
			</FormField>

			<FormField
				id="description"
				label="Description"
				required
				description="Provide detailed information about your commission request">
				<Textarea
					id="description"
					placeholder="Enter commission details"
					className="min-h-[120px] border-gray-700 bg-gray-900"
				/>
			</FormField>

			<FormField
				id="deadline"
				label="Deadline"
				required
				description="Select the desired completion date">
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className="w-full justify-start border-gray-700 bg-gray-900 text-left font-normal">
							<Calendar className="mr-2 h-4 w-4" />
							{date ? date.toLocaleDateString() : "Select a date"}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto bg-gray-900 p-0">
						<CalendarComponent
							mode="single"
							selected={date}
							onSelect={setDate}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</FormField>

			<FormField
				id="model"
				label="LLM Model"
				required
				description="Select the AI model for your commission">
				<Select>
					<SelectTrigger className="border-gray-700 bg-gray-900">
						<SelectValue placeholder="Select a model" />
					</SelectTrigger>
					<SelectContent className="border-gray-700 bg-gray-900">
						<SelectItem value="gpt4">GPT-4</SelectItem>
						<SelectItem value="claude">Claude</SelectItem>
						<SelectItem value="gpt35">GPT-3.5</SelectItem>
					</SelectContent>
				</Select>
			</FormField>

			<FormField
				id="category"
				label="Category"
				description="Select the category that best fits your commission">
				<Select>
					<SelectTrigger className="border-gray-700 bg-gray-900">
						<SelectValue placeholder="Select a category" />
					</SelectTrigger>
					<SelectContent className="border-gray-700 bg-gray-900">
						<SelectItem value="creative">Creative Writing</SelectItem>
						<SelectItem value="translation">Translation</SelectItem>
						<SelectItem value="analysis">Analysis</SelectItem>
					</SelectContent>
				</Select>
			</FormField>

			<FormField
				id="additional"
				label="Additional Requirements"
				description="Any additional requirements or special requests">
				<Textarea
					id="additional"
					placeholder="Enter additional requirements"
					className="min-h-[100px] border-gray-700 bg-gray-900"
				/>
			</FormField>

			<Button
				type="submit"
				className="w-full bg-purple-600 hover:bg-purple-700">
				Create Commission
			</Button>
		</form>
	)
}
