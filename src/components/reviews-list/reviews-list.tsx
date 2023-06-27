import { ReviewsListType } from '../../types/reviews';
import ReviewsItem from '../reviews-item/reviews-item';
export interface ReviewsListProps {
  reviewsList: ReviewsListType;
}
function ReviewsList({ reviewsList }: ReviewsListProps): JSX.Element {
  const sortReviewsList = [...reviewsList]
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, 10);

  return (
    <>
      <h2 className='reviews__title'>
        Reviews &middot;{' '}
        <span className='reviews__amount'>{reviewsList.length}</span>
      </h2>
      <ul className='reviews__list'>
        {sortReviewsList.map((oneReview) => (
          <ReviewsItem key={oneReview.id} oneReview={oneReview} />
        ))}
      </ul>
    </>
  );
}
export default ReviewsList;
