import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'; // Importa las herramientas necesarias para pruebas unitarias en Angular
import { LoginPage } from './login.page'; // Importa el componente LoginPage que se va a probar
import { IonicModule } from '@ionic/angular'; // Importa el módulo Ionic para las pruebas

// Describe un bloque de pruebas para el LoginPage
describe('LoginPage', () => {
  let component: LoginPage; // Variable para almacenar la instancia del componente
  let fixture: ComponentFixture<LoginPage>; // Variable para almacenar el fixture del componente, que permite interactuar con él

  // Configuración inicial antes de cada prueba
  beforeEach(waitForAsync(() => {
    // Configura el módulo de pruebas
    TestBed.configureTestingModule({
      declarations: [LoginPage], // Declara el componente que se va a probar
      imports: [IonicModule.forRoot()] // Importa el módulo Ionic necesario para el funcionamiento del componente
    }).compileComponents(); // Compila los componentes para prepararlos para la prueba
    
    // Crea un fixture del componente LoginPage
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Realiza la detección de cambios en el componente
  }));

  // Primera prueba: verifica que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente sea verdadera (exista)
  });
});
