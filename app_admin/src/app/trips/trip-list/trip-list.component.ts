import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Trip } from '../../models/trip';
import { TripDataService } from '../../services/trip-data.service';
import { TripCardComponent } from '../trip-card/trip-card.component';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  loading = false;
  error = '';

  constructor(
    private tripService: TripDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.loading = true;
    this.tripService.getTrips().subscribe({
      next: trips => {
        this.trips = trips;
        this.loading = false;
      },
      error: err => {
        this.error = 'Error loading trips';
        console.error(err);
        this.loading = false;
      }
    });
  }

  onAddTrip(): void {
    this.router.navigate(['/trips/new']);
  }

    onEditTrip(code: string): void {
    this.router.navigate(['/trips', code]);
  }

  onDeleteTrip(code: string): void {
    if (!confirm('Delete this trip?')) return;
    this.tripService.deleteTrip(code).subscribe({
      next: () => this.loadTrips(),
      error: err => console.error('Delete failed', err)
    });
  }

}
