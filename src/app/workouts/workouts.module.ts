import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutsRoutingModule } from './workouts-routing.module';
import { SortablejsModule } from 'angular-sortablejs';
import { WorkoutsComponent } from './workouts.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    WorkoutsRoutingModule,
    ReactiveFormsModule,
    SortablejsModule,
  ],
  declarations: [WorkoutsComponent]
})
export class WorkoutsModule { }
