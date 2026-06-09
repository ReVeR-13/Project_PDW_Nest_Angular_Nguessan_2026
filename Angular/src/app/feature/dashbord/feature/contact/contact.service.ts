import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { ApiResponseModel, ApiService, AppRoute } from "../../../../core";
import { tap } from "rxjs";
import { IContact } from "./component";
import { ContactUtils } from "./utils";
import { ContactDto } from "./dto";


@Injectable({
    providedIn: 'root'
})
export class ContactService {

    private readonly apiService: ApiService = inject(ApiService);
    public t_contact$: WritableSignal<IContact[]> = signal([]);
    private db_statut$: WritableSignal<boolean> = signal(false);
    public contact$: WritableSignal<IContact> = signal(ContactUtils.getEmpty())

    async getAll() {

        if (!this.db_statut$()) {

            const data = (this.apiService.get(AppRoute.Contact)).pipe(
                tap((response: ApiResponseModel) => {
                    if (response.result) {
                        this.t_contact$.set(
                            (response.data)
                        );
                        console.table(this.t_contact$());

                        this.db_statut$.set(true);
                        setTimeout(() => {
                            this.db_statut$.set(false);
                        }, 15000)
                    }
                }
                )).subscribe()

        }

    }

    async getOne(id: string) {

        const data = ((this.apiService.get(`${AppRoute.Contact}/${id}`))).pipe(
            tap((response: ApiResponseModel) => {
                if (response.result) {

                    this.contact$.set(ContactUtils.fromDto(response.data as ContactDto));
                    console.table(response);
                }
            }
            )).subscribe()

    }

    async create(payload: IContact) {

        return (await this.apiService.post(AppRoute.Contact, payload)).pipe(
            tap((response: ApiResponseModel) => {
                if (response.result) {
                    this.setContact(response.data)
                }
            }
            ));
    }

    async update(id: string, payload: IContact) {

        return (this.apiService.patch(`${AppRoute.Contact}/${id}`, payload)).pipe(
            tap((response: ApiResponseModel) => {
                if (response.result) {
                    this.setContact(response.data)
                }
            }
            ));

    }

    async delete(id:string){
        return (this.apiService.delete(`${AppRoute.Contact}/${id}`)).pipe(
            tap((response: ApiResponseModel) => {
                if (response.result) {
                    this.setContact(ContactUtils.getEmpty())
                }
            }
            ));
    }

    setContact(contact:IContact){
        this.contact$.set(ContactUtils.fromDto(contact))
    }
}