import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/shared/models/todo-context.model';

export const setTasks = createAction(
  '[Tasks] Set Tasks',
  props<{ tasks: Task[] }>()
);

export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ task: Task }>()
);

export const updateTaskStatus = createAction(
  '[Tasks] Update Task Status',
  props<{ index: number, newStatus: boolean }>()
);

export const removeTask = createAction(
  '[Tasks] Remove Task',
  props<{ index: number }>()
);