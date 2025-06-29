export const STATUSES = {
  0: 'To do',
  1: 'In progress',
  2: 'Completed',
};

export type TaskStatus = keyof typeof STATUSES;
