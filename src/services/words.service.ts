import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Count } from '../interfaces/count';
import { Word } from '../interfaces/word';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  private baseUrl = 'http://localhost:3000';

  //json-server --watch words.json
  //run the command above to start the server

  constructor(private http: HttpClient) {}

  getWords(): Observable<Word[]> {
    return this.http.get<Word[]>(`${this.baseUrl}/words`);
  }

  getWord(id: number): Observable<Word> {
    return this.http.get<Word>(`${this.baseUrl}/words/${id}`);
  }

  getCount(): Observable<Count> {
    return this.http.get<Count>(`${this.baseUrl}/count`);
  }

  getWordsByDifficulty(difficulty: string): Observable<Word[]> {
    return this.http.get<Word[]>(
      `${this.baseUrl}/words?difficulty=${difficulty}`
    );
  }

  getRandomWordByDifficulty(difficulty: string): Observable<Word> {
    return this.getWordsByDifficulty(difficulty).pipe(
      switchMap((words) => {
        const count = words.length;
        const randomNumber = Math.floor(Math.random() * count);
        return this.http.get<Word>(
          `${this.baseUrl}/words/${words[randomNumber].id}`
        );
      })
    );
  }
}
