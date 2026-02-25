import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';

import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  openAlerts$ = this.data.alerts$.pipe(
    map(list => list.filter(a => a.status === 'Open').length)
  );

  constructor(private data: DataService) {}
}