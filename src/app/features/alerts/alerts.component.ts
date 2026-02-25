import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { DataService, Alert } from '../../core/services/data.service';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent {
  // ✅ Alerts now come from DataService (reactive)
  alerts$: Observable<Alert[]> = this.data.alerts$;

  constructor(private data: DataService) {}

  badgeClass(sev: Alert['severity']) {
    return sev === 'Critical' ? 'badge critical' : 'badge monitor';
  }

  statusClass(status: Alert['status']) {
    return status === 'Resolved' ? 'status resolved' : 'status open';
  }

  // ✅ Resolve by ID (updates BehaviorSubject)
  resolve(alertId: number) {
    this.data.resolveAlert(alertId);
  }
}