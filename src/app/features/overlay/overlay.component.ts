import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../core/auth/services/loading.service';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayComponent implements OnDestroy {
  loading = false;
  private loadingSubscription: Subscription;

  constructor(private loadingService: LoadingService) {
    this.loadingSubscription = this.loadingService.loading$.subscribe(loading => {
      this.loading = loading;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
