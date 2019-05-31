import { CoercibleProperty, EventData } from 'tns-core-modules/ui/core/view';
import {
  View,
  Property,
  CssProperty,
  Style
} from 'tns-core-modules/ui/core/view';

export enum FillMode {
  FULL = 'full',
  HALF = 'half',
  PRECISE = 'precise'
}

export interface ValueChangedEventData extends EventData {
  oldValue: number
  newValue: number
}

export class StarRatingBase extends View {
  public static valueChagendEvent = 'valueChanged'

  max: number;
  value: number;
  fillMode: FillMode;
}

export interface StarRatingBase4 {
  on(event: "valueChange", callback: (args: ValueChangedEventData) => void, thisArg?: any);
}

export const maxProperty = new Property<StarRatingBase, number>({
  name: 'max',
  defaultValue: 5
});
export const valueProperty = new CoercibleProperty<StarRatingBase, number>({
  name: 'value',
  defaultValue: 1,
  valueConverter: (value) => {
    console.log('valueConverter', value)
    if (value === undefined || value === null) {
      return null
    }

    return parseInt(value, 10);
  },
  coerceValue: (target, value) => {
    console.log('coerceValue', value)
    return value
  }
});
export const fillModeProperty = new Property<StarRatingBase, FillMode>({
  name: 'fillMode',
  defaultValue: FillMode.FULL
});
export const emptyBorderColorProperty = new CssProperty<Style, string>({
  name: 'emptyBorderColor',
  cssName: 'empty-border-color'
});
export const filledBorderColorProperty = new CssProperty<Style, string>({
  name: 'filledBorderColor',
  cssName: 'filled-border-color'
});
export const emptyColorProperty = new CssProperty<Style, string>({
  name: 'emptyColor',
  cssName: 'empty-color'
});
export const emptyBorderWidthProperty = new Property<StarRatingBase, number>({
  name: 'emptyBoderWidth',
  defaultValue: 2
});
export const filledColorProperty = new CssProperty<Style, string>({
  name: 'filledColor',
  cssName: 'filled-color'
});
/* export const indicatorProperty = new Property<StarRatingBase, boolean>({
  name: "isindicator",
  defaultValue: true
}); */
// indicatorProperty.register(StarRatingBase);
fillModeProperty.register(StarRatingBase);
emptyBorderColorProperty.register(Style);
emptyBorderWidthProperty.register(StarRatingBase);
filledBorderColorProperty.register(Style);
emptyColorProperty.register(Style);
filledColorProperty.register(Style);
maxProperty.register(StarRatingBase);
valueProperty.register(StarRatingBase);
