export interface ICreateTaskParams{
    title: string;
    description?: string;
    completed: boolean;
    priority: "low" | "mid" | "high";
    dueDate: Date;
}