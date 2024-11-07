// Importaciones necesarias desde Angular para crear el servicio y manejar rutas
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

// Decorador @Injectable indica que esta clase es un servicio inyectable en toda la aplicación
@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación sin necesidad de declararlo en módulos específicos
})
// Implementa la interfaz Resolve para resolver datos antes de que se cargue el componente correspondiente
export class UserResolver implements Resolve<string | null> {
  
  // Método 'resolve' que se ejecuta antes de cargar el componente de la ruta asociada
  // Este método intenta obtener el nombre de usuario de los parámetros de la consulta de la ruta
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string | null> | Promise<string | null> | string | null {
    // Obtiene el nombre de usuario de los parámetros de consulta (queryParams) en la ruta
    const username = route.root.queryParams['user'] || null; // Si no se encuentra, devuelve null
    return of(username); // Retorna un Observable que emite el nombre de usuario o null
  }
}
