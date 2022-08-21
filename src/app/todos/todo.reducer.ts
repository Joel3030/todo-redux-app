import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import * as actions from './todo.actions';

export const initialState: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Salvar al universo'),
  new Todo('Salvar al matar a tano'),
  new Todo('terminar todo'),
];

export const todoReducer = createReducer(
  initialState,
  on(actions.create, (state, { text }) => [...state, new Todo(text)]),
  on(actions.remove, (state, { id }) => state.filter((todo) => todo.id !== id)),
  on(actions.removeCompleted, (state) => state.filter((todo) => !todo.done)),
  on(actions.toggle, (state, { id }) => {
    return state.map((todo) => {
      if (id === todo.id) {
        return {
          ...todo,
          done: !todo.done,
        };
      } else {
        return todo;
      }
    });
  }),
  on(actions.toggleAll, (state, { done }) => {
    return state.map((todo) => {
      return {
        ...todo,
        done: done,
      };
    });
  }),
  on(actions.edit, (state, { id, text }) => {
    return state.map((todo) => {
      if (id === todo.id) {
        return {
          ...todo,
          text: text,
        };
      } else {
        return todo;
      }
    });
  })
);
