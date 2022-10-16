import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NQueensConfigComponent } from './nqueens-config.component';

describe('NQueensConfigComponent', () => {
  let component: NQueensConfigComponent;
  let fixture: ComponentFixture<NQueensConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NQueensConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NQueensConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
