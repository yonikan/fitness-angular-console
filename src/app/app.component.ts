import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'fitness-Angular-Console';
  isAuthenticated;
  availableExercises;
  private exChangedSubscription: Subscription;

  constructor(private authService: AuthService ) { }

  ngOnInit () {
    this.isAuthenticated = this.authService.isAuth ? true : false;

    this.exChangedSubscription = this.authService.finishedExercisesChanged.subscribe(
      (exercises: any[]) => {
        this.availableExercises = exercises;
      }
    );
    this.authService.fetchCompletedOrCancelledExercises();
  }

  ngOnDestroy() {
    if (this.exChangedSubscription) {
      this.exChangedSubscription.unsubscribe();
    }
  }
}
