import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Hero} from "../entities/Hero";
import {HeroService} from "../services/hero/hero.service";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.sass']
})
export class HeroFormComponent implements OnInit, OnChanges {

  powers: string[] = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

  model: Hero =  {
    id: 99,
    name: "Dr IQ",
    power: this.powers[0],
    alterEgo: "Chuck Overstreet",
  };

  submitted: boolean = false;

  @Input() timer = 0;

  onSubmit() { this.submitted = true; }

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    console.log("Init hero-form...");
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur  = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`)
    }
  }

  newHero(): void {
    if (this.model.name && this.model.power && this.model.alterEgo) {
      const newHero = this.model;
      delete newHero.id;
      // this.loggerService.info("Add new hero: " + JSON.stringify(newHero))
      this.heroService.addHero(newHero);
    }
    return;
  }
}
