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

  getRandomWord(): Observable<Word> {
    return this.getCount().pipe(
      switchMap((response) => {
        const count = response.number;
        const randomNumber = Math.floor(Math.random() * count) + 1;
        return this.http.get<Word>(`${this.baseUrl}/words/${randomNumber}`);
      })
    );
  }
}
