
export class Pasajero {
    public id: number = 0;
    public nombre: string = '';
    public apellido: string = '';
    public tipo_documento_id = {
        id : null,
        descripcion : '',
    };
    public numeroDocumento: string = '';
    public email: string = '';
    public estado: boolean = true;
}