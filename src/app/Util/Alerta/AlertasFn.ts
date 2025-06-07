import Swal from "sweetalert2";

export function ALERTA_MENSAJE( mensaje: string, severity: any, titulo: string, closeButton: boolean, okbutton: boolean ): void {

    Swal.fire
    ({
        title: titulo,
        text: mensaje,
        icon: severity,
        showConfirmButton: okbutton,
        showCloseButton: closeButton ,
        customClass:
        {
          container: 'modal-container'
        }
    } );
}
