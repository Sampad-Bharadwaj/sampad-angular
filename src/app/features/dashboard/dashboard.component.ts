import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type Risk = 'Critical' | 'Monitor' | 'Normal';
type Tone = 'blue' | 'red' | 'green' | 'amber' | 'slate';
type ActivityTone = 'ok' | 'warn' | 'info';

interface KPI {
  title: string;
  value: number | string;
  sub: string;
  tone: Tone;
  icon: string;
}

interface ActivityItem {
  text: string;
  time: string;
  tone: ActivityTone;
  meta?: string;
}

interface PatientMini {
  id: number;
  name: string;
  code: string;
  age: number;
  gender: 'Male' | 'Female';
  lastVisit: string;
  risk: Risk;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  today = new Date();

  // ✅ Later you will replace these with API values
  kpis: KPI[] = [
    { title: 'Total Patients', value: 128, sub: '+12 this month', tone: 'blue', icon: '👥' },
    { title: 'Critical Alerts', value: 5, sub: '2 new today', tone: 'red', icon: '🚨' },
    { title: "Today's Visits", value: 23, sub: 'OPD + IPD', tone: 'green', icon: '🏥' },
    { title: 'Monitor Patients', value: 17, sub: 'Need follow-up', tone: 'amber', icon: '🩺' },
  ];

  todayStats = {
    opd: 18,
    ipd: 5,
    reportsUploaded: 9,
    resolvedAlerts: 3,
  };

  activities: ActivityItem[] = [
    { text: 'Patient Rohit Das checked in', time: '10:15 AM', tone: 'ok', meta: 'OPD' },
    { text: 'BP Alert triggered for Ananya Sen', time: '11:02 AM', tone: 'warn', meta: 'BP High' },
    { text: 'Report uploaded for Suresh Kumar', time: '12:10 PM', tone: 'info', meta: 'Lab Report' },
    { text: 'SpO₂ drop flagged for Priya Sharma', time: '01:05 PM', tone: 'warn', meta: 'SpO₂ Low' },
  ];

  criticalPatients: PatientMini[] = [
    { id: 2, name: 'Ananya Sen', code: 'MP-2', age: 29, gender: 'Female', lastVisit: '2026-02-23', risk: 'Critical' },
    { id: 7, name: 'Rahul Mishra', code: 'MP-7', age: 61, gender: 'Male', lastVisit: '2026-02-24', risk: 'Critical' },
  ];

  riskCounts = {
    critical: 5,
    monitor: 17,
    normal: 106,
  };

  trackByIndex = (i: number) => i;

  getRiskClass(risk: Risk) {
    return risk.toLowerCase(); // "critical" | "monitor" | "normal"
  }
}