import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolysphereConfigComponent } from './polysphere-config.component';

describe('PolysphereConfigComponent', () => {
  let component: PolysphereConfigComponent;
  let fixture: ComponentFixture<PolysphereConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolysphereConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolysphereConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
