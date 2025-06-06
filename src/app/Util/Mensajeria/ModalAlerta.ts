import Swal from "sweetalert2";

export function MODAL_ALERTA( mensaje: string, severity: any, titulo: string ): void {

    Swal.fire
    ({
        title:  titulo,
        text:   mensaje,
        icon:   severity,
        showConfirmButton: false,
        showCloseButton: true ,
        customClass:
        {
          container: 'modal-container'
        }
    } );
}