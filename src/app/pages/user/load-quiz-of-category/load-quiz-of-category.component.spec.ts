import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadQuizOfCategoryComponent } from './load-quiz-of-category.component';

describe('LoadQuizOfCategoryComponent', () => {
  let component: LoadQuizOfCategoryComponent;
  let fixture: ComponentFixture<LoadQuizOfCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadQuizOfCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadQuizOfCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
