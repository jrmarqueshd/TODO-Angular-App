import { createReducer, on } from '@ngrx/store';
import { Task } from 'src/app/shared/models/todo-context.model';
import * as TasksActions from './tasks.actions';

export const initialState: Task[] = [];

export const tasksReducer = createReducer(
  initialState,
  on(TasksActions.setTasks, (state, { tasks }) => [...tasks]),
  on(TasksActions.addTask, (state, { task }) => [...state, task]),
  on(TasksActions.updateTaskStatus, (state, { index, newStatus }) => {
    const task = state.find(task => task.index === index);

    if (task && task.completed === newStatus) return state;

    return state.map(task => task.index === index ? { ...task, completed: newStatus } : task)
  }),
  on(TasksActions.removeTask, (state, { index }) => 
    state.filter(task => task.index !== index)
  )
);