import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIfNot]',
  standalone: true,
})
export class IfNotDirective {
  // Structural directives
  private _hasView = false;
  @Input() set appIfNot(newValue: boolean) { // appIfNot directive'e geçilen değer her set edildiğinde çalışacak
    if (!newValue === this._hasView) return;

    if (newValue === false) this.createElement();
    else this.clearElement();
  }

  constructor(
    private viewContainer: ViewContainerRef, // İlgili elementin renderlanıp renderlanmayacağını veya nasıl bir render sürecinin olacağını kontrol etmeye başlıyoruz
    private templateRef: TemplateRef<any> // Directive'i uyguladığımı elementi temsil eden bir referans
  ) {}

  createElement() {
    this.viewContainer.createEmbeddedView(this.templateRef); // TemplateRef'i kullanarak ilgili elementi renderlıyoruz

    this._hasView = true;
  }

  clearElement() {
    this.viewContainer.clear();

    this._hasView = false;
  }
}
