import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFiterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>
    ) {}

    async getTaskById(id: number): Promise<Task> {
        const foundTask = await this.taskRepository.findOne({ where: { id } });

        if(!foundTask) {
            throw new NotFoundException(`task with id: ${id} not found`);
        }

        return foundTask;
    }
}
