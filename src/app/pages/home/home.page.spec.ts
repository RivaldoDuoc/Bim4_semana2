import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing'; // Importa herramientas para realizar pruebas unitarias en Angular.
import { IonicModule } from '@ionic/angular'; // Importa el módulo de Ionic que se necesita para las pruebas.
import { HomePage } from './home.page'; // Importa el componente HomePage que se va a probar.

describe('HomePage', () => { // Describe un bloque de pruebas para el HomePage.
  let component: HomePage; // Variable para almacenar la instancia del componente.
  let fixture: ComponentFixture<HomePage>; // Variable para almacenar el fixture del componente, que permite interactuar con él.

  beforeEach(waitForAsync(() => { // Configuración que se ejecuta antes de cada prueba de manera asíncrona.
    TestBed.configureTestingModule({ // Configura el módulo de pruebas.
      declarations: [HomePage], // Declara el componente que se va a probar.
      imports: [IonicModule.forRoot()] // Importa el módulo root de Ionic para que el componente y sus dependencias funcionen correctamente.
    }).compileComponents(); // Compila los componentes declarados en el TestBed.

    fixture = TestBed.createComponent(HomePage); // Crea un fixture de la instancia del componente HomePage.
    component = fixture.componentInstance; // Obtiene la instancia del componente desde el fixture.
    fixture.detectChanges(); // Detecta y aplica cualquier cambio en la vista del componente.
  }));

  it('should create', () => { // Define una prueba que verifica que el componente se crea correctamente.
    expect(component).toBeTruthy(); // Verifica que la instancia del componente sea verdadera (exista).
  });
});
