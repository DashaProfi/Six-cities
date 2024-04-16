import styles from '../error-message/error-password-message.module.css';
export interface ErrorPasswordMessageProps {
  error: string;
}

export function ErrorPasswordMessage({
  error,
}: ErrorPasswordMessageProps): JSX.Element {
  return <div className={styles.message}>{error}</div>;
}
