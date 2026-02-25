import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

type Patient = {
  id: number;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  lastVisit: string;
  risk: 'Normal' | 'Monitor' | 'Critical';
};

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // ✅ FormsModule added
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent {
  search = '';

  patients: Patient[] = [
    { id: 1, name: 'Rohit Das', age: 42, gender: 'Male', lastVisit: '2026-02-24', risk: 'Monitor' },
    { id: 2, name: 'Ananya Sen', age: 29, gender: 'Female', lastVisit: '2026-02-23', risk: 'Critical' },
    { id: 3, name: 'Suresh Kumar', age: 55, gender: 'Male', lastVisit: '2026-02-20', risk: 'Normal' },
    { id: 4, name: 'Priya Sharma', age: 38, gender: 'Female', lastVisit: '2026-02-18', risk: 'Monitor' },
  ];

  get filteredPatients(): Patient[] {
    const q = this.search.trim().toLowerCase();

    const list = !q
      ? this.patients
      : this.patients.filter((p) =>
          `${p.name} ${p.gender} ${p.risk} ${p.lastVisit}`
            .toLowerCase()
            .includes(q)
        );

    // ✅ optional: keep list sorted by name
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }

  badgeClass(risk: Patient['risk']): string {
    if (risk === 'Critical') return 'badge critical';
    if (risk === 'Monitor') return 'badge monitor';
    return 'badge normal';
  }
}