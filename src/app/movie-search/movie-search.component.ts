import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {_} from 'lodash';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import {movie as Movie} from '../movie.model';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent  {
    movieCtrl: FormControl;
    filteredMovies: Observable<any[]>; 
  
    movies: Movie[] = [{
      title: 'test',
      id: "cw001"        
    },
    {
      title: 'seven',
      id: "cw001"       
    },{
      title: 'butt',
      id: "cw001" 
    }
    ];

  constructor(private http: HttpClient) {
    this.movieCtrl = new FormControl();
    this.filteredMovies = this.movieCtrl.valueChanges
      .pipe(
        startWith(''),
        map(movie => movie ? this.filterMovies(movie) : this.movies.slice())
      );
  }

  onEnter(evt: any){
    if (evt.source.selected) {
      this.getCost();
    }
  }

  displayFn(movie?: Movie): string | undefined {
    return movie ? movie.title : undefined;
  }

  filterMovies(title: string) {
    return this.movies.filter(movie => 
       movie.title.toLowerCase().includes(title.toLowerCase()));
  }
  
  getCost() {
    let idsStrings = this.movies.map(movie => movie.id).join(',');    

    const url = 'http://localhost:3000/cost?ids=' + idsStrings;

    this.http.get<any[]>(url).subscribe(
      data => {
        console.log(data);
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
