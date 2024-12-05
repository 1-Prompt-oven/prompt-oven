import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar';
import type { ProfileForSearchListType } from '@/types/profile/profileTypes';

function CreatorSeachList({ data }: { data: ProfileForSearchListType[] }) {
  return (
    <ul>
      {data.map((item: ProfileForSearchListType) => (
        <li key={item.id} className="flex justify-start items-center gap-3">
          <Avatar className="mr-[10px] h-[30px] w-[30px]">
            <AvatarImage src={item.thumbnail} alt={item.nickname} />
            <AvatarFallback>{item.nickname}</AvatarFallback>
          </Avatar>
          <span>{item.nickname}</span>
        </li>
      ))}
    </ul>
  );
}

export default CreatorSeachList;
