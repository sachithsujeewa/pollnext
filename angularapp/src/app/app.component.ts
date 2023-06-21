import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { MatTypographyModule } from '@angular/material/typography';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public questions?: Question[]
  public liked = new Array();
  public screenSize?: string;
  question: string='';
  public newQuestion?: Question

  constructor(private readonly http: HttpClient) {
    http.get<Question[]>('https://jjb.azurewebsites.net/question').subscribe(result => {
      this.questions = result;
    }, error => console.error(error)    )
  }

  // ngOnInit() {
  //   private breakpointObserver: BreakpointObserver
  //   this.breakpointObserver.observe([
  //     Breakpoints.Small,
  //     Breakpoints.Medium,
  //     Breakpoints.Large
  //   ]).subscribe(result => {
  //     if (result.breakpoints[Breakpoints.Small]) {
  //       this.screenSize = 'small';
  //     } else if (result.breakpoints[Breakpoints.Medium]) {
  //       this.screenSize = 'medium';
  //     } else if (result.breakpoints[Breakpoints.Large]) {
  //       this.screenSize = 'large';
  //     }
  //   });

   // console.log(this.screenSize)
 // }

  title = 'ASK AKD';

    add =() =>{
 
      var data = {
        "id": 0,
        "questionText": this.question,
        "noOfLikes": 0
      }
     
      this.http.post<Question[]>('https://jjb.azurewebsites.net/question',data).subscribe(result => {
        this.questions = result;
        this.question = '';
      }, error => console.error(error)    )

  }

  clear =() =>{
    this.question='';
  }

  like = (id:number, like: boolean) => {
    var data = {
      "id": id,
      "questionText": '',
      "noOfLikes": like? 1 : 0
    }

    if(like)
    {
      this.liked.push(id);
    }
    else{
      this.liked.splice(this.liked.indexOf(id), 1);

    }
   
    this.http.put<Question[]>('https://jjb.azurewebsites.net/question',data).subscribe(result => {
      this.questions = result;
    }, error => console.error(error)    )

  }

  
}

interface Question{
  id: number,
  questionText: string
  noOfLikes: number
}