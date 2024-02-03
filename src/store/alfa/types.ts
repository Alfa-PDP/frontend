export type WorkersList = Worker[];
export type IndividualPlanWorker = IndividualPlan;

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

interface Task {
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  id: string;
  idp_id: string;
  task_type: string;
  importance: string;
  status_id: string;
}

export interface IndividualPlan {
  id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  year: number;
  name: string;
  family_name: string;
  middle_name: string;
  position: string;
  avatar: string;
  team_id: string;
  task_count: number;
  task_progress: number;
  tasks: Task[];
}
