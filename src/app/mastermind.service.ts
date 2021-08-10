import {Injectable} from '@angular/core';
import {Color} from './colors.type';

@Injectable({
  providedIn: 'root'
})
export class MastermindService {

  public static colors = [Color.RED, Color.BLUE, Color.GREEN, Color.YELLOW, Color.ORANGE, Color.PINK, Color.GREY, Color.WHITE];


  public round: number = 1;
  private correctCombination: Color[] = this.generateCode();

  private tempColors: Color[] = [Color.WHITE, Color.WHITE, Color.WHITE, Color.WHITE];

  // [ Color, Position ]
  public check(): [number, number] | undefined {
    if (this.round > 12) {
      console.warn('Maximum rounds exceeded')
      return;
    }

    let positionCounter = 0;
    let colorCounter = 0;
    for (let [index, color] of this.tempColors.entries()) {
      if (color === this.correctCombination[index]) {
        positionCounter++;
        this.tempColors.splice(index);
      } else if (this.correctCombination.includes(color)) {
        colorCounter++;
        this.tempColors.splice(index)
      }
    }
    console.log(this.tempColors);
    console.log(this.correctCombination);
    this.round++;
    return [colorCounter, positionCounter];
  }


  private generateCode(): Color[] {
    let colors: Color[] = [];
    for (let i = 0; i < 4; i++) {
      colors[i] = Math.floor(Math.random() * 8);
    }
    return colors;

  }

  public reset(): void {
    this.round = 1;
    this.correctCombination = this.generateCode();
  }

  public addTempColor(col: number, color: Color) {
    console.log(color);
    this.tempColors[col - 1] = color;
  }

}
