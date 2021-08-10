import {Injectable, OnInit} from '@angular/core';
import {Color} from './colors.type';

@Injectable({
  providedIn: 'root'
})
export class MastermindService implements OnInit {

  public static colors = [Color.RED, Color.BLUE, Color.GREEN, Color.YELLOW, Color.ORANGE, Color.PINK, Color.GREY, Color.WHITE];


  private round: number = 1;
  private correctCombination: Color[] = [];

  ngOnInit(): void {
    this.correctCombination = this.generateCode()
  }

  // [ Color, Position ]
  public check(colors: Color[]): [number, number] | undefined {
    if (this.round > 12) {
      console.warn('Maximum rounds exceeded')
      return;
    }

    let positionCounter = 0;
    let colorCounter = 0;
    for (let [index, color] of colors.entries()) {
      if (color === this.correctCombination[index]) {
        positionCounter++;
        colors.splice(index);
      } else if (this.correctCombination.includes(color)) {
        colorCounter++;
        colors.splice(index)
      }
    }

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

}
