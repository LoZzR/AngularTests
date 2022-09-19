import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Observer, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription = new Subscription();
  constructor() { }

  ngOnInit(): void {
    /*this.firstObsSubscription = interval(1000).subscribe( count => {
      console.log(count);
    });*/

    const customIntervalObservable = Observable.create((observer: Observer<number>) => {
      let count = 0;
        setInterval( ()=>{
          observer.next(count);
          if (count === 5) {
            observer.complete();
          }
          if (count > 3) {
            observer.error(new Error("Grater than 3 !!"));
          }
          count++;
        }, 1000);
      } );

      this.firstObsSubscription = customIntervalObservable.pipe(filter((data: number) => {
        return data % 2 === 1;
      }), map( (data: number) => {
        return 'Round: ' + (data + 1);
      })).subscribe( (count: Number) => {
        console.log(count);
      }, (error: Error) => {
          alert(error.message)
      }, () => console.log("Completed !!"));
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
