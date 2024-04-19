import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dtos/create-task.dto';
import { FilterTaskDto } from './dtos/filter-task.dto';
import * as _ from 'lodash';
@Injectable()
export class TasksService {
  private tasks = [];

  async getAllTasks() {
    return this.tasks;
  }

  async getTasksWithFilters(filter: FilterTaskDto) {
    const tasks = await this.getAllTasks();
    return _.filter(tasks, (task) => {
      const { status, keyword } = filter;
      if (status) {
        return task.status === status;
      }

      if (keyword && (task.description.includes(keyword) || task.title.includes(keyword))) {
        return true;
      }

      return false;
    });
  }

  async getTaskById(id: string) {
    const foundTask = this.tasks?.find((t) => t.id === id);
    if (!foundTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return foundTask;
  }
  createTask(task: CreateTaskDto) {
    const { title, description } = task;
    const taskDto = {
      id: uuid.v4(),
      title,
      description,
    };
    this.tasks.push(taskDto);
    return taskDto;
  }

  async deleteTask(id: string) {
    const task = await this.getTaskById(id);
    return this.tasks?.filter((t) => t.id !== task.id);
  }
}
