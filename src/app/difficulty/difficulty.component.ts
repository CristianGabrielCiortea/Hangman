import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-difficulty',
  templateUrl: './difficulty.component.html',
  styleUrls: ['./difficulty.component.css'],
})
export class DifficultyComponent {
  @Output() difficultySelected = new EventEmitter<string>();

  constructor() {}

  selectDifficulty(difficulty: string): void {
    this.difficultySelected.emit(difficulty);
  }
}
