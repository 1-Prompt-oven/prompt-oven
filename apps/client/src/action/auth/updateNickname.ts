'use server'

import { initializeHeaders } from '@/lib/api/headers';
import { getAccessToken } from '@/lib/api/sessionExtractor';
import type { UpdateNicknameRequest } from '@/types/auth/AuthMemberType';

export async function updateNickname(data:UpdateNicknameRequest) {
  const accessToken = await getAccessToken()
  const headers = initializeHeaders(accessToken ?? undefined)
  const res = await fetch(`${process.env.API_BASE_URL}/v1/member/auth/nickname`, {
		method: "PUT",
    headers,
		body: JSON.stringify(data),
	})
  if (!res.ok) {
		throw new Error('Failed to modify profile data')
	}
}

export const DeleteEmail = async() =>{
  const accessToken = await getAccessToken()
  const headers = initializeHeaders(accessToken ?? undefined)
  const res = await fetch(`${process.env.API_BASE_URL}/v1/auth/withdraw`, {
		method: "DELETE",
    headers,
	})
  if (!res.ok) {
		throw new Error('Failed to modify profile data')
	}
}