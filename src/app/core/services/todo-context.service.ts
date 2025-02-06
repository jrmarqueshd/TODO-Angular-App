import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/shared/models/todo-context.model';

@Injectable({
  providedIn: 'root'
})
export class TodoContextService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  
  tasks$ = this.tasksSubject.asObservable();

  setTasks(tasks: Task[]): void {
    this.tasksSubject.next(tasks);
  }

  addTask(task: Task): void {
    const currentTasks = this.tasksSubject.getValue();
    this.tasksSubject.next([...currentTasks, task]);
  }

  updateTaskStatus(index: number, newStatus: boolean): void {
    const tasks = this.tasksSubject.getValue();
    const task = tasks.find(t => t.index === index);
    if (task && task.completed !== newStatus) {
      task.completed = newStatus;
      // Emite um novo array para disparar a atualização
      this.tasksSubject.next([...tasks]);
    }
  }

  removeTask(taskIndex: number): void {
    const updatedTasks = this.tasksSubject.getValue().filter(task => task.index !== taskIndex);
    this.tasksSubject.next(updatedTasks);
  }
}
