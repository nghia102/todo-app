import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}
  async fetchData(): Promise<any> {
    try {
      const response = await this.http.get<any>(`${this.apiUrl}/getAlldata`).toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  }

  async signUp(body:any): Promise<any> {
    try {
      const response = await this.http.post<any>(`${this.apiUrl}/postData`,body).toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  }

  async getUser(body:any){
    try {
      console.log(body)
      const response = await this.http.post<any>(`${this.apiUrl}/getUser`,body).toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  }

  async saveData(body:any){
    try {
      console.log(body)
      const response = await this.http.post<any>(`${this.apiUrl}/findOneAndUpdate`,body).toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  }
  
}