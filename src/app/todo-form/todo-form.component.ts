// src/app/todo-form/todo-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task } from '../shared/models/todo-context.model';
import { addTask, updateTaskStatus, removeTask } from '../core/store/tasks.actions';
import { selectAllTasks } from '../core/store/tasks.selectors';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  tasks: Task[] = [];
  myForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectAllTasks).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onSubmit() {
    const { value: { name }, invalid } = this.myForm;
    if (invalid || !name.trim()) return;
    
    const newTask: Task = {
      index: this.tasks.length,
      name,
      completed: false
    };

    this.store.dispatch(addTask({ task: newTask }));
    this.myForm.reset();
  }

  onTaskCompletedChange(newVal: boolean, task: Task): void {
    console.log('newVal', newVal);
    
  }

  onChangeStatus({ checked }: MatCheckboxChange, task: Task) {
    this.store.dispatch(updateTaskStatus({ index: task.index, newStatus: checked }));
  }

  onRemove(index: number) {
    this.store.dispatch(removeTask({ index }));
  }
}
