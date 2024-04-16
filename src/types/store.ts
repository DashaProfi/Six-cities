import { store } from '../store/store';
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
