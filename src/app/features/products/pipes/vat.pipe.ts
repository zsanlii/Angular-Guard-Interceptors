import { Pipe, type PipeTransform } from '@angular/core';

// Pipe: Bir değeri template tarafında göstermeden önce değiştirmek için kullanılır.
@Pipe({
  name: 'appVat',
  standalone: true,
})
export class VatPipe implements PipeTransform {
  // constructor(private vatService:VatService) {}

  transform(value: number, taxRate: number = 0.19): number {
    const newValue = value + value * taxRate; // KDV oranı %19 olarak ilgili değere eklenir.
    return newValue; // Yeni değer döndürülür.
  }
}
