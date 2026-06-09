import { JsonPipe } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignInPayload } from '../../data';
import { ApiCodeResponse, ApiResponseModel, ErrorMessage } from '../../../../../core';
import { AuthService } from '../../service/auth.service';
import { tap } from 'rxjs';
import { AuthRouteur } from '../../routeur';
import { Credential, SecuriteService } from '../../securite';

@Component({
  selector: 'app-sign-in-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  templateUrl: './sign-in-page.html',
  styleUrls: ['../../routeur/auth-routeur.scss', './sign-in-page.scss'],
})
export class SignInPage {

  protected erreur$: WritableSignal<ApiCodeResponse | string> = signal('');
  credential: Credential | null = null;

  private readonly formsBuilder: FormBuilder = inject(FormBuilder);
  protected readonly errorMsg: typeof ErrorMessage = ErrorMessage;

  protected authService: AuthService = inject(AuthService);
  protected authComponent: AuthRouteur = inject(AuthRouteur);

  protected payload: SignInPayload = {
    email: 'rolly@hotmail.be',
    password: 'apollo12'
  }

  protected isSumit$: WritableSignal<boolean> = signal(false);


  protected readonly signInForm = this.formsBuilder.group({
    email: [this.payload.email,
    [
      Validators.required,
      Validators.email,
    ]
    ],

    password: [this.payload.password,
    [
      Validators.required,
      Validators.minLength(8)
    ]
    ]
  });

  protected get email() {
    return this.signInForm.controls.email
  }

  protected get password() {
    return this.signInForm.controls.password
  }

  public async signIn(): Promise<void> {

    if (this.isSumit$()) {
      return
    }

    if (this.signInForm.invalid) {

      this.signInForm.markAllAsTouched();
      this.erreur$.set(ApiCodeResponse.NotFound)
      this.isSumit$.set(false);
      return;

    }

    this.isSumit$.set(true);

    (await this.authService.signIn(this.signInForm.value as SignInPayload))
      .pipe(
        tap((data: ApiResponseModel) => {

          this.authService.setApiResponse(data);

          setTimeout(() => {
            this.isSumit$.set(false);
          }, 3000);

        }),
      )
      .subscribe({
        next: res => {
          console.log(res)
        },
        error: err => {
          this.erreur$.set(err.error.code);
          console.log(err.error.code)
        }
      });


  }

}
