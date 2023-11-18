import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'masking',
  pure: false
})
export class MaskingPipe implements PipeTransform {
  transform(word: string, guessedLetters: string[]): string {
    return word
      .split('')
      .map((char) => (guessedLetters.includes(char) ? char : '_'))
      .join('');
  }
}
