import { Component } from '@angular/core';
import {  HttpClient, HttpErrorResponse} from '@angular/common/http';

import {movie} from './movie.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  movies : movie[] = [];

  constructor(private http: HttpClient) {
    
  }  

  ngOnInit(): void{
    this.http.get<movie[]>('http://localhost:3000/movies').subscribe(
      data => {
        console.log(data);
        this.movies = data;//["Movies"];
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error.");
        } else {
          console.log("Server-side error occured.");
        }
      }
    );
  }
}
