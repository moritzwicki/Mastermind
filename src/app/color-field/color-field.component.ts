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


  public color: Color = Color.WHITE;

  constructor(private mastermindService: MastermindService) {
  }

  ngOnInit(): void {

  }

  toHtmlColor(color: Color): string{
    return Color[color].toLowerCase();
  }

  changeColor() {
    if (this.color === MastermindService.colors.length - 1) {
      this.color = Color.GREEN
    } else {
      this.color++;
    }
    this.mastermindService.addTempColor(this.col, this.color);
  }

  isDisabled(): boolean {
    return this.row !== this.mastermindService.round
  }
}


