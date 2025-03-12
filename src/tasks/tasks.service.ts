import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './tasks.schema';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel({
      ...createTaskDto,
      status: createTaskDto.status || TaskStatus.TODO,
    });
    return newTask.save();
  }

  async getAllTasks(filter?: any): Promise<Task[]> {
    return this.taskModel.find(filter || {}).exec();
  }

  async getTaskById(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
  }

  async deleteTask(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
