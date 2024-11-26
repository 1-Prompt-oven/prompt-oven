"use server"

import {
	profileListData,
	profileMemberInfoData,
} from "@/dummy/profile/infoAndListDatas"
import type { ProfileMemberInfoType } from "@/types/profile/profileTypes"
import type { PromptsType } from "@/types/prompts/promptsType"

export async function getProfileMemberInfo(): Promise<ProfileMemberInfoType> {
	const res: ProfileMemberInfoType = await profileMemberInfoData
	// const res: ProfileMemberInfoType = await profileMemberInfoUndefineData

	//     const res = await fetch(`${process.env.API_BASE_URL}/v1/profile`, {
	//       method: 'GET',
	//       headers: {
	//         'Content-Type': 'application/json',
	//         Authorization: `Bearer ${auth.accessToken}`,
	//       },
	//       cache: 'no-cache',
	//     })

	return res
}

// export async function getProfileList(cursor?: string) {
export async function getProfileList() {
	const res: PromptsType[] = await profileListData // 데이터를 가져옴
	return res

	// const startIndex = cursor ? parseInt(cursor) : 0 // 커서가 주어지면 해당 인덱스부터 시작
	// const nextData =
	// 	cursor === "0"
	// 		? res.slice(startIndex, startIndex + 8)
	// 		: res.slice(startIndex, startIndex + 4) // 첫 요청 시 8개, 이후 요청 시 4개

	// const nextCursor =
	// 	nextData.length < (cursor ? 4 : 8)
	// 		? null
	// 		: (startIndex + nextData.length).toString() // 다음 커서 계산

	// return { items: nextData, nextCursor } // 반환 형식 맞추기

	// try {
	//   const response = await fetch(`${process.env.API_BASE_URL}/v1/profile/`, {
	// 	method: 'GET',
	// 	headers: {
	// 	  'Content-Type': 'application/json',
	// 	  // Authorization: `Bearer ${auth.accessToken}`, // 필요할 경우 주석 해제
	// 	},
	// 	// 커서가 있을 경우 쿼리 파라미터에 추가
	// 	...(cursor && { params: { cursor } }),
	//   });

	//   if (!response.ok) {
	// 	throw new Error('Network response was not ok');
	//   }

	//   const result = await response.json();
	//   return {
	// 	data: result.data, // API 응답에서 데이터 배열
	// 	nextCursor: result.nextCursor || null, // 다음 커서
	//   };
	// } catch (error) {
	//   console.error('Error fetching profile list:', error);
	//   throw error; // 에러를 다시 던져서 호출한 쪽에서 처리할 수 있도록 함
	// }
}

// export async function registeProfile(registerProfileData: FormData) {
// 	"use server"

// 	const payload: RegistProfileType = {
// 		banner: registerProfileData.get("banner") as string,
// 		profileImage: registerProfileData.get("profileImage") as string,
// 		bio: registerProfileData.get("bio") as string,
// 		xId: registerProfileData.get("xId") as string,
// 		instagramId: registerProfileData.get("instagramId") as string,
// 		youtubeHandle: registerProfileData.get("youtubeHandle") as string,
// 		webLink: registerProfileData.get("webLink") as string,
// 		allowMessage: registerProfileData.get("allowMessage") === "on",
// 		acceptCustom: registerProfileData.get("acceptCustom") === "on",
// 	}

// 	// console.log("paylaod --> ", payload)

// 	payload

// 	// const res = await fetch(`${process.env.API_BASE_URL}/v1/profile/register`, {
// 	// 	method: "POST",
// 	// 	body: JSON.stringify(payload),
// 	// 	headers: {
// 	// 		"Content-Type": "application/json",
// 	// 		//   Authorization: `Bearer ${isAuth?.accessToken}`,
// 	// 	},
// 	// })

// 	// if (res.ok) {
// 	// 	return true
// 	// } else return false
// 	return null
// }
