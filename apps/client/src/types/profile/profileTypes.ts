// Shared field definitions
export const PROFILE_FIELDS = {
  bannerImageUrl: 'string | undefined',
  avatarImageUrl: 'string | undefined',
  hashTag: 'string | undefined',
  bio: 'string | undefined',
  email: 'string | undefined',
} as const;

export interface ProfileImageType {
  memberUUID: string;
  picture: string | undefined;
}

// Base type with all shared fields
export interface BaseProfileFields {
  bannerImageUrl?: string | undefined;
  avatarImageUrl?: string | undefined;
  hashTag?: string | undefined;
  bio?: string | undefined;
  email?: string | undefined;
}

// Form state type (all optional)
export interface CommonModifyType extends BaseProfileFields {
  memberUUID?: string | undefined;
  nickname?: string | undefined;
}

// API type (some required fields)
export interface ProfileModifyType extends BaseProfileFields {
  memberUUID: string;
  nickname: string;
}

export interface ProfileMemberInfoType extends BaseProfileFields {
  memberUUID: string;
  nickname: string;
  joined: string;
  following: number;
  follower: number;
  viewer: number;
  sales: number;
}

// Optional: Type guard for API validation
export function isValidProfileModify(
  data: CommonModifyType
): data is ProfileModifyType {
  return (
    typeof data.memberUUID === 'string' &&
    typeof data.nickname === 'string' &&
    data.memberUUID.length > 0 &&
    data.nickname.length > 0
  );
}

export interface ProfileForSearchListType {
  thumbnail: string;
  nickname: string;
  id: string;
}
