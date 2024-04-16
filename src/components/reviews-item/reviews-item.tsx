import { ReviewType } from '../../types/reviews';
export interface ReviewsProps {
  oneComment: ReviewType;
}
function ReviewsItem({ oneComment }: ReviewsProps): JSX.Element {
  return (
    <li className='reviews__item'>
      <div className='reviews__user user'>
        <div className='reviews__avatar-wrapper user__avatar-wrapper'>
          <img
            className='reviews__avatar user__avatar'
            src={oneComment.user.avatarUrl}
            width='54'
            height='54'
            alt='Reviews avatar'
          />
        </div>
        <span className='reviews__user-name'>{oneComment.user.name}</span>
      </div>
      <div className='reviews__info'>
        <div className='reviews__rating rating'>
          <div className='reviews__stars rating__stars'>
            <span
              style={{ width: `${(Math.round(oneComment.rating) * 100) / 5}%` }}
            />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <p className='reviews__text' />
        {oneComment.comment}
        <time
          className='reviews__time'
          dateTime={new Date(oneComment.date).toLocaleString('en-US')}
        >
          {new Date(oneComment.date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
          })}
        </time>
      </div>
    </li>
  );
}

export default ReviewsItem;
