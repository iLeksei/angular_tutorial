import {Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Hero} from "../../entities/Hero";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() {
  }

  createDb(): {} | Observable<{}> | Promise<{}> {
    const heroes: Hero[] = [
      { id: 11, name: 'Dr Nice', power: "", alterEgo: "" },
      { id: 12, name: 'Narco', power: "", alterEgo: "" },
      { id: 13, name: 'Bombasto', power: "", alterEgo: "" },
      { id: 14, name: 'Celeritas', power: "", alterEgo: "" },
      { id: 15, name: 'Magneta', power: "", alterEgo: "" },
      { id: 16, name: 'RubberMan', power: "", alterEgo: "" },
      { id: 17, name: 'Dynama', power: "", alterEgo: "" },
      { id: 18, name: 'Dr IQ', power: "", alterEgo: "" },
      { id: 19, name: 'Magma', power: "", alterEgo: "" },
      { id: 20, name: 'Tornado', power: "", alterEgo: "" }
    ];
    return {heroes}; // api/heroes
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map((hero: any) => hero.id)) + 1 : 11;
  }
}
