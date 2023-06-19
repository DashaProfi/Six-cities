import { useState, ChangeEvent, MouseEvent, Fragment } from 'react';
import { Ratings } from '../const';

function FormComment(): JSX.Element {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  return (
    <form className='reviews__form form' action='#' method='post'>
      <label className='reviews__label form__label' htmlFor='review'>
        Your review
      </label>
      <div className='reviews__rating-form form__rating'>
        {Ratings.map(({ title, value }) => (
          <Fragment key={`${title}${value}`}>
            <input
              className='form__rating-input visually-hidden'
              name='rating'
              value={value}
              id={`${value}-stars`}
              type='radio'
              onClick={(e: MouseEvent<HTMLInputElement>) => {
                const ratingInput = e.target as HTMLInputElement;
                setRating(ratingInput.value);
              }}
              data-rating={rating}
            />
            <label
              htmlFor={`${value}-stars`}
              className='reviews__rating-label form__rating-label'
              title={title}
            >
              <svg className='form__star-image' width='37' height='33'>
                <use xlinkHref='#icon-star' />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className='reviews__textarea form__textarea'
        id='review'
        placeholder='Tell how was your stay, what you like and what can be improved'
        name='review'
        value={comment}
        onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
          setComment(target.value);
        }}
      />
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set{' '}
          <span className='reviews__star'>rating</span> and describe your stay
          with at least <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button
          className='reviews__submit form__submit button'
          type='submit'
          disabled
        >
          Submit
        </button>
      </div>
    </form>
  );
}
export default FormComment;
