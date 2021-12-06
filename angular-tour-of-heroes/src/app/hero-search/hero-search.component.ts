import { Component, OnInit } from '@angular/core';
import {HeroService} from "../services/hero/hero.service";
import {Hero} from "../entities/Hero";
import {Observable, Subject, distinctUntilChanged, debounceTime, switchMap, of} from "rxjs";


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.sass']
})
export class HeroSearchComponent implements OnInit {

  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // @ts-ignore ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
    // this.heroService.searchHeroes(value)
    //   .subscribe( (res: Hero[]) => this.heroes = res);
  }
}
