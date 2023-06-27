import { ReviewType } from '../../types/reviews';
export interface ReviewsProps {
  oneReview: ReviewType;
}
function ReviewsItem({ oneReview }: ReviewsProps): JSX.Element {
  return (
    <li className='reviews__item'>
      <div className='reviews__user user'>
        <div className='reviews__avatar-wrapper user__avatar-wrapper'>
          <img
            className='reviews__avatar user__avatar'
            src={oneReview.user.avatarUrl}
            width='54'
            height='54'
            alt='Reviews avatar'
          />
        </div>
        <span className='reviews__user-name'>{oneReview.user.name}</span>
      </div>
      <div className='reviews__info'>
        <div className='reviews__rating rating'>
          <div className='reviews__stars rating__stars'>
            <span
              style={{ width: `${(Math.round(oneReview.rating) * 100) / 5}%` }}
            />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <p className='reviews__text' />
        {oneReview.comment}
        <time
          className='reviews__time'
          dateTime={new Date(oneReview.date).toLocaleString('en-US')}
        >
          {new Date(oneReview.date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
          })}
        </time>
      </div>
    </li>
  );
}

export default ReviewsItem;
