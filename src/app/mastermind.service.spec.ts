import {MastermindService} from './mastermind.service';
import {TestBed} from '@angular/core/testing';
import {Color} from './colors.type';

let service: MastermindService;

beforeEach(() => {
  TestBed.configureTestingModule({providers: [MastermindService]});
});

describe('MastermindService', () => {
  it('starts rounds at 1', () => {
    service = TestBed.inject(MastermindService);
    expect(service.round).toBe(1);
  });

  it('tests random correct combination length', () => {
    let service = TestBed.inject(MastermindService)
    expect(service.correctCombination.length).toBe(4);
  });

  it('overrides random colors', () => {
    let service = TestBed.inject(MastermindService)
    setCorrectTo(service, [Color.PINK, Color.RED, Color.WHITE, Color.RED])
    expect(service.correctCombination).toEqual([Color.PINK, Color.RED, Color.WHITE, Color.RED]);
  });

  it('tests wrong combination', () => {
    let service = TestBed.inject(MastermindService)
    setCorrectTo(service, [Color.PINK, Color.RED, Color.WHITE, Color.RED])
    setGuessTo(service, [Color.GREY, Color.BLUE, Color.ORANGE, Color.YELLOW])
    expect(service.check()).toEqual([0, 0])
  });

  it('tests correct combination', () => {
    let service = TestBed.inject(MastermindService)
    setCorrectTo(service, [Color.PINK, Color.RED, Color.WHITE, Color.RED])
    setGuessTo(service, [Color.PINK, Color.RED, Color.WHITE, Color.RED])
    expect(service.check()).toEqual([0, 4])
  });

  it('tests wrong position, correct colors combination', () => {
    let service = TestBed.inject(MastermindService)
    setCorrectTo(service, [Color.PINK, Color.RED, Color.WHITE, Color.RED])
    setGuessTo(service, [Color.RED, Color.WHITE, Color.RED, Color.PINK])
    expect(service.check()).toEqual([4, 0])
  });

  it('tests reoccurring color combination (Guess)', () => {
    let service = TestBed.inject(MastermindService)
    setCorrectTo(service, [Color.PINK, Color.WHITE, Color.WHITE, Color.WHITE])
    setGuessTo(service, [Color.PINK, Color.GREY, Color.PINK, Color.GREY])
    expect(service.check()).toEqual([0, 1])
  });

  it('tests reoccurring color combination (Correct)', () => {
    let service = TestBed.inject(MastermindService)
    setCorrectTo(service, [Color.PINK, Color.PINK, Color.PINK, Color.GREY])
    setGuessTo(service, [Color.PINK, Color.WHITE, Color.WHITE, Color.WHITE])
    expect(service.check()).toEqual([0, 1])
  });

  it('test two correct, two wrong', () => {
    let service = TestBed.inject(MastermindService)
    setCorrectTo(service, [Color.PINK, Color.RED, Color.GREY, Color.GREY])
    setGuessTo(service, [Color.PINK, Color.RED, Color.WHITE, Color.WHITE])
    expect(service.check()).toEqual([0, 2])
  });

  it('test two correct, two wrong positions', () => {
    let service = TestBed.inject(MastermindService)
    setCorrectTo(service, [Color.PINK, Color.RED, Color.WHITE, Color.GREY])
    setGuessTo(service, [Color.PINK, Color.RED, Color.GREY, Color.WHITE])
    expect(service.check()).toEqual([2, 2])
  });



})


function setGuessTo(service: MastermindService, colors: Color[]){
  for (let i = 0; i < 4; i++) {
    service.addTempColor(i+1, colors[i]);
  }
}

function setCorrectTo(service: MastermindService, colors: Color[]){
  service.correctCombination = colors;
}
