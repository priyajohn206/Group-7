import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessBoardSolvedComponent } from './chess-board-solved.component';

describe('ChessBoardSolvedComponent', () => {
  let component: ChessBoardSolvedComponent;
  let fixture: ComponentFixture<ChessBoardSolvedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChessBoardSolvedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChessBoardSolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
