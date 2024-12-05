"use server"

import { initializeHeaders } from "@/lib/api/headers"
import { isValidResponse } from "@/lib/api/validation"
import type { Follower, FollowingType } from "@/types/profile/followingType"

export async function getFollowingList(id: string): Promise<Follower[]> {
	const headers = await initializeHeaders()

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/profile/nickname/${id}/following`,
		{
			method: "GET",
			headers,
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch following list")
	}

	const rawData: unknown = await res.json()

	if (!isValidResponse<FollowingType[]>(rawData)) {
		throw new Error("Invalid response format")
	}

	const data = (rawData.result as Follower[]).map(item => ({
		...item,
		isFollowing: true
	}))
	
	return data
}

export async function getFollowerList(id: string): Promise<Follower[]> {
	const headers = await initializeHeaders()

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/profile/nickname/${id}/follower`,
		{
			method: "GET",
			headers,
		},
	)

	if (!res.ok) {
		throw new Error("Failed to fetch follower list")
	}

	const rawData: unknown = await res.json()

	if (!isValidResponse<FollowingType[]>(rawData)) {
		throw new Error("Invalid response format")
	}

	const data = (rawData.result as Follower[]).map(async item => {
		const followingRes = await fetch(
			`${process.env.API_BASE_URL}/v1/profile/relation/${id}/${item.memberNickname}`,
			{
				method: "GET",
				headers,
			},
		)
		
		if (!followingRes.ok) {
			return {
				...item,
				isFollowing: false
			}
		}

		const followingData: { result: boolean } = await followingRes.json()
		return {
			...item,
			isFollowing: followingData.result
		}
	})

	return Promise.all(data)
}

export async function toggleFollow(id: string, isFollowing: boolean): Promise<void> {
	if (isFollowing) {
		await unfollowMember(id)
	} else {
		await followMember(id)
	}
}

export async function followMember(id: string): Promise<void> {
	const headers = await initializeHeaders()

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/profile/nickname/${id}/follow`,
		{
			method: "POST",
			headers, 
		},
	)

	if (!res.ok) {
		throw new Error("Failed to follow member")
	}
}

export async function unfollowMember(id: string): Promise<void> {
	const headers = await initializeHeaders()

	const res = await fetch(
		`${process.env.API_BASE_URL}/v1/profile/nickname/${id}/unfollow`,
		{
			method: "POST",
			headers, 
		},
	)

	if (!res.ok) {
		throw new Error("Failed to unfollow member")
	}
}
