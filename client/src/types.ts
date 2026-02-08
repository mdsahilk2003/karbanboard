export type Status = 'Todo' | 'In Progress' | 'Done';

export interface Task {
    _id: string;
    title: string;
    status: Status;
    order: number;
}
