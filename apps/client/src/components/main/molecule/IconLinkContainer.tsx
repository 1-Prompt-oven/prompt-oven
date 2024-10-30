"use client"

import React from "react"
import IconLink from "@/components/main/atom/IconLink.tsx"
import FacebookSvg from "@/components/main/atom/icon/FacebookSvg.tsx"
import InstagramSvg from "@/components/main/atom/icon/InstagramSvg.tsx"
import LinkedInSvg from "@/components/main/atom/icon/LinkedInSvg.tsx"
import YoutubeSvg from "@/components/main/atom/icon/YoutubeSvg.tsx"
import DiscordSvg from "@/components/main/atom/icon/DiscordSvg.tsx"

const svgList = [FacebookSvg, InstagramSvg, YoutubeSvg, DiscordSvg, LinkedInSvg]

function IconLinkContainer() {
	return (
		<div className="flex flex-wrap gap-4">
			{svgList.map((Icon, index) => (
				// eslint-disable-next-line react/no-array-index-key -- index is unique
				<IconLink key={index} href="#" Icon={Icon} />
			))}
		</div>
	)
}

export default IconLinkContainer
