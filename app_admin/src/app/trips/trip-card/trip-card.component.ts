import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() trip!: Trip;
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onEdit(): void {
    this.edit.emit(this.trip.code);
  }

  onDelete(): void {
    this.delete.emit(this.trip.code);
  }

  formatImageUrl(path: string): string {
    if (!path) return '';
    return path.startsWith('/images')
      ? 'http://localhost:3000' + path
      : path;
  }
}
