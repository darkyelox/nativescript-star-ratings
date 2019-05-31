import { ElementRef, AfterViewInit } from '@angular/core';
import { BaseValueAccessor } from 'nativescript-angular/forms/value-accessors/base-value-accessor';
import { View } from 'tns-core-modules/ui/core/view';
export declare type StarRateView = {
    value: number;
} & View;
export declare class StarRateValueAccesor extends BaseValueAccessor<StarRateView> implements AfterViewInit {
    private _normalizedValue;
    private viewInitialized;
    constructor(elementRef: ElementRef);
    ngAfterViewInit(): void;
    writeValue(value: any): void;
    valueChangeListener(event: any): void;
}
export declare class StarRateModule {
}
