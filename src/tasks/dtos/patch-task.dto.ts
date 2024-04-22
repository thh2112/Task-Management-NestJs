import { PatchDto } from '@shared/dtos/patch.dto';
import { IsEnum } from 'class-validator';
import { TaskField } from 'tasks/tasks.model';

export class PatchTaskDto extends PatchDto<TaskField> {
  @IsEnum(TaskField)
  type: TaskField;
}
