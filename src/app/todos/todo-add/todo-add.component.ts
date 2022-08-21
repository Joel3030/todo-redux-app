import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
})
export class TodoAddComponent implements OnInit {
  text!: FormControl<string | null>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.text = new FormControl('', Validators.required);
  }

  add() {
    if (this.text.invalid) {
      return;
    }

    this.store.dispatch(actions.create({ text: this.text.value! }));

    this.text.reset();
  }
}
