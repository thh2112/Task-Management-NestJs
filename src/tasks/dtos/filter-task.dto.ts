import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from 'tasks/tasks.model';

export class FilterTaskDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsString()
  keyword: string;
}
