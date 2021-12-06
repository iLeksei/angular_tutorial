import {Injectable} from '@angular/core';
import {HEROES} from "../../mocks/heroes";
import {Hero} from "../../entities/Hero";
import {Observable, of} from "rxjs";
import {MessageService} from "../message/message.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

}
