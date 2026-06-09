import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-component',
  imports: [RouterOutlet],
  standalone:true,
  templateUrl: './contact-component.html',
  styleUrl: './contact-component.scss',
})
export class ContactComponent {
  protected readonly contactService : ContactService = inject(ContactService)

  getAll(){
    this.contactService.getAll();
  }
}
