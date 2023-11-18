import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private currentWord = '';
  private correctGuessedLetters: string[] = [];
  private incorrectGuessedLetters: string[] = [];
  private remainingLetters: string[] = [];
  private static readonly ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
  private static readonly MAX_ATTEMPTS = 6;

  constructor() {}

  startNewGame(word: string) {
    this.currentWord = word;
    this.remainingLetters = Array.from(GameService.ALPHABET);
  }

  getRemainingLetters(): string[] {
    return this.remainingLetters;
  }

  getWord(): string {
    return this.currentWord;
  }

  getCorrectGuessedLetters(): string[] {
    return this.correctGuessedLetters;
  }

  getIncorrectGuessedLetters(): string[] {
    return this.incorrectGuessedLetters;
  }

  getMaxAttempts(): number {
    return GameService.MAX_ATTEMPTS;
  }

  makeGuess(letter: string) : boolean {
    if (this.remainingLetters.includes(letter)) {
      this.remainingLetters = this.remainingLetters.filter((l) => l !== letter);
      if (this.currentWord.includes(letter)) {
        this.correctGuessedLetters.push(letter);
        return true;
      } else {
        this.incorrectGuessedLetters.push(letter);
        return false;
      }
    }
    return false;
  }

  isGameWon(): boolean {
    const wordLetters = new Set(this.currentWord.split(''));
    const guessedLettersSet = new Set(this.correctGuessedLetters);

    return Array.from(wordLetters).every((letter) =>
      guessedLettersSet.has(letter)
    );
  }

  isGameLost(): boolean {
    return this.incorrectGuessedLetters.length >= GameService.MAX_ATTEMPTS;
  }

  resetGame() {
    this.correctGuessedLetters = [];
    this.incorrectGuessedLetters = [];
    this.remainingLetters = [];
    this.currentWord = '';
  }
}
