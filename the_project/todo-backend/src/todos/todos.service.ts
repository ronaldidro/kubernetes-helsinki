import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly repository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.repository.create({
      description: createTodoDto.description,
    });
    return this.repository.save(todo);
  }

  findAll(): Promise<Todo[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Todo | null> {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo | null> {
    const todo = await this.findOne(id);

    if (!todo) return null;

    if (updateTodoDto.description) {
      todo.description = updateTodoDto.description;
    }

    return this.repository.save(todo);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
