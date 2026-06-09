import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { AuthRouteur } from '../../routeur';
import { SignUpPayload } from '../../data';
import { tap } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { ErrorMessage } from '../../../../data';
import { ApiResponseModel } from '../../../api';

@Component({
  selector: 'app-sign-up-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  standalone: true,
  templateUrl: './sign-up-page.html',
  styleUrls: ['../../routeur/auth-routeur.scss', './sign-up-page.scss']
})
export class SignUpPage {

  protected erreur: string = "";

  private readonly formsBuilder: FormBuilder = inject(FormBuilder);
  protected readonly errorMsg: typeof ErrorMessage = ErrorMessage;

  protected authService: AuthService = inject(AuthService);
  protected authComponent: AuthRouteur = inject(AuthRouteur);

  protected payload: SignUpPayload = {
    username: 'rolly',
    email: 'rolly@hotmail.be',
    password: 'apollo12',
    description: '--',
    condition: true
  }

  protected isSumit$:WritableSignal<boolean> = signal(false);

  protected readonly signUpForm = this.formsBuilder.group({
    username: [this.payload.username,
    [
      Validators.required,
      Validators.minLength(2),
    ]
    ],

    email: [this.payload.email,
    [
      Validators.required,
      Validators.email,
    ]
    ],

    password: [this.payload.password,
    [
      Validators.required,
      Validators.minLength(5)
    ]
    ],
    description: [this.payload.description],
    condition: [this.payload.condition,
    [
      Validators.required,
    ]
    ]
  });

  protected get _username() {
    return this.signUpForm.controls.username
  }

  protected get _email() {
    return this.signUpForm.controls.email
  }

  protected get _password() {
    return this.signUpForm.controls.password
  }

  protected get _condition() {
    return this.signUpForm.controls.condition
  }



  public async signUp(): Promise<void> {

    if (this.signUpForm.invalid) {

      this.signUpForm.markAllAsTouched();
      this.erreur = "Erreur: entree invalide"
      return;

    }
    
    this.isSumit$.set(true);

    const data = (await this.authService.signUp(this.signUpForm.value as SignUpPayload))
      .pipe(
        tap((data: ApiResponseModel) => {
          this.authService.setApiResponse(data);

          console.log('info', data);
          setTimeout(() => {
            this.isSumit$.set(false);
          }, 3000);

        })
      )
      .subscribe({
        next: res => console.log(res),
        error: err => {
          this.erreur = err.error.code;
          console.log(err.error.code)
        }
      });

  }

  toSignIn() {
    this.authComponent.toSignin();
  }
}
