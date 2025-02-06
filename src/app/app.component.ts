import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from './shared/models/todo-context.model';
import { selectAllTasks, selectOpenedTasks } from './core/store/tasks.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  openedTasks: Task[] = [];
  title = 'Todo-App-Angular';

  constructor(private store: Store) { }
  
  ngOnInit(): void {
    this.store.select(selectAllTasks).subscribe(tasks => {
      this.tasks = tasks;
    });
    this.store.select(selectOpenedTasks).subscribe(openedTasks => {
      this.openedTasks = openedTasks;
    });
  }
}
