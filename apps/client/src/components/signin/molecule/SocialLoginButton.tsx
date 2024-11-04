import { Button } from "@repo/ui/button"
import React from "react"

export const SocialLoginButton: React.FC = () => (
	<div className="flex justify-center space-x-4">
		<Button
			variant="outline"
			className="h-[48px] w-[147px] rounded-full bg-white hover:bg-white/90">
			Apple
		</Button>
		<Button
			variant="outline"
			className="h-[48px] w-[147px] rounded-full bg-white hover:bg-white/90">
			Google
		</Button>
		<Button
			variant="outline"
			className="h-[48px] w-[147px] rounded-full bg-white hover:bg-white/90">
			Facebook
		</Button>
	</div>
)
