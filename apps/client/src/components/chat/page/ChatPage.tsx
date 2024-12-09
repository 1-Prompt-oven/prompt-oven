"use client"

import { useState } from "react"
import { Menu } from "@repo/ui/lucide"
import { ChatSidebar } from "@/components/chat/organism/ChatSidebar.tsx"
import { ChatMain } from "@/components/chat/organism/ChatMain.tsx"
import { ChatProfileSidebar } from "@/components/chat/organism/ChatProfileSidebar.tsx"

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
	// Add more contacts...
]

const MESSAGES = [
	{
		id: "1",
		content:
			"Hi, how are you? It's been a while since we talked. I've just returned from a fantastic vacation. I'd love to catch up and hear how you've been. What's new?",
		timestamp: "11:12 AM",
		isOwn: true,
		hasRead: true,
	},
	{
		id: "2",
		content:
			"Hi John! I'm doing well, thanks for asking. Welcome back from your vacation. I've been keeping busy with work, but nothing too exciting. How was your trip?",
		timestamp: "11:00 AM",
		isOwn: false,
	},
	{
		id: "3",
		content:
			"That sounds incredible! I'd love to see those photos. Maybe we can plan a trip together sometime.",
		timestamp: "11:00 AM",
		isOwn: false,
	},
	// Add more messages...
]

export default function ChatPage() {
	const [selectedContact, setSelectedContact] = useState(CONTACTS[0])
	const [showProfile, setShowProfile] = useState(false)
	const [showSidebar, setShowSidebar] = useState(false)

	return (
		<div className="flex h-screen overflow-hidden bg-[#111111]">
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
					onClose={() => setShowSidebar(false)} // 추가
				/>
			</div>
			<div className="flex flex-1 flex-col overflow-hidden md:!flex-row">
				<div className="flex flex-1 flex-col">
					<div className="flex items-center justify-between border-b border-[#E3E8E7]/40 bg-[#111111] p-4 md:!hidden">
						<button
							onClick={() => setShowSidebar(!showSidebar)}
							className="text-[#E2ADFF]">
							<Menu size={24} />
						</button>
						<h1 className="text-lg font-semibold text-[#E2ADFF]">Chat</h1>
						<div className="w-6" />
					</div>
					<ChatMain
						messages={MESSAGES}
						contact={selectedContact}
						onProfileClick={() => setShowProfile(true)}
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
