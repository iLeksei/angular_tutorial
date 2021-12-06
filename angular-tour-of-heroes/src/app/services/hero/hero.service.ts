import {Injectable} from '@angular/core';
import {HEROES} from "../../mocks/heroes";
import {Hero} from "../../entities/Hero";
import {catchError, Observable, of, tap} from "rxjs";
import {MessageService} from "../message/message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl: string = 'api/heroes';

  constructor(private messageService: MessageService,
              private httpClient: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    // this.messageService.add('HeroService: fetched heroes');
    // return of(HEROES);
    return this.httpClient.get<Hero[]>(this.heroesUrl)
      // .pipe((data) => {
        // throw new Error("fake error");
        // return data;
      // })
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )

  }

  // getHero(id: number): Observable<Hero | undefined> {
    // const hero: Hero | undefined = HEROES.find( (h: Hero) => h.id === id)
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(hero);
  //}

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  updateHero(hero: Hero | undefined) {
    return this.httpClient.put<Hero>(this.heroesUrl, hero)
      .pipe(
          tap(_ => this.log(`Save hero id=${hero?.id} name=${hero?.name}`)),
          catchError(this.handleError("Saving hero", {}))
        )
  }

  addHero(newHero: Hero) {
    return this.httpClient.post<Hero>(this.heroesUrl, newHero)
      .pipe(
        tap(_ => this.log(`Add new hero id=${_.id} name=${_.name}`)),
        catchError(this.handleError("Saving new hero", {}))
      )
  }

  deleteHero(id: number) {
    const url: string = `${this.heroesUrl}/${id}`
    return this.httpClient.delete(url)
      .pipe(
        tap(_ => this.log(`Delete hero with id=${id}`)),
        catchError(this.handleError("Delete hero", {}))
      )
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term) {
      return of([])
    }
    const url: string = `${this.heroesUrl}/?name=${term.trim()}`;
    return this.httpClient.get<Hero[]>(url)
      .pipe(
        tap(res => res?.length ?
          this.log(`Search hero with name="${term}"`) :
          this.log(`Not found user with name "${term}"`)
        ),
        catchError(this.handleError("Search hero", []))
      )
  }
}
