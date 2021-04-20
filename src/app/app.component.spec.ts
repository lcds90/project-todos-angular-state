import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent

  it("should return title", ()=> {
    expect(component.title).toBe("Dashboard de Anotações")
  })

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    })
    .compileComponents();
  }));

  beforeEach(()=> {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    // ativar changeDetection antes de cada teste
    fixture.detectChanges();
  })

  // teste de integração
  it('should create', () => {
    expect(component).toBeTruthy()
  });
  
  it('should return title in H1', () => {
    // manipulação do DOM
    let h1 = fixture.debugElement.query(By.css('h1'))
    expect((h1.nativeElement as Element).textContent).toBe("Dashboard de Anotações")
  });
});
