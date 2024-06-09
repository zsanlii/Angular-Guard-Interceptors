import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ProductListItem } from '../models/product-list-item';
import { ProductDetails } from '../models/product-details';
import { environment } from '../../../../environments/environment';
import { PaginatedList } from '../../../core/models/paginated-list';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly apiControllerUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getList(
    pageIndex: number,
    pageSize: number,
    filterByCategoryId: number | null
  ): Observable<PaginatedList<ProductListItem>> {
    let queryParams: any = {};
    if (filterByCategoryId) {
      queryParams.categoryId = filterByCategoryId.toString();
    }

    return this.http
      .get<ProductListItem[]>(this.apiControllerUrl, {
        params: queryParams,
      })
      .pipe(
        // pipe: Bir veya daha fazla operatörü birbirine bağlar. Böylece Observable yapıların davranışını değiştirilebilir. https://rxjs.dev/api/operators/
        // map: Bir veri akıştan başka bir veri akışa dönüşüm yapar. https://rxjs.dev/api/operators/map

        //! Aşağıdaki işlemleri geçici olarak FE tarafında gerçeleştirdik. Daha sonra BE tarafında, veri tabanı üzerinden gerçekleştirilmesi gerekmektedir.

        // Pagination
        map((response) => {
          const paginatedList: PaginatedList<ProductListItem> = {
            items: response.slice(
              pageIndex * pageSize,
              pageIndex * pageSize + pageSize
            ),
            pageIndex,
            pageSize,
            totalCount: response.length,
          };
          return paginatedList;
        }),

        // Image Url
        map((data) => {
          for (const product of data.items) {
            product.imageUrl = 'https://via.placeholder.com/500';
          }
          return data;
        })
      );

    // const subject = new Subject<ProductListItem[]>();
    // // Subject: Veri akışını olduğunda, hata olduğunda ve tamamlandığında gözlemleyenlere haber veren bir yapıdır.
    // // BehaviorSubject: Subject'in bir türüdür. Ancak, bir BehaviorSubject, abone olmadan önceki en son değeri saklar ve yeni abonelere bu değeri hemen gönderir.

    // this.http.get<ProductListItem[]>(this.apiControllerUrl).subscribe({
    //   next: (response) => {
    //     for (const product of response) {
    //       product.imageUrl = 'https://via.placeholder.com/500';
    //     }
    //     console.log('ProductService:', response);

    //     subject.next(response);
    //   },
    //   error: (error) => {
    //     subject.error(error);
    //   },
    //   complete: () => {
    //     subject.complete();
    //   },
    // });

    // return subject.asObservable();
  }

  getById(id: number): Observable<ProductDetails> {
    return this.http.get<ProductDetails>(`${this.apiControllerUrl}/${id}`).pipe(
      map((data) => {
        data.imageUrl = 'https://via.placeholder.com/500';
        return data;
      })
    );
  }
}
