import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import * as actions from '../../filter/filter.actions';
import { removeCompleted } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css'],
})
export class TodoFooterComponent implements OnInit {
  currentFilter: actions.validFilter = 'all';
  filters: actions.validFilter[] = ['all', 'completed', 'active'];

  active = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe(({ todos, filter }) => {
      this.currentFilter = filter;
      this.active = todos.filter((todo) => !todo.done).length;
    });
  }

  changeFilter(filter: actions.validFilter) {
    this.store.dispatch(actions.setFilter({ filter: filter }));
  }

  clearCompleted() {
    this.store.dispatch(removeCompleted());
  }
}
