import React from 'react'
import { ChAvatar } from "@/components/chat/atom/ChAvatar"
import type { GetReactiveChatRoomListResponseType } from "@/types/chat/chatTypes"
import { getKstTime } from '@/lib/time.ts';

interface ChatRoomProps {
  room: GetReactiveChatRoomListResponseType
  isSelected: boolean
  onSelect: (room: GetReactiveChatRoomListResponseType) => void
}

export function ChatRoom({ room, isSelected, onSelect }: ChatRoomProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(room)}
      className={`flex w-full flex-1 items-center gap-2.5 p-6 transition-colors hover:bg-[#404040] ${
        isSelected ? "bg-[#404040]" : ""
      }`}
    >
      <ChAvatar src="" alt={room.chatRoomName} />
      <div className="flex-1 text-left">
        <h3 className="text-sm font-semibold text-[#E2ADFF]">
          {room.chatRoomName}
        </h3>
        <p className="line-clamp-2 text-xs text-[#B1B1B1]">
          {room.recentMessage}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="text-xs text-[#B1B1B1]">
          {getKstTime(room.recentMessageTime).format("hh:mm A")}
        </span>
        {/*{room.unreadCount > 0 && (*/}
        {/*  <span*/}
        {/*    className="flex h-5 w-5 items-center justify-center rounded-full bg-[#A913F9] text-xs font-medium text-white">*/}
        {/*    {room.unreadCount}*/}
        {/*  </span>*/}
        {/*)}*/}
      </div>
    </button>
  )
}

