import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Todo } from '../models/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../todo.actions';

interface todoItemForm {
  done: FormControl<boolean>;
  text: FormControl<string>;
}

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;

  @ViewChild('text') textInput!: ElementRef;

  todoItemFormGroup!: FormGroup<todoItemForm>;

  editing = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.done?.valueChanges.subscribe({
      next: () => {
        this.store.dispatch(actions.toggle({ id: this.todo.id }));
      },
    });
  }

  edit() {
    this.editing = true;

    this.todoItemFormGroup.patchValue({
      text: this.todo.text,
    });

    setTimeout(() => {
      this.textInput.nativeElement.select();
    }, 0);
  }

  finishEditing() {
    this.editing = false;

    if (this.todoItemFormGroup.invalid || this.text?.value === this.todo.text) {
      return;
    }

    this.store.dispatch(
      actions.edit({ id: this.todo.id, text: this.text?.value! })
    );
  }

  remove() {
    this.store.dispatch(actions.remove({ id: this.todo.id }));
  }

  private createForm() {
    this.todoItemFormGroup = this.formBuilder.nonNullable.group({
      done: [this.todo.done],
      text: [this.todo.text, Validators.required],
    });
  }

  get done() {
    return this.todoItemFormGroup.get('done');
  }

  get text() {
    return this.todoItemFormGroup.get('text');
  }
}
