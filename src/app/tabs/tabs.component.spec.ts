import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TabsComponent } from './tabs.component';
import { of } from 'rxjs';

describe('TabsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: of({}) } } } // Mock de ActivatedRoute
      ]
    })
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TabsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
