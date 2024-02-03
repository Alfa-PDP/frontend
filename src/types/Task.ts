import { TaskComment } from './TaskComment';
import { StatusType } from './Status';

export interface TaskData {
  id: number;
  task: string;
  date: string;
  type: string;
  significance: string;
  status: StatusType;
  description: string;
  comments: TaskComment[];
}
