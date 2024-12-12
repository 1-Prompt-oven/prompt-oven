import * as z from "zod"

export const commissionSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters long."),
	price: z
		.number({ invalid_type_error: "Price must be a number." })
		.positive("Price must be greater than 0."),
	description: z.string().min(1, "Description is required."),
	deadline: z
		.date()
		.refine((date) => date > new Date(), "Deadline must be a future date."),
	model: z.string().nonempty("Model selection is required."),
	category: z.enum(["코딩", "문서", "그림", "음악"]).optional(),
	additional: z.string().optional(),
})
