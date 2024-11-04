export interface StatTask {
    status: string;
    tasks: number;
}

export interface TaskContent {
    priority: string;
    title: string;
    content: string;
    assigned: string[];
    comments: number;
}
