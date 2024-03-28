import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTask(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Get(':id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Task {
        console.log(typeof id)
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

}
