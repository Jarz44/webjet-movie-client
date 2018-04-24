import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {_} from 'lodash';


import { environment } from '../environments/environment';
import {searchMovie, detailedMovie} from './movie.model';

@Injectable()
export class MoviesService {
  private moviesUrl = environment.moviesUrl;
  private costUrlNoIds = environment.costUrlNoIds;

  constructor(private http: HttpClient) { }

  getMovies(): Observable<searchMovie[]> {
    return this.http.get<searchMovie[]>(this.moviesUrl);
  }

  getMinimumMovieCost(ids): Observable<detailedMovie>{
    let idsStrings = ids.join(',');  
    let costUrl = this.costUrlNoIds + idsStrings;
    return this.http.get<any>(costUrl);
  }

}
