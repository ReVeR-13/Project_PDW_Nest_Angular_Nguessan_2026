import { Component, Inject } from '@angular/core';
import { ProfileService } from '../../service';

@Component({
  selector: 'app-profile-home-page',
  imports: [],
  standalone:true,
  templateUrl: './profile-home-page.html',
  styleUrl: './profile-home-page.scss',
})
export class ProfileHomePage {

  constructor(public readonly profile:ProfileService ){
  }

}
