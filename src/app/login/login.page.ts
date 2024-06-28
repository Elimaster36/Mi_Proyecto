import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage {
  email!: string;
  password!: string;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController
  ) {}

  async login() {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      if (userCredential.user) {
        this.router.navigate(["/home"]);
      } else {
        const toast = await this.toastController.create({
          message: "Por favor",
          duration: 3000,
        });
        await toast.present();
      }
    } catch (error: unknown) {
      const errorMessage = (error as { message: string }).message;
      const toast = await this.toastController.create({
        message: errorMessage,
        duration: 3000,
      });
      await toast.present();
    }
  }
}
