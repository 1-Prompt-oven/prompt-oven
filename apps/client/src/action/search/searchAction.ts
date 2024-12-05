'use server';

import type {
  SearchResultCreatorType,
  PromptDetailType,
} from '@/types/search/searchResultType';
import type {
  CommonResType,
  PromptApiResponseType,
} from '@/types/common/responseType';
import type { ProfileForSearchListType } from '@/types/profile/profileTypes';

export interface FetchResults {
  prompts: PromptDetailType[];
  creators: SearchResultCreatorType[];
}

export async function fetchSearchResults(
  query: string,
  tab: string
): Promise<PromptApiResponseType[] | ProfileForSearchListType[]> {
  'use server';
  // 상품 검색 결과 fetch
  if (tab === 'prompt') {
    const promptResponse = await fetch(
      `${process.env.API_BASE_URL}/v1/product/list?searchBar=${query}&pageSize=15`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        method: 'GET',
        cache: 'no-cache',
      }
    );
    const promptData: CommonResType<PromptApiResponseType[]> =
      await promptResponse.json();
    return promptData.result;
  }
  // 크리에이터 검색 결과 fetch
  const creatorResponse = await fetch(
    `${process.env.API_BASE_URL}/v1/profile/search?query=${query}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: 'GET',
      cache: 'no-cache',
    }
  );
  const creatorData: CommonResType<ProfileForSearchListType[]> =
    await creatorResponse.json();
  return creatorData.result;
}
