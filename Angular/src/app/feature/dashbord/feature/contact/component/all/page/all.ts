import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../../../contact.service';
import { IContact } from '../../detail';
import { ContactUtils } from '../../../utils';
import { Router } from '@angular/router';
import { AppNode } from '../../../../../../../core';

@Component({
  selector: 'app-contact-all',
  imports: [],
  standalone:true,
  templateUrl: './all.html',
  styleUrl: './all.scss',
})
export class ContactAll implements OnInit{

  protected readonly contactService :ContactService = inject(ContactService);
  protected readonly router:Router = inject(Router);

  protected selecteContact(contact:IContact){
    this.contactService.contact$.set(contact);
    this.router.navigate([`${AppNode.Dashbord}/${AppNode.Contact}/${AppNode.Detail}`])
  }

  protected createContact(){
    this.contactService.contact$.set(ContactUtils.getEmpty()); 
  }

  async ngOnInit(): Promise<void> {
     await this.contactService.getAll();
  }
}
