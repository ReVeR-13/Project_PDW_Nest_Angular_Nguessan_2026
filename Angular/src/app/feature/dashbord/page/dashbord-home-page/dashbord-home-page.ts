import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SecuriteService } from '../../../../core';

@Component({
  selector: 'app-dashbord-home-page',
  imports: [],
  standalone:true,
  templateUrl: './dashbord-home-page.html',
  styleUrl: './dashbord-home-page.scss',
})
export class DashbordHomePage {

  protected securiteService:SecuriteService = inject(SecuriteService)
  protected title:string = this.securiteService.credential$().username;
  protected mainInfo:string = '--'
}
