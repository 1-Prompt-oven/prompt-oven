import React from "react"
import { Input } from "@repo/ui/input"
import { Label } from "@repo/ui/label"
import { Button } from "@repo/ui/button"
import { cn } from "@/lib/utils"

function SearchForm({ className }: React.ComponentProps<"form">) {
	return (
		<form className={cn("grid items-start gap-4", className)}>
			<div className="grid gap-2">
				<Label htmlFor="email">Email</Label>
				<Input type="email" id="email" defaultValue="shadcn@example.com" />
			</div>
			<div className="grid gap-2">
				<Label htmlFor="username">Username</Label>
				<Input id="username" defaultValue="@shadcn" />
			</div>
			<Button type="submit">Save changes</Button>
		</form>
	)
}

export default SearchForm

