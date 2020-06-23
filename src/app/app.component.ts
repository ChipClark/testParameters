import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testParams';

  public duration: number;
  public pauseIterations = 0;
  public accessIterations = 0;
  public waitingString: string;
  public finishedString: string;

  constructor(
    private route: ActivatedRoute,
    private _route: Router,
  ) { }

  ngOnInit() {
    this.accessParameters();
    this.pauseAMoment();
   }



  async accessParameters(): Promise<any> {
    this.accessIterations++;
    console.log("in accessParameters() " + this.accessIterations);
    this.route.queryParamMap.subscribe(params => {
      const queryStrings: any = this.route.queryParamMap;
      this.executeQueryParams(queryStrings.source.value).then( results => {
      });
    });
    console.log("end of accessParameters(); about to pauseAMoment()");
    await this.pauseAMoment();

    return;
  }

  addQueryParams(query): void {
    const keys = Object.keys(query);
    const values = Object.values(query);
    if (query === "") {
      query = null;
    }
    this._route.navigate([''], {
      queryParams: {
        ...query
      },
      queryParamsHandling: 'merge',
    });
    this.pauseAMoment();
  }

  clearQueryParams(): void {
    this.duration = null;
    this.addQueryParams({search: null})
    this._route.navigate([''], {
      queryParams: {
      }
    });
  }

  async executeQueryParams(queryStrings): Promise<any> {
    const queries = Object.entries(queryStrings);
    for (const q of queries) {
      switch (q[0]) {
        case 'duration':
          console.log('in switch');
          this.duration = +q[1];
          break;
      }
    }
    // console.log("in executeQueryParams(); about to pauseAMoment()");
    // console.log("duration to wait is " + this.duration);
    // await this.pauseAMoment();
    // console.log("end of executeQueryParams()");
    return;
  }

  async pauseAMoment(): Promise<any> {
    this.pauseIterations++;
    console.log("in pauseAMoment() " + this.pauseIterations);
    this.finishedString = "We are not waiting"
    console.log("the duration to wait is " + this.duration + " seconds");
    let timeout = this.duration * 1000
    setTimeout(function() {
      this.finishedString = "We are done waiting.";
      console.log(this.finishedString);
    }, timeout);
    this.waitingString = "We are waiting for " + this.duration + " seconds";
    console.log(this.waitingString);
    return;
  }

}
