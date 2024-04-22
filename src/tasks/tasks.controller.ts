import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { FilterTaskDto } from './dtos/filter-task.dto';
import * as _ from 'lodash';
import { PatchTaskDto } from './dtos/patch-task.dto';
@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  async getAllTasks(@Query() filter?: FilterTaskDto) {
    let result = null;
    if (_.values(filter).length) {
      result = await this.tasksService.getTasksWithFilters(filter);
    } else {
      result = await this.tasksService.getAllTasks();
    }

    const response: ApiResponse = {
      isSuccess: true,
      message: 'Get all tasks successfully',
      result,
    };

    return response;
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string) {
    const result = await this.tasksService.getTaskById(id);
    const response: ApiResponse = {
      isSuccess: true,
      message: 'Get task by ID successfully',
      result,
    };

    return response;
  }

  @Post()
  async createTask(@Body() taskDto: CreateTaskDto) {
    const result = await this.tasksService.createTask(taskDto);
    const response: ApiResponse = {
      isSuccess: true,
      message: 'Created task successfully',
      result,
    };

    return response;
  }

  @Patch('/:id')
  async patchTask(@Body() patchTaskDto: PatchTaskDto, @Param('id') id: string) {
    const result = await this.tasksService.patchTask(id, patchTaskDto);
    const response: ApiResponse = {
      isSuccess: true,
      message: 'Updated task successfully',
      result,
    };

    return response;
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string) {
    await this.tasksService.deleteTask(id);
    return {
      isSuccess: true,
      message: 'Delete task successfully',
    };
  }
}
