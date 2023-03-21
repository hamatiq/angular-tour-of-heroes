import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroesComponent } from '../heroes/heroes.component';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit{
  heroes: Hero[] = [];
  constructor(private heroService: HeroService, private messageService: MessageService, private heroesComponent: HeroesComponent){}
  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  model = new Hero( 0,'');

  submitted = false;

  onSubmit(form: NgForm): void  {
    this.submitted = false; 
    if (form.valid){
      this.heroesComponent.add(form.value.name, form.value.power,form.value.alterEgo);
      // clear the form
      form.resetForm();
    }
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
  
    const newHero: Hero = { name } as Hero;
    this.heroService.addHero(newHero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  ngOnInit(): void {
  }
}