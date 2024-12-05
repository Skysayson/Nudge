export interface TaskContent {
    status: string;
    priority: string;
    title: string;
    content: string;
    assigned: string[];
    comments: taskComment[];
    created: Date;
    due: Date | null;
}

export interface taskComment {
    author: string;
    comment: string;
    created: Date;
    likes: number;
    dislikes: number;
}

export interface StatTask {
    status: string;
    Task: TaskContent[];
}

