import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';


import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import {searchMovie, detailedMovie} from '../movie.model';
import {MoviesService} from '../movies.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent  {    
  movieCtrl: FormControl;

  filteredMovies: Observable<any[]>; 
  movies: searchMovie[] = [];
  cheapestMovie: detailedMovie;

  loadingMovies: boolean = true;
  moviesServiceFailed: boolean = false;
  
  resultFound: boolean = false;
  serviceFailed: boolean = false;    
  isDetailedMovieSearching: boolean = false;

  titleKey: string = "title";    
  maxSearchResults: number = 10;

  constructor(private http: HttpClient, private moviesService: MoviesService) {
    this.movieCtrl = new FormControl();
    this.filteredMovies = this.movieCtrl.valueChanges
      .pipe(
        startWith(''),
        map(
          movie => 
          movie && typeof(movie) === 'object' ? movie[this.titleKey] : movie
        ),
        map(title => title ? this.filterMovies(title) : this.movies.slice(0, this.maxSearchResults))
      );
  }

  ngOnInit() {
    this.getMovies();
  
  } 

  getMovies(): void {
    this.moviesService.getMovies()
    .subscribe(
      movies => {
        this.movies = movies;
        this.loadingMovies = false;
      }, 
      error => {
        this.moviesServiceFailed = true;
        this.loadingMovies = false;
      }
    );
  }

  onEnter(evt: any){
    if (evt.source.selected) {
      this.cheapestMovie = undefined;
      this.isDetailedMovieSearching = true;
      this.resultFound = false;
      this.serviceFailed = false;
      this.getCost(evt.source.value);
    }
  }

  displayFn(movie?: searchMovie): string | undefined {
    return movie ? movie.title : undefined;
  }

  filterMovies(title: string) {
    return this.movies.filter(movie =>     
         movie.title.toLowerCase().includes(title.toLowerCase())).slice(0,this.maxSearchResults);      
  }
  
  getCost(movie) {
    let idsStrings = movie.providers.map(provider => provider.ID);
    this.moviesService.getMinimumMovieCost(idsStrings).subscribe(
      data=> {
        this.cheapestMovie = data;
        this.isDetailedMovieSearching = false;
        this.resultFound = true;
      },
      error => {
        this.serviceFailed = true;
        this.isDetailedMovieSearching = false;
      });
  }

}
