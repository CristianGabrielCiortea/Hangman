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

  getWordState(): string {
    const usedLetters = this.correctGuessedLetters.concat(
      this.incorrectGuessedLetters
    );
    return this.currentWord
      .split('')
      .map((char) => (usedLetters.includes(char) ? char : '_'))
      .join('');
  }

  makeGuess(letter: string) {
    if (this.remainingLetters.includes(letter)) {
      this.remainingLetters = this.remainingLetters.filter((l) => l !== letter);
      if (this.currentWord.includes(letter)) {
        this.correctGuessedLetters.push(letter);
      } else {
        this.incorrectGuessedLetters.push(letter);
      }
    }
  }

  isGameWon(): boolean {
    return this.getWordState() === this.currentWord;
  }

  isGameLost(): boolean {
    return this.incorrectGuessedLetters.length >= GameService.MAX_ATTEMPTS;
  }
}
