import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  // standalone: true,
  // imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  isLogged: boolean = false;
  displayUserName: string | null = null;

  constructor(
    private authService: AuthService,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.authService.isLogged.subscribe(this.setLoggedState.bind(this));
    // bind: subscribe içerisinde çalıştılacak olan setLoggedState fonksiyonunun this bağlamını NavbarComponent nesne referasına bağlar. Böylece setLoggedState fonksiyonu içerisinde this anahtar kelimesi NavbarComponent nesne referasını işaret eder.

    this.authService.isLogged.subscribe((isLogged) =>
      this.setLoggedState(isLogged)
    );
    // Arrow function kullanısak, Arrow functionlar kendi this bağlamını oluşturdukları için bind metodu kullanmamıza gerek kalmazdı. Arrow functionlar, tanımlandıkları yerdeki this bağlamını korur.

    // if (this.authService.isAuthenticated) {
    //   console.log('isAuthenticated if block');
    //   this.setLoggedState(true);
    //   return;
    // }

    // this.authService.logged.subscribe(() => {
    //   console.log('logged subscribe block');
    //   this.setLoggedState(true);
    // });

    // this.authService.loggedOut.subscribe(() => {
    //   console.log('loggedOut subscribe block');
    //   this.setLoggedState(false);
    // });
  }

  private setLoggedState(isLogged: boolean): void {
    this.isLogged = isLogged;
    this.displayUserName = this.authService.tokenPayload?.userName ?? null;
    this.change.markForCheck();
  }
}
