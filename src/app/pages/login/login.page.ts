// Importaciones necesarias de Angular e Ionic
import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

// Decorador @Component que configura el componente de la página de login, indicando el selector, el archivo de plantilla HTML y el archivo de estilos CSS.
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Objeto que contiene los datos de inicio de sesión (nombre de usuario y contraseña)
  login = {
    Usuario: "",
    Password: ""
  };

  // Variable para almacenar mensajes de error, inicializada como una cadena vacía.
  errorMessage: string = "";

  // Constructor que inyecta las dependencias necesarias: ToastController para mostrar mensajes emergentes, Router para la navegación y NavController.
  constructor(public toastController: ToastController, private router: Router, private navCtrl: NavController) { }

  // Método que se ejecuta al inicializar el componente, en este caso no realiza ninguna acción específica.
  ngOnInit() { }

  // Método asíncrono para manejar el evento de inicio de sesión, navega a la página de inicio si los datos son válidos.
  async IonProgressBar() {
    // Valida los datos del modelo de inicio de sesión
    if (this.validateModel(this.login)) {
      // Convierte el nombre de usuario a cadena de texto y lo asigna a la variable `username`
      const username = this.login.Usuario.toString();
      // Configura los parámetros de navegación con el nombre de usuario en `queryParams`
      const navigationExtras: NavigationExtras = {
        queryParams: { user: username } // Usamos queryParams para pasar el usuario a la página de destino
      };
      // Navega a la página de inicio (`/home`) y pasa los datos adicionales.
      this.router.navigate(['/home'], navigationExtras);
      // Eliminamos el Toast de bienvenida para evitar mostrar el cuadro negro.
    } else {
      // Si la validación falla, muestra el mensaje de error guardado en `errorMessage`
      await this.presentToast(this.errorMessage, 10000); // Duración de 10 segundos para el mensaje de error
    }
  }

  // Método para validar los datos del formulario de inicio de sesión
  validateModel(model: any): boolean {
    // Verifica que el nombre de usuario tenga entre 3 y 8 caracteres
    if (model.Usuario.length < 3 || model.Usuario.length > 8) {
      this.errorMessage = "El nombre de usuario debe tener entre 3 y 8 caracteres.";
      return false;
    }
    // Verifica que la contraseña sea un número de 4 dígitos
    if (!/^\d{4}$/.test(model.Password)) {
      this.errorMessage = "La contraseña debe ser un número de 4 dígitos.";
      return false;
    }
    // Verifica que ambos campos no estén vacíos
    if (model.Usuario.trim() === "" || model.Password.trim() === "") {
      this.errorMessage = "Todos los campos son obligatorios.";
      return false;
    }
    // Si todas las validaciones pasan, limpia el mensaje de error y retorna true
    this.errorMessage = "";
    return true;
  }

  // Método asíncrono para mostrar un mensaje emergente (toast) en pantalla, útil para mostrar errores
  async presentToast(message: string, duration = 3000) {
    // Crea un mensaje emergente con el contenido y la duración especificada, mostrado en la parte superior de la pantalla
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'top'
    });
    // Presenta el mensaje emergente en pantalla
    toast.present();
  }
}
