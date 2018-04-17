import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import {movie} from '../movie.model';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent  {
    movieCtrl: FormControl;
    filteredMovies: Observable<any[]>; 
  
    movies: movie[] = [{
      title: 'test'        
    },
    {
      title: 'seven'        
    },{
      title: 'butt'        
    }
    ];

  constructor() {
    this.movieCtrl = new FormControl();
    this.filteredMovies = this.movieCtrl.valueChanges
      .pipe(
        startWith(''),
        map(movie => movie ? this.filterMovies(movie) : this.movies.slice())
      );
  }

  onEnter(evt: any, opt: any){
    if (evt.source.selected) {
      alert(evt.source.value);
    }
  }

  filterMovies(title: string) {
    console.log("title: " + title);
    console.log(this.filteredMovies);
    return this.movies.filter(movie =>
      movie.title.toLowerCase().indexOf(title.toLowerCase()) === 0);
  }  

}
