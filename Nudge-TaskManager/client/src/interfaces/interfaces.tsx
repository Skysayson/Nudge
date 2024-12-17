export interface TaskContent {
  taskID: number;
  teamID: number;
  status: string;
  priority: string;
  title: string;
  content: string;
  assigned: string[];
  comments: taskComment[];
  created: Date | null;
  due: Date | null;
}

//THIS ONE IS MINE BTW - USELESS but like just keep it for now typa
export interface TaskSomething {
  taskID: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  status: string;
  teamID: number;
  createdAt: Date;
}

export interface taskComment {
  author: string;
  comment: string;
  created: Date;
}

export interface StatTask {
  status: string;
  Task: TaskContent[];
}
