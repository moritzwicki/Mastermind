import { Component, OnInit } from '@angular/core';
import {MastermindService} from "../mastermind.service";
import {Colors} from "../colors.type";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(public masterMindService: MastermindService) { }

  rounds = [12,11,10,9,8,7,6,5,4,3,2,1];
  cols = [1,2,3,4];

  ngOnInit(): void {
  }

  changeColor(col: number, row: number, colourNow: string) {

  }

}
