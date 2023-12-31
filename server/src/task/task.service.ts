import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async createTask(task: Task): Promise<Task> {
    const createdTask = new this.taskModel(task);
    return await createdTask.save();
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async deleteTask(taskId: string): Promise<Task> {
    return await this.taskModel.findByIdAndRemove(taskId).exec();
  }

  async updateTaskStatus(taskId: string, status: string): Promise<Task> {
    return await this.taskModel
      .findByIdAndUpdate(taskId, { status: status }, { new: true })
      .exec();
  }
}
