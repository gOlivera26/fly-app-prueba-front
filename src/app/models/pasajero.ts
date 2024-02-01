
export class Pasajero {
    public id: number = 0;
    public nombre: string = '';
    public apellido: string = '';
    public tipoDocumento: tipoDocumento = new tipoDocumento();
    public numeroDocumento: string = '';
    public email: string = '';
    public estado: boolean = true;
   
}

export class tipoDocumento {
    public id: number = 0;
    public descripcion: string = '';
}	