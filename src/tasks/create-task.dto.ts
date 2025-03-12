import { IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';
import { TaskStatus } from './tasks-status.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  @IsIn([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status?: TaskStatus;
}
