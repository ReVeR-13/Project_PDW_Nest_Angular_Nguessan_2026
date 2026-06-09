import { effect, Injectable, signal, WritableSignal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HorlogeService{
    public time$: WritableSignal<string> = signal('');

    constructor(){
        effect(()=> this.ngOnInit());
    }

    ngOnInit(): void {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    updateClock(): void {
        const now: Date = new Date();
        this.time$.set(now.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }));
    }
}