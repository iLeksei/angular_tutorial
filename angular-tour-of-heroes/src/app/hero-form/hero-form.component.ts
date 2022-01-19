import {AfterContentInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Hero} from "../entities/Hero";
import {HeroService} from "../services/hero/hero.service";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.sass']
})
export class HeroFormComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, OnDestroy {

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

  ngOnDestroy(): void {
    console.log("hero-form was destroyed...");
  }

  ngDoCheck(): void {
    console.log("Was called after onInit phase and after each changes at component...");
  }

  ngOnInit(): void {
    console.log("Init hero-form...");
  }

  /**
   * Called once after the first ngDoCheck()
   */
  ngAfterContentInit() {
    // contentChild is set after the content has been initialized
    console.log('AfterContentInit');
  }

  /**
   * will not be called, because it doesn't have @Input props
   */
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
