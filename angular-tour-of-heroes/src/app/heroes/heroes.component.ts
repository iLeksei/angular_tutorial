import { Component, OnInit } from '@angular/core';
import {Hero} from "../entities/Hero";
import {HEROES} from "../mocks/heroes";
import {HeroService} from "../services/hero/hero.service";
import {MessageService} from "../services/message/message.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  //todo to remove dead method
  onSelect(hero?: Hero): void {
    this.messageService.add(`HeroesComponent: Selected hero id=${hero?.id}`);
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe( heroes => this.heroes = heroes);
  }

}
