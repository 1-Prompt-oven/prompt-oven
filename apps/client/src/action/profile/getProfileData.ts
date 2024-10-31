import { profileDatas } from "@/dummy/profile/infoAndListDatas"
import { profileCountData } from "@/dummy/profile/reviewAndFollowData"
import type {
	ProfileInfoType,
	ReviewAndFollowType,
} from "@/types/profile/profileTypes"

export async function getReviewAndFollowCount(): Promise<ReviewAndFollowType> {
	function getProfileCountData(): Promise<ReviewAndFollowType> {
		return new Promise((resolve) => {
			// 비동기 작업 수행
			resolve(profileCountData)
		})
	}

	const res: ReviewAndFollowType = await getProfileCountData()

	//     const res = await fetch(`${process.env.API_BASE_URL}/v1/profile/count/{nickname}`, {
	//       method: 'GET',
	//       headers: {
	//         'Content-Type': 'application/json',
	//         Authorization: `Bearer ${auth.accessToken}`,
	//       },
	//       cache: 'no-cache',
	//     })

	return res
}

export async function getProfile(): Promise<ProfileInfoType> {
	function getProfileData(): Promise<ProfileInfoType> {
		return new Promise((resolve) => {
			// 비동기 작업 수행
			resolve(profileDatas)
		})
	}

	const res: ProfileInfoType = await getProfileData()

	//     const res = await fetch(`${process.env.API_BASE_URL}/v1/profile/{nickname}`, {
	//       method: 'GET',
	//       headers: {
	//         'Content-Type': 'application/json',
	//         Authorization: `Bearer ${auth.accessToken}`,
	//       },
	//     })

	return res
}

//임시 예시 코드 - next revalidate Tag
// export async function updateProfile() {
//     'use server'

//     const auth = await getSessionAuth()
//     if (!auth) return

//     const res = await fetch(`${process.env.API_BASE_URL}/v1/`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${auth.accessToken}`,
//       },
//       body: JSON.stringify({
//         basketCode: basketCode,
//         isChecked: !checked,
//       }),
//     })

//     if (!res.ok) {
//       console.error('profile Update Fail:', res)
//       return
//     } else revalidateTag('updateProfile')
//   }

//임시 예시 코드 - next Tag
// export async function profile(): Promise<profileType[]> {
//     const auth = await getSessionAuth()
//     if (!auth) return []

//     const res = await fetch(`${process.env.API_BASE_URL}/v1/`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${auth.accessToken}`,
//       },
//       next: { tags: ['updateProfile'] },
//       cache: 'no-cache',
//     })

//     if (!res.ok) {
//       console.log('Failed to fetch')
//       return []
//     } else {
//       return (await res.json()).result as profileType[]
//     }
//   }
