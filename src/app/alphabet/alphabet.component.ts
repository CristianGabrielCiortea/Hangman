import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.css'],
})
export class AlphabetComponent {
  @Output() letterSelected = new EventEmitter<string>();
  @Input() remainingLetters: string[] = [];

  selectLetter(letter: string): void {
    this.letterSelected.emit(letter);
  }
}
