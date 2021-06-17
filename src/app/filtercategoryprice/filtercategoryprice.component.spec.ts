import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltercategorypriceComponent } from './filtercategoryprice.component';

describe('FiltercategorypriceComponent', () => {
  let component: FiltercategorypriceComponent;
  let fixture: ComponentFixture<FiltercategorypriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltercategorypriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltercategorypriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
