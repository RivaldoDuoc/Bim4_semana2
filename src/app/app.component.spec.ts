import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';



describe('AppComponent', () => {
  let statusBarSpy: jasmine.SpyObj<StatusBar>;
  let splashScreenSpy: jasmine.SpyObj<SplashScreen>;
  let platformSpy: jasmine.SpyObj<Platform>;

  beforeEach(waitForAsync(() => {
    // Crear spies para StatusBar, SplashScreen y Platform
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformSpy = jasmine.createSpyObj('Platform', { ready: Promise.resolve() });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await platformSpy.ready(); // Espera a que la promesa de Platform se resuelva
    fixture.detectChanges(); // Asegúrate de detectar cambios después de resolver la promesa

    expect(platformSpy.ready).toHaveBeenCalled();
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });
});

