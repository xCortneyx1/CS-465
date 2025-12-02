import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private baseUrl = `${environment.apiBaseUrl}/trips`;

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.baseUrl);
  }

  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/${code}`);
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.baseUrl, trip);
  }

  updateTrip(code: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.baseUrl}/${code}`, trip);
  }

  deleteTrip(code: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${code}`);
  }
}
