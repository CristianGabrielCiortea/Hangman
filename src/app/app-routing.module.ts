import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { DifficultyComponent } from './difficulty/difficulty.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'difficulty', component: DifficultyComponent },
  { path: 'game', component: GameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
