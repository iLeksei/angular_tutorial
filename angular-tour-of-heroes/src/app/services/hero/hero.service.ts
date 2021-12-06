import {Injectable} from '@angular/core';
import {HEROES} from "../../mocks/heroes";
import {Hero} from "../../entities/Hero";
import {Observable, of} from "rxjs";
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
  }

  getHero(id: number): Observable<Hero | undefined> {
    const hero: Hero | undefined = HEROES.find( (h: Hero) => h.id === id)
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
