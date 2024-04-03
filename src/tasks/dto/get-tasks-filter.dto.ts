import { TaskStatus } from "../task.model";

export class GetTaskFiterDto {
    status: TaskStatus;
    searchTerm: string;
}