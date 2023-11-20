import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { WordsService } from '../../services/words.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  isDifficultySelected = false;
  selectedDifficulty = '';
  guessedWord = '';
  wrongGuesses: string[] = [];
  correctGuesses: string[] = [];
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
    private wordsService: WordsService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.isDifficultySelected) {
      this.fetchRandomWord();
      this.startNewGame(this.guessedWord);
    }
  }

  onDifficultySelected(difficulty: string) {
    this.isDifficultySelected = true;
    this.selectedDifficulty = difficulty;
    this.ngOnInit();
  }

  fetchRandomWord() {
    this.wordsService
      .getRandomWordByDifficulty(this.selectedDifficulty)
      .subscribe((word) => {
        this.startNewGame(word.word);
        this.guessedWord = word.word;
      });
  }

  guessLetter(letter: string) {
    if (this.gameService.makeGuess(letter)) this.playCorrectSound();
    else this.playWrongSound();
    this.updateGameStatus();
  }

  private startNewGame(word: string) {
    this.gameService.startNewGame(word);
    this.remainingLetters = this.gameService.getRemainingLetters();
    this.remainingAttempts = this.gameService.getMaxAttempts();
  }

  private updateGameStatus() {
    this.wrongGuesses = this.gameService.getIncorrectGuessedLetters();
    this.correctGuesses = this.gameService.getCorrectGuessedLetters();
    this.remainingLetters = this.gameService.getRemainingLetters();

    if (this.gameService.isGameWon() || this.gameService.isGameLost()) {
      this.handleGameEnd();
    } else {
      this.state = '';
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
    this.correctGuesses = this.guessedWord.split('');
  }

  isGameDone() {
    return this.gameService.isGameWon() || this.gameService.isGameLost();
  }

  goBack() {
    this.gameService.resetGame();
    this.router.navigate(['/']);
  }

  retryGame() {
    this.gameService.resetGame();
    this.wrongGuesses = [];
    this.correctGuesses = [];
    this.remainingLetters = [];
    this.state = '';
    this.remainingAttempts = 0;
    this.ngOnInit();
  }

  playSound(soundFile: string) {
    let audio = new Audio();
    audio.src = soundFile;
    audio.load();
    audio.play();
  }

  playCorrectSound() {
    this.playSound('assets/sound/correct.mp3');
  }

  playWrongSound() {
    this.playSound('assets/sound/wrong.mp3');
  }
}
