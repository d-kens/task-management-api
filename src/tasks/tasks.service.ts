import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: number): Task {
        const task = this.tasks.find(task => task.id === id);
        console.log('task', task)
        return task;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const tasksByHighestId = [...this.tasks].sort((a,b) => b.id - a.id);

        const { title, description } = createTaskDto;

        const task: Task = {
            id: tasksByHighestId[0] ? tasksByHighestId[0].id + 1 : 1,
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task)

        return task;
    }
}
