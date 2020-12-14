import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero | undefined = undefined;
  constructor(private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) {
    this.hero = { id: 0, name: '' }
  }

  ngOnInit(): void {
    this.getHero();
  }
  getHero(): void {

    const id = this.route.snapshot.params.id;
    if (id) {
      this.heroService.getHero(parseInt(id))
        .subscribe(res => {
          this.hero = res
        });
    }
  }
  save(): void {
    
    this.heroService.updateHero(this.hero!)
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
}
