import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(@Body() task: Task): Promise<Task> {
    return this.taskService.createTask(task);
  }

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Delete(':id')
  deleteTask(@Param('id') taskId: string): Promise<Task> {
    return this.taskService.deleteTask(taskId);
  }

  @Put(':id/status')
  updateTaskStatus(
    @Param('id') taskId: string,
    @Body('status') status: string,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(taskId, status);
  }
}
