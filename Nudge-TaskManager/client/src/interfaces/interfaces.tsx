export interface TaskContent {
    priority: string;
    title: string;
    content: string;
    assigned: string[];
    comments: number;
}
export interface StatTask {
    status: string;
    tasks: number;
    Content: TaskContent;
}

