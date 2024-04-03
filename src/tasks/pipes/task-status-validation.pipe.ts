import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    private isStatusValid(status: any) {
        const index = this.allowedStatuses.indexOf(status)
        return index !== -1;
    }

    transform(value: any) {
        if(!this.isStatusValid(value.toUpperCase())) {
            throw new BadRequestException(`"${value}" is an invalid status`)
        }

        return value.toUpperCase();
    }
}