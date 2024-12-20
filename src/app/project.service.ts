import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/server';

  constructor(private http: HttpClient) {}

  saveProject(project: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/projects`, project);
  }

  saveImage(projectName: string, image: string): Observable<any> {
    const imageData = { projectName, image };
    return this.http.post(`${this.apiUrl}/images`, imageData);
  }

  getImagesForProject(projectName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/images/${projectName}`);
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects`);
  }
}
