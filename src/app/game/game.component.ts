import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { WordsService } from '../../services/words.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  word: string = '';
  guessedWord: string = '';
  guesses: string[] = [];
  remainingLetters: string[] = [];

  constructor(
    private gameService: GameService,
    private wordsService: WordsService
  ) {}

  ngOnInit() {
    this.wordsService.getRandomWord().subscribe((word) => {
      this.word = word.word;
    });
    this.gameService.startNewGame(this.word);
    this.remainingLetters = this.gameService.getRemainingLetters();
  }

  guessLetter(letter: string) {
    this.gameService.makeGuess(letter);
    this.guesses = this.gameService.getIncorrectGuesses();
    this.remainingLetters = this.gameService.getRemainingLetters();
    if(this.gameService.isGameWon()) {
      this.word = 'You won!'
    }
    if(this.gameService.isGameLost()) {
      this.word = 'You lost!'
    }
    this.guessedWord = this.gameService.getWordState();
  }
}
