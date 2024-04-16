export type ReviewType = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
};

export type ReviewsListType = ReviewType[];

export interface CommentsState {
  comments: ReviewsListType;
  errorMessage: string;
  sendStatus: SendStatus;
}

export interface OneComment {
  comment: string;
  rating: number;
}

export enum SendStatus {
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
  Unknown = 'unknown',
}

