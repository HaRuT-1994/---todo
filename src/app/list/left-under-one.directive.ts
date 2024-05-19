import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLeftUnderOne]',
  standalone: true
})
export class LeftUnderOneDirective {
  @Input() appLeftUnderOne = ''; 

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    const todoHours = this.appLeftUnderOne.split(' ')[0].split('h')[0];

    if(todoHours == '0') {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'red')
    }
  }

}
