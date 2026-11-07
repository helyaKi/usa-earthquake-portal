// src/app/models/data-state.ts
export interface LoadingState {
  status: 'loading';
}

export interface ErrorState {
  status: 'error';
  message: string;
}

export interface SuccessState<T> {
  status: 'success';
  data: T;
}

export type AsyncState<T> = LoadingState | ErrorState | SuccessState<T>;
