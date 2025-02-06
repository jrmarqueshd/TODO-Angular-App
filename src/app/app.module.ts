// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store'; 
import { localStorageSync } from 'ngrx-store-localstorage';
import { tasksReducer } from './core/store/tasks.reducer';

export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({ keys: ['tasks'], rehydrate: true })(reducer);
}

@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ tasks: tasksReducer }, {
      metaReducers: [localStorageSyncReducer]
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
