import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NQueensSolutionsComponent } from './nqueens-solutions.component';

describe('NQueensSolutionsComponent', () => {
  let component: NQueensSolutionsComponent;
  let fixture: ComponentFixture<NQueensSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NQueensSolutionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NQueensSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
