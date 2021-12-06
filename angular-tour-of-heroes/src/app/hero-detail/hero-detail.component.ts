import {Component, Input, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../services/hero/hero.service";
import {Hero} from "../entities/Hero";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.sass']
})
export class HeroDetailComponent implements OnInit {


  @Input() hero?: Hero;

  constructor(private heroService: HeroService,
              private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
   this.heroService.getHero(Number(this.route.snapshot.paramMap.get("id")))
     .subscribe( hero => this.hero = hero);
  }

  goBack() {
    this.location.back();
  }

}
