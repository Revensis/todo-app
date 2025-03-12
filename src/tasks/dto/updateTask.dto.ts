// src/tasks/dto/updateTask.dto.ts
import { IsOptional, IsString, IsIn } from 'class-validator';
import { TaskStatus } from '../tasks-status.enum';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status?: string;
}
