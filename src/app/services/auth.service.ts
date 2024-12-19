import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MisQr, QrAll, UserNuevo, Users } from '../interfaces/users';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/usarios';

  constructor(private httpclient: HttpClient) { }

  GetAllUsers():Observable<Users[]>{
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usarios`);

  }
  GetUserByUsername(usuario:any):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usarios/?username=${usuario}`);
  }
  IsLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }

  PostUsuario(newUsuario:UserNuevo): Observable<UserNuevo>{
    return this.httpclient.post<Users>(`${environment.apiUrl}/usarios`,newUsuario);
  }

  PostQr(newQr: MisQr):Observable<MisQr>{
    return this.httpclient.post<QrAll>(`${environment.apiUrl}/qr`,newQr);
  }

  GetUsuarioId(id:number):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usarios/?id=${id}`);
  }

  getUserById(id: string): Observable<Users> {
    return this.httpclient.get<Users>(`${environment.apiUrl}/usarios?id=${id}`);

  }

  updateUser(id: string, userData: any): Observable<any> {
    return this.httpclient.put<Users>(`${environment.apiUrl}/usarios?id${id}`, userData);
  }

  login(email: string, password: string): Observable<any> {
    return this.httpclient.get<any[]>(`${this.apiUrl}/usarios`).pipe(
      map((usarios: any[]) => {
        return usarios.find(
          (user) => user.email === email && user.password === password
        );
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('id');
  }

  logout(): void {
    localStorage.removeItem('id');
  }
  
}
