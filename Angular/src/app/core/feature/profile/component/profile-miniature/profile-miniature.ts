;import { Component,  } from '@angular/core';
import { ProfileService } from '../../service';

@Component({
  selector: 'app-profile-miniature',
  imports: [],
  standalone:true,
  templateUrl: './profile-miniature.html',
  styleUrl: './profile-miniature.scss',
})
export class ProfileMiniature {

  constructor(public readonly profile:ProfileService){
  }

}
