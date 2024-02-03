export type StatusType =
  | 'inWork'
  | 'completed'
  | 'new'
  | 'notComplited'
  | 'canceled';

export interface StatusInfo {
  text: string;
  className: string;
}

export type StatusMap = Record<StatusType, StatusInfo>;
