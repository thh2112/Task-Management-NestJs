import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { FilterTaskDto } from './dtos/filter-task.dto';
import * as _ from 'lodash';
@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getAllTasks(@Query() filter?: FilterTaskDto) {
    if (_.values(filter).length) {
      return this.tasksService.getTasksWithFilters(filter);
    }

    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() task: CreateTaskDto) {
    return this.tasksService.createTask(task);
  }

  @Put('/:id')
  updateTask() {}

  @Patch('/:id')
  patchTask() {}

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    if (!id) {
      return;
    }
    return this.tasksService.deleteTask(id);
  }
}
