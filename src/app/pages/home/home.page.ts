// Importaciones necesarias de Angular e Ionic
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

// Decorador @Component que configura el componente, indicando el selector, el archivo de plantilla HTML y el archivo de estilos CSS.
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // Variable para almacenar el nombre de usuario, inicializada en null.
  usuario: string | null = null;

  // Arreglo de objetos que representan los niveles educativos, cada objeto tiene un ID y el nombre del nivel.
  niveles: any[] = [
    { id: 1, nivel: "Básica incompleta" },
    { id: 2, nivel: "Básica completa" },
    { id: 3, nivel: "Media incompleta" },
    { id: 4, nivel: "Media completa" },
    { id: 5, nivel: "Superior incompleta" },
    { id: 6, nivel: "Superior completa" }
  ];

  // Objeto para almacenar los datos adicionales del usuario como nombre, apellido, educación y fecha de nacimiento.
  data: any = {
    nombre: "",
    apellido: "",
    education: "",
    nacimiento: ""
  };

  // Variable para almacenar mensajes de error, inicializada como una cadena vacía.
  errorMessage: string = "";

  // Constructor que inyecta las dependencias necesarias: ActivatedRoute para manejar los parámetros de la ruta y AlertController para mostrar alertas.
  constructor(private route: ActivatedRoute, public alertController: AlertController) { }

  // Método que se ejecuta al inicializar el componente, suscribe a los parámetros de la ruta para obtener el nombre de usuario.
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.usuario = params['user']; // Obtenemos el usuario desde los queryParams
    });
  }

  // Método para limpiar los datos de usuario ingresados en el formulario, restablece cada campo y el mensaje de error.
  limpiar() {
    this.data.nombre = "";
    this.data.apellido = "";
    this.data.education = "";
    this.data.nacimiento = "";
    this.errorMessage = "";
  }

  // Método asíncrono para mostrar una alerta con la información del usuario si los datos son válidos.
  async mostrar() {
    if (this.validateData()) { // Valida los datos ingresados
      // Crea una alerta con el título y los detalles del usuario
      const alert = await this.alertController.create({
        header: 'Información del Usuario',
        message: `
          Usuario: ${this.usuario}
          Nombre: ${this.data.nombre}
          Apellido: ${this.data.apellido}
          Educación: ${this.findNivel(this.data.education)}
          Nacimiento: ${this.data.nacimiento}
        `,
        buttons: ['OK']
      });
      await alert.present(); // Muestra la alerta en pantalla
    } else {
      // Si la validación falla, muestra un mensaje de error en una alerta
      this.presentAlert("Error", "Por favor, complete todos los campos correctamente.");
    }
  }

  // Método para buscar el nombre del nivel educativo según su ID.
  findNivel(id: number): string {
    const nivel = this.niveles.find(nivel => nivel.id === id); // Busca el nivel educativo en el arreglo
    return nivel ? nivel.nivel : "No especificado"; // Retorna el nombre del nivel o "No especificado" si no lo encuentra
  }

  // Método para validar si todos los campos del formulario están completos.
  validateData(): boolean {
    // Verifica que todos los campos estén llenos, si no, muestra un mensaje de error y retorna falso.
    if (this.data.nombre === "" || this.data.apellido === "" || this.data.education === "" || this.data.nacimiento === "") {
      this.errorMessage = "Por favor, complete todos los campos.";
      return false;
    }
    // Si todos los campos están completos, limpia el mensaje de error y retorna verdadero.
    this.errorMessage = "";
    return true;
  }

  // Método asíncrono para mostrar una alerta personalizada con un mensaje dado.
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present(); // Muestra la alerta en pantalla
  }
}
