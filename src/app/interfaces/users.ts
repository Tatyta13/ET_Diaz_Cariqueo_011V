export interface Users{
  id:number;
  username:string;
  email:string;
  password:string;
  isactive: boolean;
}

export interface UserNuevo{
  username:string;
  email:string;
  password:string;
  isactive: boolean;
}

//post
export interface MisQr{
  nombre: string;
  tipomascot: string;
  username: string;
}

export interface QrAll{
  id:string;
  nombre:string;
  tipomascot:string;
  username:string;
}
