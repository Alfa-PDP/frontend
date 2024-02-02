export type WorkersList = Worker[];

export interface Worker {
  name: string;
  family_name: string;
  middle_name: string;
  position: string;
  avatar: string;
  id: string;
  team_id: string;
  task_count: number;
  task_progress: number;
}
