import { Injectable, NotFoundException } from '@nestjs/common';
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

        // filtering based on status
        if (status) {
            tasks = tasks.filter(task => task.status === status)
        }

        // filtering based on search Term
        if (searchTerm) {
            tasks = tasks.filter(task => 
                task.title.includes(searchTerm) || 
                task.description.includes(searchTerm)
            );
        }

        return tasks;
    }

    getTaskById(id: number): Task {
        const foundTask = this.tasks.find(task => task.id === id);

        if(!foundTask) {
            throw new NotFoundException(`task with id: ${id} not found`);
        }

        return foundTask;
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
        const foundTask = this.getTaskById(id);

        this.tasks = this.tasks.filter(task => task.id !== foundTask.id)
    }

    updateTaskStatus(id: number, status: TaskStatus): Task {
        const foundTask = this.getTaskById(id);

        foundTask.status = status;
        
        return foundTask;
    }
}
