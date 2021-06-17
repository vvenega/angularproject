import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MispostsComponent } from './misposts.component';

describe('MispostsComponent', () => {
  let component: MispostsComponent;
  let fixture: ComponentFixture<MispostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MispostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MispostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
