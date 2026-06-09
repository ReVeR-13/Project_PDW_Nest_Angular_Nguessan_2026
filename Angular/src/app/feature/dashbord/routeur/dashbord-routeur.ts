import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HorlogeService, SecuriteService } from '../../../core';
import { DashbordMenu } from '../component';
import { AuthService } from '../../../core/feature/auth/service';

@Component({
  selector: 'app-dashbord-routeur',
  imports:
    [
      DashbordMenu,
      RouterOutlet,
    ],
  standalone: true,
  templateUrl: './dashbord-routeur.html',
  styleUrl: './dashbord-routeur.scss',
})
export class DashbordRouteur {
  protected readonly title: string = 'pattoon';
  protected authService:AuthService= inject(AuthService)
  protected securiteService: SecuriteService = inject(SecuriteService);
  protected horloge: HorlogeService = inject(HorlogeService);

  protected chemin:string = this.authService.redirectToSecureUrl$().replaceAll('/',' > ');


  protected profile = {
    nom: this.securiteService.credential$().username,
    email: this.securiteService.credential$().email
  }

  protected Logout() {
    this.securiteService.logOut();
    
  }
}
