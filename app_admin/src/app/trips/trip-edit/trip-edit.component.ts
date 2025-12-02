import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Trip } from '../../models/trip';
import { TripDataService } from '../../services/trip-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trip-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css']
})
export class TripEditComponent implements OnInit {
  trip: Trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  isNew = true;
  statusMessage = '';

  constructor(
    private tripService: TripDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code && code !== 'new') {
      this.isNew = false;
      this.tripService.getTrip(code).subscribe({
        next: t => {
          const startVal = t.start
            ? new Date(t.start as any).toISOString().substring(0, 10)
            : '';
          this.trip = { ...t, start: startVal };
        },
        error: err => console.error('Error loading trip', err)
      });
    }
  }

  onSubmit(): void {
    if (this.isNew) {
      this.tripService.addTrip(this.trip).subscribe({
        next: () => {
          this.statusMessage = 'Trip added successfully';
          this.router.navigate(['/trips']);
        },
        error: err => {
          console.error('Add failed', err);
          this.statusMessage = 'Error adding trip';
        }
      });
    } else {
      this.tripService.updateTrip(this.trip.code, this.trip).subscribe({
        next: () => {
          this.statusMessage = 'Trip updated successfully';
          this.router.navigate(['/trips']);
        },
        error: err => {
          console.error('Update failed', err);
          this.statusMessage = 'Error updating trip';
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/trips']);
  }
}
