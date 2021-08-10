import {Component, OnInit} from '@angular/core';
import {MastermindService} from "../mastermind.service";
import {Color} from '../colors.type';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  rounds = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  cols = [1, 2, 3, 4];


  constructor(public masterMindService: MastermindService) {
  }

  ngOnInit(): void {
  }

  submitGuess() {
    let correction = this.masterMindService.check();
    if (!correction) {
      alert('You lost!');
    }
  }
}
