import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '@shared/providers';
import * as _ from 'lodash';
import { CreateTaskDto } from './dtos/create-task.dto';
import { FilterTaskDto } from './dtos/filter-task.dto';
import { PatchTaskDto } from './dtos/patch-task.dto';
@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}

  async getAllTasks() {
    try {
      return await this.prismaService.task.findMany();
    } catch (error) {
      throw new Error(error);
    }
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
    try {
      const task = await this.prismaService.task.findUnique({
        where: { id },
      });

      if (!task) {
        throw new NotFoundException('Task not found');
      }
      return task;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createTask({ title, description, categoryId, userId }: CreateTaskDto) {
    try {
      const existedTask = await this.prismaService.task.findFirst({
        where: { title },
      });

      if (existedTask) {
        throw new UnprocessableEntityException('Task is existed');
      }

      const newTask = await this.prismaService.task.create({
        data: {
          title,
          description,
          categoryId,
          userId,
        },
      });
      return newTask;
    } catch (error) {
      throw new Error(error);
    }
  }

  async patchTask(id: string, { type, value }: PatchTaskDto) {
    try {
      await this.getTaskById(id);
      const result = await this.prismaService.task.update({
        where: { id },
        data: {
          [type]: value,
        },
      });

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteTask(id: string) {
    try {
      await this.prismaService.task.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
