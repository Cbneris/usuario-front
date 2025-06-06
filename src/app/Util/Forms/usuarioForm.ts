import { Validators } from "@angular/forms";

export const USUARIO_FORM = {
    login:      ['', Validators.required],
    password:   ['', Validators.required],
    nombre:     ['', Validators.required],
    cliente:    ['', Validators.required],
    email:      ['', [Validators.required, Validators.email]],
    intentos:   ['', Validators.required],
    fechaRevocado: [''],
    fechaVigencia: [''],
    noAcceso:   [''],
    apellidoPaterno: ['', Validators.required],
    apellidoMaterno: ['', Validators.required],
    area:       [''],
    fechaModificacion: ['']
}