import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  create(createTodoDto: CreateTodoDto): Todo {
    const todo = new Todo(createTodoDto.description);
    this.todos.push(todo);
    return todo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: string): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  update(id: string, updateTodoDto: UpdateTodoDto): Todo | undefined {
    const todo = this.findOne(id);
    if (todo && updateTodoDto.description) {
      todo.description = updateTodoDto.description;
      todo.updatedAt = new Date();
    }
    return todo;
  }

  remove(id: string): boolean {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index > -1) {
      this.todos.splice(index, 1);
      return true;
    }
    return false;
  }
}
