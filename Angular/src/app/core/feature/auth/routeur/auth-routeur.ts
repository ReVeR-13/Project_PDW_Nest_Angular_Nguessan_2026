import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { SecuriteService } from '../securite';

@Component({
  selector: 'app-auth-routeur',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './auth-routeur.html',
  styleUrl: './auth-routeur.scss',
})
export class AuthRouteur {

  readonly logo: string = '-LOGO-';

  protected authService:AuthService = inject(AuthService);
  protected securiteService:SecuriteService = inject(SecuriteService);

  isFlipped:boolean = false;
  protected title:string = 'Connection';
  protected info:string = 'Bienvenue';

  toSignup() {
    this.isFlipped =true;
    this.title = "Enregistrement";
    /*this.router.navigate([
      '/auth/signup'
    ])*/

  }

  toSignin() {
    this.isFlipped =false;
    this.title = "Connection";
    /*this.router.navigate([
      '/dashbord'
    ]).then();*/
  }

}
