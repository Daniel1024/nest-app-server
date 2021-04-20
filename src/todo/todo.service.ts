import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { todos } from 'src/mock/todos.mock';
import { v4 as uuidv4 } from 'uuid';
import { TodoEntity } from '@todo/entity/todo.entity';
import { TodoDto } from '@todo/dto/todo.dto';
import { toTodoDto } from '@shared/mapper';
import { TodoCreateDto } from '@todo/dto/todo-create.dto';

@Injectable()
export class TodoService {
  /** 1 */
  todos: TodoEntity[] = todos;

  async getOneTodo(id: string): Promise<TodoDto> {
    const todo = this.todos.find(todo => todo.id === id);
    if (!todo) {
      throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);
    }
    return toTodoDto(todo);
  }

  async getAllTodo(): Promise<TodoDto[]> {
    return todos;
  }

  async createTodo(todoDto: TodoCreateDto): Promise<TodoDto> {
    const { name, description } = todoDto;

    const todo: TodoEntity = {
      id: uuidv4(),
      name,
      description
    };

    this.todos.push(todo);
    return toTodoDto(todo);
  }

// rest of the service has been removed for brevity
}
