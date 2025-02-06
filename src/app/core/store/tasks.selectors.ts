import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Task } from 'src/app/shared/models/todo-context.model';

export const selectTasksFeature = createFeatureSelector<Task[]>('tasks');

export const selectAllTasks = createSelector(
  selectTasksFeature,
  (tasks: Task[]) => tasks
);

export const selectOpenedTasks = createSelector(
  selectTasksFeature,
  (tasks: Task[]) => tasks.filter(task => !task.completed)
);