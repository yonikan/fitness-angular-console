import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  finishedExercisesChanged = new Subject<any[]>();
  // private fbSubs: Subscription[] = [];


  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
      } else {
        this.authChange.next(false);
        this.isAuthenticated = false;
      }
    });
  }

  isAuth() {
    return this.isAuthenticated;
  }

  fetchCompletedOrCancelledExercises() {
    // this.fbSubs.push(this.db
    //   .collection('finishedExercises')
    //   .valueChanges()
    //   .subscribe((exercises: any[]) => {
    //     this.finishedExercisesChanged.next(exercises);
    //   })
    // );
    this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: any[]) => {
        this.finishedExercisesChanged.next(exercises);
        // console.log(exercises);
    });
  }
}
