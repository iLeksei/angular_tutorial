import { Component, OnInit } from '@angular/core';
import {Hero} from "../entities/Hero";
import {HEROES} from "../mocks/heroes";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = HEROES;
  selectedHero?: Hero;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(hero?: Hero): void {
    this.selectedHero = hero;
  }

}
