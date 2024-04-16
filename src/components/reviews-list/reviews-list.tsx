import { ReviewsListType } from '../../types/reviews';
import ReviewsItem from '../reviews-item/reviews-item';
export interface ReviewsListProps {
  comments: ReviewsListType;
}
function ReviewsList({ comments }: ReviewsListProps): JSX.Element {
  const sortReviewsList = [...comments]
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, 10);

  return (
    <>
      <h2 className='reviews__title'>
        Reviews &middot;{' '}
        <span className='reviews__amount'>{comments.length}</span>
      </h2>
      <ul className='reviews__list'>
        {sortReviewsList.map((oneComment) => (
          <ReviewsItem key={oneComment.id} oneComment={oneComment} />
        ))}
      </ul>
    </>
  );
}
export default ReviewsList;
