import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private currentWord: string = '';
  private incorrectGuesses: string[] = [];
  private remainingLetters: string[] = [];
  private static ALPHABET: string = 'abcdefghijklmnopqrstuvwxyz';

  constructor() {}

  startNewGame(word: string) {
    this.currentWord = word;
    this.incorrectGuesses = [];
    this.remainingLetters = Array.from(GameService.ALPHABET);
  }

  getRemainingLetters() {
    return this.remainingLetters;
  }

  getIncorrectGuesses() {
    return this.incorrectGuesses;
  }

  getWordState() {
    const state = [];
    for (const letter of this.currentWord) {
      if (this.incorrectGuesses.includes(letter)) {
        state.push(letter);
      } else {
        state.push('_');
      }
    }
    return state.join(' ');
  }

  makeGuess(letter: string) {
    if (this.remainingLetters.includes(letter)) {
      this.remainingLetters.splice(this.remainingLetters.indexOf(letter), 1);
      if (!this.currentWord.includes(letter)) {
        this.incorrectGuesses.push(letter);
      }
    }
  }

  isGameWon() {
    if (this.getWordState() === this.currentWord) {
      return true;
    }
    return false;
  }

  isGameLost() {
    return this.incorrectGuesses.length >= 6;
  }
}
