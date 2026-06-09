import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ApiCodeResponse, ApiResponseModel, ErrorMessage } from '../../../../../../../core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../../contact.service';
import { IContact } from '../contact-detail.model';
import { tap } from 'rxjs';
import { ContactUtils } from '../../../utils';


@Component({
	selector: 'app-contact-detail',
	imports: [ReactiveFormsModule, FormsModule],
	standalone: true,
	templateUrl: './detail.html',
	styleUrl: './detail.scss',
})
export class ContactDetail {


	protected erreur$: WritableSignal<ApiCodeResponse | string> = signal('');

	private readonly formsBuilder: FormBuilder = inject(FormBuilder);
	protected readonly errorMsg: typeof ErrorMessage = ErrorMessage;

	protected contactService: ContactService = inject(ContactService);

	protected payload$: WritableSignal<Partial<IContact>> = signal({
		nom: this.contactService.contact$().nom,
		prenom: this.contactService.contact$().prenom,
		id: this.contactService.contact$().id,
		dateCreation: this.contactService.contact$().dateCreation,

		niss: this.contactService.contact$().niss,
		dateNaissance: this.contactService.contact$().dateNaissance,

		gsm: this.contactService.contact$().gsm,
		telephone: this.contactService.contact$().telephone,
		mail: this.contactService.contact$().mail,

		localite: this.contactService.contact$().localite,
		codePostale: this.contactService.contact$().codePostale,
		rue: this.contactService.contact$().rue,
		isEmpty: this.contactService.contact$().isEmpty
	});

	protected isSumit$: WritableSignal<boolean> = signal(false);
	protected creation$: WritableSignal<boolean> = signal(this.contactService.contact$().isEmpty);

	//----------------------------------------------------------------------

	protected readonly contactForm = this.formsBuilder.group({

		dateNaissance: [
			this.payload$().dateNaissance
		],

		nom: [
			this.payload$().nom,
			[Validators.required, Validators.minLength(3)]
		],

		prenom: [
			this.payload$().prenom
		],

		niss: [
			this.payload$().niss
		],

		gsm: [
			this.payload$().gsm,
			[Validators.required]
		],

		telephone: [
			this.payload$().telephone
		],

		mail: [
			this.payload$().mail,
			[Validators.required]
		],

		localite: [
			this.payload$().localite
		],

		codePostale: [
			this.payload$().codePostale
		],
		rue: [
			this.payload$().rue
		]

	});

	//----------------------------------------------------------------------

	protected get dateNaissance() {
		return this.contactForm.controls.dateNaissance
	}

	protected get nom() {
		return this.contactForm.controls.nom
	}

	protected get prenom() {
		return this.contactForm.controls.prenom
	}

	protected get niss() {
		return this.contactForm.controls.niss
	}

	protected get gsm() {
		return this.contactForm.controls.gsm
	}

	protected get telephone() {
		return this.contactForm.controls.telephone
	}

	protected get mail() {
		return this.contactForm.controls.mail
	}

	protected get localite() {
		return this.contactForm.controls.localite
	}

	protected get codePostale() {
		return this.contactForm.controls.codePostale
	}

	protected get rue() {
		return this.contactForm.controls.rue
	}

	//-------------------------------------------------
	protected async validation(id: string) {
		if (this.contactService.contact$().isEmpty) {
			console.log('[creer]', this.contactService.contact$().id);
			await this.create();
		} else {
			console.log('[update]', this.contactService.contact$().id);
			await this.update(id);
		}

	}

	private async create(): Promise<void> {

		if (this.isSumit$()) {
			return
		}

		if (this.contactForm.invalid) {
			this.contactForm.markAllAsTouched();
			this.erreur$.set(ApiCodeResponse.NotFound)
			this.isSumit$.set(false);
			return;

		}

		this.isSumit$.set(true);

		const data = (await this.contactService.create(this.contactForm.value as IContact))
			.pipe(
				tap((data: ApiResponseModel) => {
					if (data.result) {

						setTimeout(() => {
							this.isSumit$.set(false);
						}, 3000);

					}

				})
			)
			.subscribe({
				next: res => {
					console.log(res);
				},
				error: err => {
					this.erreur$.set(err.error.code);
					console.log(err.error.code);
				}
			});
	}

	private async update(id: string) {

		if (this.isSumit$()) {
			return
		}

		if (this.contactForm.invalid) {
			this.contactForm.markAllAsTouched();
			this.erreur$.set(ApiCodeResponse.NotFound)
			this.isSumit$.set(false);
			return;
		}

		this.isSumit$.set(true);

		const data = (await this.contactService.update(id, this.contactForm.value as IContact))
			.pipe(
				tap((data: ApiResponseModel) => {
					if (data.result) {
						console.log(data.data);

						setTimeout(() => {
							this.isSumit$.set(false);
						}, 3000);

					}

				})
			)
			.subscribe({
				next: res => {
					console.log(res);
				},
				error: err => {
					this.erreur$.set(err.error.code);
					console.log(err.error.code);
				}
			});
	}

	annuler() {

		if (!this.payload$().isEmpty) {

			console.log('[annuler]');

			this.viderPayload();
			this.creation$.set(false);

		}

	}

	async supprimer(id:string) {

		if (!this.payload$().isEmpty) {

			console.log('[supprimer]');

			if (this.isSumit$()) {
				return
			}

			this.isSumit$.set(true);

			const data = (await this.contactService.delete(id))
			.pipe(
				tap((data: ApiResponseModel) => {
					if (data.result) {
						console.log(data.data);

						setTimeout(() => {
							this.isSumit$.set(false);
							this.annuler();
						}, 3000);

					}

				})
			)
			.subscribe({
				next: res => {
					console.log(res);
				},
				error: err => {
					this.erreur$.set(err.error.code);
					console.log(err.error.code);
				}
			});

			

		}

	}

	private viderPayload() {

		this.contactService.contact$.set(ContactUtils.getEmpty());
		this.payload$.set(ContactUtils.getEmpty());
		this.contactForm.reset();
	}
}
