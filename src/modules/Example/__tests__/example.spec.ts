import { TestBed, async } from '@angular/core/testing';
import { ExampleComponent } from '../example';

describe('ExampleComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExampleComponent
      ],
    }).compileComponents();
  }));
  it('should create the example component', async(() => {
    const fixture = TestBed.createComponent(ExampleComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
