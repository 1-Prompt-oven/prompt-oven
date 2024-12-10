"use client"

import { useState } from "react"
import { ChatSidebar } from "@/components/chat/organism/ChatSidebar.tsx"
import { ChatMain } from "@/components/chat/organism/ChatMain.tsx"
import { ChatProfileSidebar } from "@/components/chat/organism/ChatProfileSidebar.tsx"

// test contacts
const CONTACTS = [
	{
		id: "1",
		name: "Lincoln Calzoni",
		message: "Absolutely, that would be great! I could use another...",
		time: "1 hour ago",
		avatarSrc: "",
		unread: 0,
	},
	{
		id: "2",
		name: "Jaylon Bergson",
		message: "There's exciting news today! Our team has won awards...",
		time: "1 hour ago",
		avatarSrc: "",
		unread: 2,
	},
]

export interface ChatPageProps {
	roomId: string
}

export default function ChatPage({ roomId }: ChatPageProps) {
	const [showProfile, setShowProfile] = useState(false)
	const [showSidebar, setShowSidebar] = useState(false)
	const [selectedContact, setSelectedContact] = useState(
		CONTACTS.find((c) => c.id === roomId) || CONTACTS[0],
	)

	return (
		<div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#111111]">
			<div
				className={`absolute inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out md:!static md:!w-[424px] ${showSidebar ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
				<ChatSidebar
					contacts={CONTACTS}
					selectedId={selectedContact.id}
					onSelectContact={(id) => {
						const contact = CONTACTS.find((c) => c.id === id)
						if (contact) {
							setSelectedContact(contact)
							setShowSidebar(false)
						}
					}}
					onClose={() => setShowSidebar(false)}
				/>
			</div>
			<div className="flex flex-1 flex-col overflow-hidden md:!flex-row">
				<div className="flex flex-1 flex-col">
					<ChatMain
						roomId={roomId}
						contact={{
							id: selectedContact.id,
							name: selectedContact.name,
							isActive: true,
							avatarSrc: selectedContact.avatarSrc,
						}}
						onProfileClick={() => setShowProfile(true)}
						onOpenSidebar={() => setShowSidebar(true)}
					/>
				</div>
				<div
					className={`absolute inset-y-0 right-0 z-30 transition-transform duration-300 ease-in-out md:!static ${showProfile ? "translate-x-0" : "translate-x-full"} md:!translate-x-0`}>
					<ChatProfileSidebar
						contact={{
							id: selectedContact.id,
							name: selectedContact.name,
							phone: "+6284532234651",
							avatarSrc: selectedContact.avatarSrc,
						}}
						onClose={() => setShowProfile(false)}
						isOpen={showProfile}
					/>
				</div>
			</div>
		</div>
	)
}
