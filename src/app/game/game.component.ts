import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { WordsService } from '../../services/words.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  guessedWord = '';
  wrongGuesses: string[] = [];
  remainingLetters: string[] = [];
  state = '';
  remainingAttempts: number = 0;
  hangmanState: string[] = [
    'assets/images/hangman-states/6.png',
    'assets/images/hangman-states/5.png',
    'assets/images/hangman-states/4.png',
    'assets/images/hangman-states/3.png',
    'assets/images/hangman-states/2.png',
    'assets/images/hangman-states/1.png',
    'assets/images/hangman-states/0.png',
  ];

  constructor(
    private gameService: GameService,
    private wordsService: WordsService
  ) {}

  ngOnInit() {
    this.wordsService.getRandomWord().subscribe((word) => {
      this.startNewGame(word.word);
    });
  }

  guessLetter(letter: string) {
    this.gameService.makeGuess(letter);
    this.updateGameStatus();
  }

  private startNewGame(word: string) {
    this.gameService.startNewGame(word);
    this.remainingLetters = this.gameService.getRemainingLetters();
    this.remainingAttempts = this.gameService.getMaxAttempts();
    this.guessedWord = this.gameService.getWordState();
  }

  private updateGameStatus() {
    this.wrongGuesses = this.gameService.getIncorrectGuessedLetters();
    this.remainingLetters = this.gameService.getRemainingLetters();

    if (this.gameService.isGameWon() || this.gameService.isGameLost()) {
      this.handleGameEnd();
    } else {
      this.state = '';
      this.guessedWord = this.gameService.getWordState();
      this.remainingAttempts =
        this.gameService.getMaxAttempts() - this.wrongGuesses.length;
    }
  }

  private handleGameEnd() {
    if (this.gameService.isGameWon()) {
      this.state = 'You won!';
    } else {
      this.state = 'You lost!';
    }

    this.guessedWord = this.gameService.getWord();
    this.remainingLetters = [];
    this.remainingAttempts = 0;
  }
}
