import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/layout/shell/shell.component').then(m => m.ShellComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'patients',
        loadComponent: () =>
          import('./features/patients/patients.component').then(m => m.PatientsComponent),
      },
      {
        path: 'alerts',
        loadComponent: () =>
          import('./features/alerts/alerts.component').then(m => m.AlertsComponent),
      },
      {
        path: 'patients/:id',
        loadComponent: () =>
          import('./features/patient-detail/patient-detail.component').then(
           m => m.PatientDetailComponent
        ),
      },
      {
        path: 'patients/:id',
        loadComponent: () =>
         import('./features/patient-detail/patient-detail.component').then(m => m.PatientDetailComponent),
        },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];