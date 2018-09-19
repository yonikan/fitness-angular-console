import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLoading = true;
  widgetsData;
  widgetsDataSubscription: Subscription;

  constructor(private dashboardService: DashboardService ) {}

  ngOnInit() {

    // let test = this.dashboardService.fetchCompletedOrCancelledExercisesForCharts();


    this.widgetsDataSubscription = this.dashboardService.widgetsDataObservable.subscribe(
      resp => {
        this.isLoading = resp ? false : true;
        this.widgetsData = resp;
      }
    );
  }
}
