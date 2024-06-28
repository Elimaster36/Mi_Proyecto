import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage {
  email!: string;
  password!: string;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController
  ) {}

  async register() {
    if (!this.isEmailValid(this.email)) {
      const toast = await this.toastController.create({
        message:
          "Correo electrónico inválido. Por favor, ingrese un correo válido.",
        duration: 3000,
      });
      await toast.present();
      return;
    }

    try {
      await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );
      const toast = await this.toastController.create({
        message: "Registro exitoso.",
        duration: 3000,
      });
      await toast.present();
      this.router.navigate(["/login"]);
    } catch (error: unknown) {
      const errorMessage = (error as { message: string }).message;
      const toast = await this.toastController.create({
        message: errorMessage,
        duration: 3000,
      });
      await toast.present();
    }
  }

  isEmailValid(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
}
