import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './features/auth/services/auth.service';

// Components: Angular tarafında görünüm ve işlev bakımından birer küçük parçacıklardır.
@Component({
  selector: 'app-root', // <app-root></app-root>

  /* Angular tamamen modüler bir yapıya sahip.
     Angular 17 ve öncesinde varsayılan olarak component'ler modüllere bağlı olarak geliyordu.
     Dolayısıyla modülün import edip sağladığı işlevleri sadece kullanabiliyorlardu. */
  // standalone: Angular 17 ve sonrası için varsayılan hale geldi.
  // Her component'in kendi import'ı olabilir.
  // Böylece her component kendi başına Angulara dahil olabilir.
  standalone: true,
  imports: [RouterModule],
  // Import'larda bu componentte kullanmak adına Angular modüllerini sağlamış oluyoruz.

  templateUrl: './app.component.html', // HTML dosyası yolunu
  styleUrl: './app.component.scss', // Stil dosya yolunu
})
export class AppComponent implements OnInit {
  constructor(private authService:AuthService) {}

  ngOnInit(): void {
    this.authService.test().subscribe((response) => {
      console.log(response);
    });

    this.authService.testAdmin().subscribe((response) => {
      console.log(response);
    });
  }
}
