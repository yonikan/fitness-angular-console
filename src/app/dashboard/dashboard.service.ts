import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UIService } from '../shared/ui.service';
import { Exercise } from '../training/exercise.model';

import * as moment from 'moment';
import * as _ from 'lodash';

import { Subject, Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  currentMonthDates;
  currentMonthExercises;
  currentMonthCalories;
  now = new Date();
  test;
  finishedExercisesChanged = new Subject<Exercise[]>();
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService) {}

  widgetsDataObservable = new Observable((observer) => {
    this.fbSubs.push(this.db
      .collection('finishedExercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            let test;
            test = doc.payload.doc.data();
            return {
              id: doc.payload.doc.id,
              name: test.name,
              duration: test.duration,
              calories: test.calories,
              date: test.date,
              state: test.state
            };
          });
       })
      )
      .subscribe((exercises: Exercise[]) => {

            // only on the current month calories.
            this.currentMonthExercises = exercises.filter((ex) => {
              // let n1 = ex.date.getMonth();
              // let n2 = this.now.getMonth();
              // return ex.date.getMonth() === this.now.getMonth();
              return;
            });

            this.currentMonthExercises = _.sortBy(this.currentMonthExercises, (o) => {
              return moment(o.date).format('YYYYMMDD');
            }).reverse(); // sort the days

            this.currentMonthExercises = this.currentMonthExercises.slice(0, 7).reverse(); // onky last 7 days



            // this.currentMonthExercises.filter(() => {
            //   let blogPosts;
            //   let dateFrom;
            //   dateFrom = moment(Date.now() - 7 * 24 * 3600 * 1000).format('YYYY-MM-DD');
            //   blogPosts = _.sortBy(blogPosts, (o) => {
            //     return moment(o.date).format('YYYYMMDD');
            //   }).reverse();
            // });


            this.currentMonthCalories = this.currentMonthExercises.map((item) => {
              return item.calories;
            });

            this.currentMonthDates = this.currentMonthExercises.map((item) => {
              let testt = item.date;
              let testt2 = moment(testt).format('MMDD');
              return testt2;
            });

            this.test = [
                  {
                    type: 'lineChart',
                    name: 'current month calories 1',
                    id: '1',
                    lineChartLabels: this.currentMonthDates,
                    lineChartData: [
                      {data: this.currentMonthCalories, label: 'Current Month'}
                    ]
                  },
                  {
                    type: 'lineChart',
                    name: 'current month calories 2',
                    id: '2',
                    lineChartLabels: this.currentMonthDates,
                    lineChartData: [
                      {data: this.currentMonthCalories, label: 'Current Month'}
                    ]
                  },
                  {
                    type: 'lineChart',
                    name: 'current month calories 3',
                    id: '3',
                    lineChartLabels: this.currentMonthDates,
                    lineChartData: [
                      {data: this.currentMonthCalories, label: 'Current Month'}
                    ]
                  },
                  {
                    type: 'lineChart',
                    name: 'current month calories 4',
                    id: '4',
                    lineChartLabels: this.currentMonthDates,
                    lineChartData: [
                      {data: this.currentMonthCalories, label: 'Current Month'}
                    ]
                  }
                ];

            observer.next(this.test);
            observer.complete();
      }));

    // setTimeout(() => {
    //   const testData = [
    //     {
    //       type: 'lineChart',
    //       name: 'widget num 2',
    //       id: '2',
    //       lineChartLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //       lineChartData: [
    //         {data: [65, 59, 80, 81, 56, 55, 40], label: 'Week1'},
    //         {data: [25, 79, 20, 81, 16, 75, 20], label: 'Week2'}
    //       ]
    //     },
    //     {
    //       type: 'lineChart',
    //       name: 'widget num 4',
    //       id: '4',
    //       lineChartLabels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //       lineChartData: [
    //         {data: [65, 59, 80, 81, 56, 55, 40], label: 'Week1'},
    //         {data: [25, 79, 20, 81, 16, 75, 20], label: 'Week2'}
    //       ]
    //     }
    //   ];

    //   observer.next(testData);
    //   observer.complete();
    // }, 2000);
  });
}
