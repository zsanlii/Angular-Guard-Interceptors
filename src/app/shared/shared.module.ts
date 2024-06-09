import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicLayoutComponent } from './components/basic-layout/basic-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, BasicLayoutComponent],  // Bir component (template tarafında kullanılan Angular bileşenleri) standolone değilse declarations kısmında tanımlanmalıdır.
  // declarations kısmında eklenen componentler, aynı yerde tanımlandıkları için, birbirlerini kullanabilirler.

  imports: [CommonModule, RouterModule], // imports kısmında modül tanımlamaları yapılır.

  exports: [BasicLayoutComponent] // declarations kısmında tanımlaan bileşenler başka bir modülde veya bir standolone componentte kullanacak isek, exports kısmına eklemek gerekiyor.
})
export class SharedModule {}
// SharedModule'ı diğer modüllerde veya standolone componentlerde kullanabilmek için, imports kısmına eklemek gerekiyor.
// Böylece exports kısmında tanımlanan componentler, diğer modüllerde veya standolone componentlerde kullanılabilir hale gelir.
// Aynı zamanda imports kısmında tanımlanan modüller, SharedModule içerisindeki componentlerde kullanılabilir hale gelir. Hem de SharedModule'ı kullanan modüller veya standalones componentler de kullanabiliyor.
