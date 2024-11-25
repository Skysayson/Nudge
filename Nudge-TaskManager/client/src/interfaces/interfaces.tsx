export interface TaskContent {
    status: string;
    priority: string;
    title: string;
    content: string;
    assigned: string[];
    comments: taskComment[];
    created: Date;
    due: Date;
}

export interface taskComment {
    author: string;
    comment: string;
    created: Date;
}

export interface UserTeams {
    teams: TeamInfo[]
}

export interface TeamInfo {
    teamName: string;
    teamStatTask: StatTask;
}

export interface StatTask {
    status: string;
    Task: TaskContent[];
}

