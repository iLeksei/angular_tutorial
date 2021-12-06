import { Component, OnInit } from '@angular/core';
import {HeroService} from "../services/hero/hero.service";
import {Hero} from "../entities/Hero";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes()
      .subscribe( heroes => this.heroes = heroes.slice(1, 5));
  }

}
