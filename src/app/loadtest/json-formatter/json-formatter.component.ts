import { Component, OnChanges, Input, ElementRef } from '@angular/core';
import JSONFormatter from 'json-formatter-js';

@Component({
    selector: 'app-formatter',
    template: '<div [innerHtml]="html"></div>',
})
export class FormatterComponent implements OnChanges {
    @Input() data: any;
    html: any;
    constructor(private element: ElementRef) { }

    ngOnChanges() {
        const formatter = new JSONFormatter(this.data);
        this.element.nativeElement.innerText = "";
        this.element.nativeElement.appendChild(formatter.render());
    }
}