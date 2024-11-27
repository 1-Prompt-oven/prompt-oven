"use server"

interface ResponseErrorText {
	response: Response
	requestName: string
	url: string
	options: RequestInit
}
const getResponseErrorText = ({
	response,
	requestName,
	url,
	options,
}: ResponseErrorText) => {
	return `Error ${response.status}: "Request Function Name: ${requestName}" Parameters: url=${url}, options=${JSON.stringify(options)} Error Response: ${JSON.stringify(response)}`
}

interface ErrorText {
	error: unknown
	requestName: string
	url: string
	options: RequestInit
}
const getErrorText = ({ error, requestName, url, options }: ErrorText) => {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- This is a server-side only log
	return `Error ${error}: "Request Function Name: ${requestName}" Parameters: url=${url}, options=${JSON.stringify(options)}`
}

interface ApiHandlerArgs {
	name?: string // action function name for debugging
	url: string
	options?: RequestInit
}
export const actionHandler = async <T>({
	name,
	url,
	options,
}: ApiHandlerArgs): Promise<T> => {
	try {
		const response = await fetch(process.env.API_BASE_URL + url, options)
		const data = (await response.json()) as T

		if (!response.ok) {
			// 4xx, 5xx 에러 처리
			// const errorData = await response.json(); <-- 나중에 추가하기
			// eslint-disable-next-line no-console -- This is a server-side only log
			console.error(
				getResponseErrorText({
					response,
					requestName: name || actionHandler.name,
					url,
					options: options || ({} as RequestInit),
				}),
			)
		}
		return data
	} catch (error) {
		// Network 에러 혹은 기타 에러
		// eslint-disable-next-line no-console -- This is a server-side only log
		console.error(
			"API 요청 오류: \n",
			getErrorText({
				error,
				requestName: name || actionHandler.name,
				url,
				options: options || ({} as RequestInit),
			}),
		)
		throw error
	}
}

export const actionHandlerNoresponse = async <T>({
  name,
  url,
  options,
}: ApiHandlerArgs): Promise<T | undefined> => {
  try {
    const response = await fetch(process.env.API_BASE_URL + url, options);

    // 응답 본문이 있는지 확인
    const contentLength = response.headers.get("content-length");
    const hasBody = contentLength && parseInt(contentLength, 10) > 0;

    if (!response.ok) {
      const errorText = hasBody ? await response.text() : "No response body";
      // eslint-disable-next-line no-console -- This is a server-side only log
      console.error(
        `Error ${response.status}: Request Name: ${name || actionHandler.name}, URL: ${url}, Response: ${errorText}`,
      );
      throw new Error(`Server Error: ${response.status}`);
    }

    // 응답 본문이 있는 경우에만 JSON 파싱
    return hasBody ? ((await response.json()) as T) : undefined;
  } catch (error) {
    // eslint-disable-next-line no-console -- This is a server-side only log
    console.error(
      "API 요청 오류: \n",
      getErrorText({
        error,
        requestName: name || actionHandler.name,
        url,
        options: options || ({} as RequestInit),
      }),
    );
    throw error;
  }
};

export const actionHandlerValid = async <T>({
  name,
  url,
  options,
}: ApiHandlerArgs): Promise<T> => {
  try {
    const response = await fetch(process.env.API_BASE_URL + url, options);

    if (!response.ok) {
      const errorResponse = await response.text();
      // eslint-disable-next-line no-console -- This is a server-side only log
      console.error(
        `Error ${response.status}: "Request Function Name: ${name}" Parameters: url=${url}, options=${JSON.stringify(
          options,
        )}, Error Response: ${errorResponse}`,
      );
      throw new Error(`HTTP Error ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    // eslint-disable-next-line no-console -- This is a server-side only log
    console.error(
      "API 요청 오류: \n",
      `Error: "${String(error)}" Request Function Name: ${name}, url=${url}, options=${JSON.stringify(
        options,
      )}`,
    );
    throw error;
  }
};