import { Pipe, PipeTransform } from '@angular/core';
import { validFilter } from '../filter/filter.actions';
import { Todo } from './models/todo.model';

@Pipe({
  name: 'filterTodo',
})
export class FilterPipe implements PipeTransform {
  transform(todos: Todo[], filter: validFilter): Todo[] {
    switch (filter) {
      case 'completed':
        return todos.filter((todo) => todo.done);
      case 'active':
        return todos.filter((todo) => !todo.done);
      default:
        return todos;
    }
  }
}
