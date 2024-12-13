import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

// eslint-disable-next-line import/no-named-as-default-member -- ok
dayjs.extend(utc)
// eslint-disable-next-line import/no-named-as-default-member -- ok
dayjs.extend(timezone)

export const getKstTime = (ustTime: string) => {
	return dayjs.utc(ustTime).tz("Asia/Seoul")
}
