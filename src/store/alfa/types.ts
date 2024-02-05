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

export interface CurrentUser {
  is_leader: boolean;
  team_id: string;
  user_id: string;
}

export interface UserTask {
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  id: string;
  idp_id: string;
  task_type: TaskType;
  importance: Importance;
  status_id: string;
  comments: Comment[];
  status: Status;
}

export interface Status {
  id: string;
  slug: string;
  description: string;
  weight: number;
}

export interface Comment {
  id: string;
  task_id: string;
  text: string;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  family_name: string;
  avatar: string;
}

export interface TaskData {
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  idp_id: string;
  importance_id: string;
  task_type_id: string;
  status_id: string;
}

export interface Importance {
  id: string;
  name: string;
}

export interface TaskType {
  id: string;
  name: string;
}

export interface Goals {
  id: string;
  user_id: string;
  goal_name: string;
  employee_side_plus: string;
  employee_side_minus: string;
}
