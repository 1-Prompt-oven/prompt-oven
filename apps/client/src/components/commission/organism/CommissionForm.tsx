import React, { useState } from "react"

function CommissionForm() {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		price: 0,
		deadline: "",
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	return (
		<form className="flex flex-col gap-4 bg-gray-800 p-4 text-white">
			<input
				name="title"
				placeholder="커미션 제목"
				value={formData.title}
				onChange={handleChange}
				className="rounded border p-2"
			/>
			<textarea
				name="description"
				placeholder="커미션 설명"
				value={formData.description}
				onChange={handleChange}
				className="rounded border p-2"
			/>
			<input
				type="number"
				name="price"
				placeholder="예상 가격 (숫자)"
				value={formData.price}
				onChange={handleChange}
				className="rounded border p-2"
			/>
			<input
				type="date"
				name="deadline"
				value={formData.deadline}
				onChange={handleChange}
				className="rounded border p-2"
			/>
		</form>
	)
}

export default CommissionForm
