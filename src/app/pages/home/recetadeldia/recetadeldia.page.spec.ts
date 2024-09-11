import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecetadeldiaPage } from './recetadeldia.page';

describe('RecetadeldiaPage', () => {
  let component: RecetadeldiaPage;
  let fixture: ComponentFixture<RecetadeldiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetadeldiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
