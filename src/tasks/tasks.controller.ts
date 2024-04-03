import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFiterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTaskFiterDto): Task[] {
        if(Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
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

    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id: number) {
        console.log("This is the delete task method")
        console.log(id)
        return this.tasksService.deleteTask(id)
    }

    @Patch(':id/status')
    updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: TaskStatus): Task {
        return this.tasksService.updateTaskStatus(id, status)
    }

}
