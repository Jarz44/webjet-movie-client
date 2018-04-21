import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {movie as Movie} from './movie.model';
import {_} from 'lodash';

@Injectable()
export class MoviesService {
  private moviesUrl = 'http://localhost:3000/movies';
  private costUrlNoIds = 'http://localhost:3000/cost?ids=';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl);
  }

  getMinimumMovieCost(ids) {
    let idsStrings = ids.join(',');  
    let costUrl = this.costUrlNoIds + idsStrings;
    return this.http.get<string>(costUrl);
  }

}
