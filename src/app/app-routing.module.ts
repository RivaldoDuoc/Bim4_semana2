import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserResolver } from './resolvers/user.resolver';

// Arreglo de rutas de la aplicación.  Cada objeto define una ruta con su path y la forma de cargar el módulo correspondiente.
const routes: Routes = [
  // Ruta por defecto. Si no se especifica ninguna ruta, redirige a 'login'.
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  // Ruta para la página de login.  Carga el módulo LoginPageModule de forma asíncrona.
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  // Ruta para la página de inicio (home). Carga el módulo HomePageModule de forma asíncrona.
  // Utiliza el UserResolver para obtener el nombre de usuario antes de cargar la página.
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    resolve: { user: UserResolver } // Aquí se define que se utilizará UserResolver para esta ruta.
  },
  // Agrega aquí cualquier otra ruta que necesites.
];

// Decorador @NgModule que configura el módulo de enrutamiento.
@NgModule({
  // Importa RouterModule.forRoot para configurar las rutas de la aplicación.  PreloadAllModules carga todos los módulos de forma anticipada para mejorar el rendimiento.
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  // Exporta RouterModule para que otros módulos puedan utilizarlo.
  exports: [RouterModule],
  // Define los proveedores de este módulo, incluyendo UserResolver para que esté disponible en las rutas que lo necesiten.
  providers: [UserResolver] 
})
export class AppRoutingModule { }


