import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolysphereSolutionsComponent } from './polysphere-solutions.component';

describe('PolysphereSolutionsComponent', () => {
  let component: PolysphereSolutionsComponent;
  let fixture: ComponentFixture<PolysphereSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolysphereSolutionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolysphereSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
