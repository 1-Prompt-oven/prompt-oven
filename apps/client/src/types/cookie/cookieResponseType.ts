import type { GetCookieResultType } from './cookieTableType'

export interface GetCookieListRequestType {
  userUuid : string
  startDate?: string
  endDate?:string
  paymentType?: "USE" | "CHARGE" // 정렬 기준
  lastId?: string | null
  pageSize?: number
}

export interface CookieListSearchParams {
  userUuid : string
  startDate?: string
  endDate?:string
  paymentType?: "USE" | "CHARGE" // 정렬 기준
  lastId?: string
  pageSize?: number
}


export interface GetCookieListResponseType {
	content: GetCookieResultType[]
  nextCursor: string | null;
  hasNext: boolean;
  pageSize: number;
  page: number;
}

