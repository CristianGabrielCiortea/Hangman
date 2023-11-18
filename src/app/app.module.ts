import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { HttpClientModule } from '@angular/common/http';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaskingPipe } from './masking.pipe';
import { DifficultyComponent } from './difficulty/difficulty.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    AlphabetComponent,
    MaskingPipe,
    DifficultyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
