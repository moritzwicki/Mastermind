import {Component, Input, OnInit} from '@angular/core';
import {Color} from '../colors.type';
import {MastermindService} from '../mastermind.service';

@Component({
  selector: 'app-color-field',
  templateUrl: './color-field.component.html',
  styleUrls: ['./color-field.component.css']
})
export class ColorFieldComponent implements OnInit {

  @Input()
  public col!: number;
  @Input()
  public row!: number;


  public color: Color = Color.RED;

  constructor() {
  }

  ngOnInit(): void {

  }

  toHtmlColor(color: Color): string{
    return Color[color].toLowerCase();
  }

  changeColor() {
    if (this.color === MastermindService.colors.length - 1) {
      this.color = Color.RED
    } else {
      this.color++;
    }
  }
}
