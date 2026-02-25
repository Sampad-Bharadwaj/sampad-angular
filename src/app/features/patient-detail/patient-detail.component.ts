import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';

type Patient = {
  id: number;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  lastVisit: string;
  risk: 'Normal' | 'Monitor' | 'Critical';
};

type Vital = {
  date: string;
  bpSys: number;
  bpDia: number;
  spo2: number;
  pulse: number;
  sugar: number;
};

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss'],
})
export class PatientDetailComponent implements AfterViewInit, OnDestroy {
  @ViewChild('bpCanvas') bpCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('spo2Canvas') spo2Canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('sugarCanvas') sugarCanvas!: ElementRef<HTMLCanvasElement>;

  private charts: Chart[] = [];

  patientId = 0;
  patient?: Patient;

  patients: Patient[] = [
    { id: 1, name: 'Rohit Das', age: 42, gender: 'Male', lastVisit: '2026-02-24', risk: 'Monitor' },
    { id: 2, name: 'Ananya Sen', age: 29, gender: 'Female', lastVisit: '2026-02-23', risk: 'Critical' },
    { id: 3, name: 'Suresh Kumar', age: 55, gender: 'Male', lastVisit: '2026-02-20', risk: 'Normal' },
    { id: 4, name: 'Priya Sharma', age: 38, gender: 'Female', lastVisit: '2026-02-18', risk: 'Monitor' },
  ];

  vitals: Vital[] = [
    { date: '02-18', bpSys: 132, bpDia: 86, spo2: 98, pulse: 82, sugar: 140 },
    { date: '02-19', bpSys: 138, bpDia: 90, spo2: 97, pulse: 85, sugar: 155 },
    { date: '02-20', bpSys: 145, bpDia: 94, spo2: 96, pulse: 88, sugar: 168 },
    { date: '02-21', bpSys: 141, bpDia: 92, spo2: 97, pulse: 84, sugar: 160 },
    { date: '02-22', bpSys: 136, bpDia: 89, spo2: 98, pulse: 80, sugar: 148 },
    { date: '02-23', bpSys: 150, bpDia: 96, spo2: 95, pulse: 90, sugar: 175 },
  ];

  constructor(private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.patientId = id;
    this.patient = this.patients.find((p) => p.id === id);
  }

  ngAfterViewInit(): void {
    if (!this.patient) return;

    const labels = this.vitals.map(v => v.date);

    this.createLineChart(this.bpCanvas, labels, [
      { label: 'BP Systolic', data: this.vitals.map(v => v.bpSys) },
      { label: 'BP Diastolic', data: this.vitals.map(v => v.bpDia) },
    ]);

    this.createLineChart(this.spo2Canvas, labels, [
      { label: 'SpO2', data: this.vitals.map(v => v.spo2) },
      { label: 'Pulse', data: this.vitals.map(v => v.pulse) },
    ]);

    this.createLineChart(this.sugarCanvas, labels, [
      { label: 'Blood Sugar', data: this.vitals.map(v => v.sugar) },
    ]);
  }

  private createLineChart(
    canvasRef: ElementRef<HTMLCanvasElement>,
    labels: string[],
    datasets: { label: string; data: number[] }[]
  ) {
    const ctx = canvasRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true } },
      },
    });

    this.charts.push(chart);
  }

  badgeClass(risk?: Patient['risk']) {
    if (risk === 'Critical') return 'badge critical';
    if (risk === 'Monitor') return 'badge monitor';
    return 'badge normal';
  }

  ngOnDestroy(): void {
    this.charts.forEach((c) => c.destroy());
    this.charts = [];
  }
}