import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';


import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import {movie as Movie} from '../movie.model';
import {MoviesService} from '../movies.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent  {
    movieCtrl: FormControl;
    filteredMovies: Observable<any[]>; 
  
    movies: Movie[] = [];

    cost: string = "";

  constructor(private http: HttpClient, private moviesService: MoviesService) {
    this.movieCtrl = new FormControl();
    this.filteredMovies = this.movieCtrl.valueChanges
      .pipe(
        startWith(''),
        map(
          movie => 
          movie && typeof(movie) === 'object' ? movie.title : movie
        ),
        map(title => title ? this.filterMovies(title) : this.movies.slice())
      );
  }

  ngOnInit() {
    this.getMovies();
  
  }

  getMovies(): void {
    this.moviesService.getMovies()
    .subscribe(movies => this.movies = movies);
  }


  onEnter(evt: any){
    if (evt.source.selected) {
      this.getCost(evt.source.value);
    }
  }

  displayFn(movie?: Movie): string | undefined {
    return movie ? movie.title : undefined;
  }

  filterMovies(title: string) {
    return this.movies.filter(movie =>     
         movie.title.toLowerCase().includes(title.toLowerCase()));      
  }
  
  getCost(movie) {
    let idsStrings = movie.providers.map(provider => provider.ID);
    this.moviesService.getMinimumMovieCost(idsStrings).subscribe(data => this.cost = data);
  }

}
