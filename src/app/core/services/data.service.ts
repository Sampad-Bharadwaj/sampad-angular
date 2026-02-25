import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Patient = {
  id: number;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  lastVisit: string;
  risk: 'Normal' | 'Monitor' | 'Critical';
};

export type Vital = {
  date: string;
  bpSys: number;
  bpDia: number;
  spo2: number;
  pulse: number;
  sugar: number;
};

export type Alert = {
  id: number;
  patientId: number;
  patientName: string;
  type: 'High BP' | 'Low SpO2' | 'High Sugar' | 'High Pulse';
  severity: 'Critical' | 'Monitor';
  status: 'Open' | 'Resolved';
  createdAt: string;
};

@Injectable({ providedIn: 'root' })
export class DataService {
  // -------- Patients (static for now)
  private _patients: Patient[] = [
    { id: 1, name: 'Rohit Das', age: 42, gender: 'Male', lastVisit: '2026-02-24', risk: 'Monitor' },
    { id: 2, name: 'Ananya Sen', age: 29, gender: 'Female', lastVisit: '2026-02-23', risk: 'Critical' },
    { id: 3, name: 'Suresh Kumar', age: 55, gender: 'Male', lastVisit: '2026-02-20', risk: 'Normal' },
    { id: 4, name: 'Priya Sharma', age: 38, gender: 'Female', lastVisit: '2026-02-18', risk: 'Monitor' },
  ];

  // -------- Vitals (by patientId)
  private _vitalsByPatientId: Record<number, Vital[]> = {
    1: [
      { date: '02-18', bpSys: 128, bpDia: 84, spo2: 98, pulse: 78, sugar: 135 },
      { date: '02-19', bpSys: 132, bpDia: 86, spo2: 97, pulse: 82, sugar: 145 },
      { date: '02-20', bpSys: 138, bpDia: 89, spo2: 98, pulse: 80, sugar: 150 },
      { date: '02-21', bpSys: 134, bpDia: 87, spo2: 97, pulse: 79, sugar: 142 },
      { date: '02-22', bpSys: 136, bpDia: 88, spo2: 98, pulse: 81, sugar: 148 },
      { date: '02-23', bpSys: 140, bpDia: 90, spo2: 97, pulse: 83, sugar: 155 },
    ],
    2: [
      { date: '02-18', bpSys: 132, bpDia: 86, spo2: 98, pulse: 82, sugar: 140 },
      { date: '02-19', bpSys: 138, bpDia: 90, spo2: 97, pulse: 85, sugar: 155 },
      { date: '02-20', bpSys: 145, bpDia: 94, spo2: 96, pulse: 88, sugar: 168 },
      { date: '02-21', bpSys: 141, bpDia: 92, spo2: 97, pulse: 84, sugar: 160 },
      { date: '02-22', bpSys: 136, bpDia: 89, spo2: 98, pulse: 80, sugar: 148 },
      { date: '02-23', bpSys: 150, bpDia: 96, spo2: 95, pulse: 90, sugar: 175 },
    ],
    3: [
      { date: '02-18', bpSys: 120, bpDia: 78, spo2: 98, pulse: 76, sugar: 128 },
      { date: '02-19', bpSys: 122, bpDia: 80, spo2: 99, pulse: 74, sugar: 130 },
      { date: '02-20', bpSys: 124, bpDia: 81, spo2: 98, pulse: 75, sugar: 132 },
      { date: '02-21', bpSys: 121, bpDia: 79, spo2: 99, pulse: 73, sugar: 129 },
      { date: '02-22', bpSys: 123, bpDia: 80, spo2: 98, pulse: 74, sugar: 131 },
      { date: '02-23', bpSys: 125, bpDia: 82, spo2: 98, pulse: 76, sugar: 133 },
    ],
    4: [
      { date: '02-18', bpSys: 130, bpDia: 85, spo2: 96, pulse: 82, sugar: 140 },
      { date: '02-19', bpSys: 134, bpDia: 88, spo2: 95, pulse: 84, sugar: 150 },
      { date: '02-20', bpSys: 136, bpDia: 89, spo2: 96, pulse: 83, sugar: 152 },
      { date: '02-21', bpSys: 132, bpDia: 87, spo2: 97, pulse: 81, sugar: 148 },
      { date: '02-22', bpSys: 135, bpDia: 88, spo2: 96, pulse: 82, sugar: 151 },
      { date: '02-23', bpSys: 137, bpDia: 90, spo2: 95, pulse: 85, sugar: 156 },
    ],
  };

  // -------- Alerts (reactive)
  private alertsSubject = new BehaviorSubject<Alert[]>([
    { id: 101, patientId: 2, patientName: 'Ananya Sen', type: 'High BP', severity: 'Critical', status: 'Open', createdAt: '2026-02-25' },
    { id: 102, patientId: 1, patientName: 'Rohit Das', type: 'High Sugar', severity: 'Monitor', status: 'Open', createdAt: '2026-02-24' },
    { id: 103, patientId: 4, patientName: 'Priya Sharma', type: 'Low SpO2', severity: 'Critical', status: 'Resolved', createdAt: '2026-02-23' },
  ]);

  alerts$ = this.alertsSubject.asObservable();

  // ---------- Getters
  getPatients(): Patient[] {
    return this._patients;
  }

  getPatientById(id: number): Patient | undefined {
    return this._patients.find(p => p.id === id);
  }

  getVitalsByPatientId(id: number): Vital[] {
    return this._vitalsByPatientId[id] ?? [];
  }

  // ---------- KPIs
  getOpenAlertsCount(): number {
    return this.alertsSubject.value.filter(a => a.status === 'Open').length;
  }

  getCriticalOpenAlertsCount(): number {
    return this.alertsSubject.value.filter(a => a.status === 'Open' && a.severity === 'Critical').length;
  }

  // ---------- Actions
  resolveAlert(alertId: number) {
  const updated: Alert[] = this.alertsSubject.value.map((a): Alert =>
    a.id === alertId ? { ...a, status: 'Resolved' } : a
  );

  this.alertsSubject.next(updated);
}
}