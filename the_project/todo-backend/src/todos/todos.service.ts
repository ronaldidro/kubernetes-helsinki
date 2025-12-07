import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NatsService } from '../nats/nats.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  private readonly logger = new Logger(TodosService.name);

  constructor(
    @InjectRepository(Todo)
    private readonly repository: Repository<Todo>,
    private readonly natsService: NatsService,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.repository.create({
      description: createTodoDto.description,
    });

    const saved = await this.repository.save(todo);
    this.logger.log(`New TODO created: ${JSON.stringify(saved)}`);

    this.natsService.publish('todos.created', saved);

    return saved;
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

    if (updateTodoDto.done !== undefined) {
      todo.done = updateTodoDto.done;
    }

    const updated = await this.repository.save(todo);
    this.natsService.publish('todos.updated', updated);

    return updated;
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
