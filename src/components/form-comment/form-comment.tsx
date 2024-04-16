import {
  useState,
  ChangeEvent,
  MouseEvent,
  Fragment,
  FormEvent,
  useEffect,
} from 'react';
import {
  MAX_LENGTH_COMMENT,
  MIN_LENGTH_COMMENT,
  Ratings,
} from '../../const/const';
import { AppDispatch, AppState } from '../../types/store';
import { useDispatch } from 'react-redux';
import { postComment } from '../../store/comments-slice';
import { SendStatus } from '../../types/reviews';
import { useSelector } from 'react-redux';

function FormComment(): JSX.Element {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const commentRating = Number(rating);
  const { sendStatus, errorMessage } = useSelector(
    (state: AppState) => state.comments
  );

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postComment({ comment, rating: commentRating }));
  };

  const isFormDataValue = (comment: string, rating: string): boolean => {
    return (
      comment !== undefined &&
      rating !== undefined &&
      comment.length >= MIN_LENGTH_COMMENT &&
      comment.length <= MAX_LENGTH_COMMENT &&
      Number(rating) > 0
    );
  };

  useEffect(() => {
    setIsDisabledSubmit(
      !isFormDataValue(comment, rating) || sendStatus === SendStatus.Pending
    );
  }, [comment, rating, sendStatus]);

  useEffect(() => {
    if (sendStatus === SendStatus.Fulfilled) {
      setComment('');
      setRating('');
    }
  }, [sendStatus]);

  return (
    <form
      onSubmit={handleSubmit}
      className='reviews__form form'
      action='#'
      method='post'
    >
      <label className='reviews__label form__label' htmlFor='review'>
        Your review
      </label>
      <div className='reviews__rating-form form__rating'>
        {Ratings.map(({ title, value }, index) => (
          <Fragment key={`${title}${value}`}>
            <input
              className='form__rating-input visually-hidden'
              name='rating'
              value={value}
              id={`${value}-stars`}
              type='radio'
              checked={Number(rating) === 5 - index}
              disabled={sendStatus === SendStatus.Pending}
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
        minLength={MIN_LENGTH_COMMENT}
        maxLength={MAX_LENGTH_COMMENT}
        value={comment}
        disabled={sendStatus === SendStatus.Pending}
        onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
          setComment(target.value);
        }}
      />
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set{' '}
          <span className='reviews__star'>rating</span> and describe your stay
          with at least{' '}
          <b className='reviews__text-amount'>
            {MIN_LENGTH_COMMENT} characters
          </b>
          .
        </p>
        <button
          className='reviews__submit form__submit button'
          type='submit'
          disabled={isDisabledSubmit}
        >
          Submit
        </button>
      </div>
      {sendStatus === SendStatus.Rejected && errorMessage && (
        <div style={{ color: 'red', marginTop: '15px' }}>{errorMessage}</div>
      )}
    </form>
  );
}
export default FormComment;
