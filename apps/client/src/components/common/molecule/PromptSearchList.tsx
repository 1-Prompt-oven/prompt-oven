import React from 'react';
import type { PromptApiResponseType } from '@/types/common/responseType';

function PromptSearchList({ data }: { data: PromptApiResponseType }) {
  const promptData = data.productList;

  return (
    <ul>
      {promptData.map((prompt) => (
        <li key={prompt.productUuid} className="my-4">
          <span className="text-white text-sm">{prompt.productName}</span>
        </li>
      ))}
    </ul>
  );
}

export default PromptSearchList;
