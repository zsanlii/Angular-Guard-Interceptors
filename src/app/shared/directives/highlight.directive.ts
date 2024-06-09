import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight = 'yellow'; // <div appHighlight="red"></div>
  @Input() hoverColor = 'lightblue'; // <div appHighlight hoverColor="lightblue"></div>

  constructor(private element: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    // this.element.nativeElement.innerText += ' (On Sale!)';
    this.element.nativeElement.style.backgroundColor = 'yellow';
    this.element.nativeElement.style.boxShadow = '0 0 5px rgba(0,0,0,0.5)';

    // setInterval(() => {
    //   this.element.nativeElement.style.backgroundColor = 'white';
    //   this.element.nativeElement.style.boxShadow = 'none';

    //   setTimeout(() => {
    //     this.element.nativeElement.style.backgroundColor = 'yellow';
    //     this.element.nativeElement.style.boxShadow = '0 0 5px rgba(0,0,0,0.5)';
    //   }, 2000);
    // }, 4000);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = this.hoverColor;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.element.nativeElement.style.backgroundColor = this.appHighlight;
  }
}
