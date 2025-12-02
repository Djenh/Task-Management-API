import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {

  constructor(private readonly prismaService: PrismaService){}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {

    //TODO: Check if the userId is correct before saving the tasks

    const task = await this.prismaService.task.create({
      data: {
        userId: createTaskDto.userId,
        name: createTaskDto.name, 
        description: createTaskDto.description,
        status: createTaskDto.status
      }
    });

    return task;
  }

  async findAll(): Promise<Task[]> {
    return await this.prismaService.task.findMany({
      include: {user: true}
    });
  }

  async findOne(id: number): Promise<Task | null> {
    return await this.prismaService.task.findUnique({
      where: {id: id}
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return await this.prismaService.task.update({
      where: {id: id},
      data: updateTaskDto
    });
  }

  async remove(id: number): Promise<Task> {
    return await this.prismaService.task.delete({
      where: {id: id}
    });
  }
}
