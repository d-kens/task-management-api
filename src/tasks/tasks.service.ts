import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFiterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTaskFiterDto): Task[] {
        const { status, searchTerm } = filterDto;

        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status)
        }

        if (searchTerm) {
            tasks = tasks.filter(task => 
                task.title.includes(searchTerm) || 
                task.description.includes(searchTerm)
            );
        }

        return tasks;
    }

    getTaskById(id: number): Task {
        const task = this.tasks.find(task => task.id === id);
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

    deleteTask(id: number): void{
       this.tasks = this.tasks.filter(task => task.id !== id)
    }

    updateTaskStatus(id: number, status: TaskStatus): Task {
        const task = this.getTaskById(id)

        console.log(task);

        task.status = status;
        
        return task;
    }
}
