import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostuploadComponent } from './postupload.component';

describe('PostuploadComponent', () => {
  let component: PostuploadComponent;
  let fixture: ComponentFixture<PostuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostuploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
