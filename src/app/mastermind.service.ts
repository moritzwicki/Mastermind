import {Injectable} from '@angular/core';
import {Color} from './colors.type';

@Injectable({
  providedIn: 'root'
})
export class MastermindService {

  public static colors = [Color.RED, Color.BLUE, Color.GREEN, Color.YELLOW, Color.ORANGE, Color.PINK, Color.GREY, Color.WHITE];


  public round: number = 1;
  private correctCombination: Color[] = this.generateCode();

  private tempColors: (Color | null)[] = [Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE];

  // [ Color, Position ]
  public check(): [number, number] | undefined {
    let correctCombinationCopy: (Color | null)[] = [...this.correctCombination]
    if (this.round > 12) {
      console.warn('Maximum rounds exceeded')
      return;
    }
    console.log('TempColors', this.tempColors);

    let positionCounter = 0;
    let colorCounter = 0;
    for (let [index, color] of this.tempColors.entries()) {
      if (color != null && color === correctCombinationCopy[index]) {
        positionCounter++;
        correctCombinationCopy[index] = null;
        this.tempColors[index] = null;
      }
    }

    for (let [index, color] of this.tempColors.entries()) {
      if (color != null && correctCombinationCopy.includes(color)) {
        colorCounter++;
        correctCombinationCopy[index] = null;
        this.tempColors[index] = null;
      }
    }


    console.log('CorrectCombinationCopy', correctCombinationCopy);
    console.log('CorrectCombination', this.correctCombination);

    this.tempColors = [Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE]
    this.round++;
    return [colorCounter, positionCounter];
  }

  public reset(): void {
    this.round = 1;
    this.correctCombination = this.generateCode();
  }

  public addTempColor(col: number, color: Color) {
    this.tempColors[col - 1] = color;
  }

  private generateCode(): Color[] {
    let colors: Color[] = [];
    for (let i = 0; i < 4; i++) {
      colors[i] = Math.floor(Math.random() * 8);
    }
    return colors;

  }

}
