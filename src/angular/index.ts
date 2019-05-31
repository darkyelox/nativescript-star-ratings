import { registerElement } from 'nativescript-angular/element-registry';
import { FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { NgModule, HostListener } from '@angular/core';
import { Directive, forwardRef, ElementRef, Inject, AfterViewInit } from '@angular/core';
import { BaseValueAccessor } from 'nativescript-angular/forms/value-accessors/base-value-accessor';
import { View } from 'tns-core-modules/ui/core/view';

registerElement('StarRating', () => require('../').StarRating);

const START_RATE_VALUE_ACCESSOR = {provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StarRateValueAccesor), multi: true};

export type StarRateView = {value: number} & View;

@Directive({ 
    selector: 'StarRating[ngModel], StarRating[formControlName]',
    providers: [START_RATE_VALUE_ACCESSOR]
})
export class StarRateValueAccesor extends BaseValueAccessor<StarRateView> implements AfterViewInit {
    private _normalizedValue: number = 0;
    private viewInitialized: boolean;

    constructor(@Inject(ElementRef) elementRef: ElementRef) { 
        super(elementRef.nativeElement)
    }

    public ngAfterViewInit() {
        this.viewInitialized = true
        this.view.value = this._normalizedValue;
        console.log('view initialized')
    }

    public writeValue(value: any): void {
        console.log('writeValue', value)
        if (value === undefined || value === null ||  value === "") {
            this._normalizedValue = 0
        }
        else {
            this._normalizedValue = value
        }
        
        if (this.viewInitialized) {
            this.view.value = this._normalizedValue
        }
    }

    @HostListener("valueChange", ["$event"])
    public valueChangeListener(event: any) {
        this.onChange(event.value);
    }
}


@NgModule({
    imports: [
        FormsModule
    ],
    exports: [
        FormsModule,
        StarRateValueAccesor
    ],
    declarations: [StarRateValueAccesor],
    providers: [],
})
export class StarRateModule { }
