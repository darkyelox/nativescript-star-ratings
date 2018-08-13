import {
  StarRatingBase,
  maxProperty,
  valueProperty,
  fillModeProperty,
  FillMode,
  ValueChangedEventData,
  // indicatorProperty
} from './star-ratings.common';
import { layout } from 'tns-core-modules/ui/core/view';
import { fromObject } from 'tns-core-modules/data/observable';
import { Color } from 'tns-core-modules/color';

declare const android: any;
declare const me: any;

const MaterialRatingBar = me.zhanghai.android.materialratingbar.MaterialRatingBar
const ColorStateList = android.content.res.ColorStateList
const AbsoluteLayout = android.widget.AbsoluteLayout
const LinearLayout = android.widget.LinearLayout
const Gravity = android.view.Gravity
const LayerDrawable = android.graphics.drawable.LayerDrawable
const OnRatingBarChangeListener = android.widget.RatingBar.OnRatingBarChangeListener

declare type LayerDrawable = android.graphics.drawable.LayerDrawable
declare type Drawable = android.graphics.drawable.Drawable

export class StarRating extends StarRatingBase {

  ratingBar
  backgroundBar
  private _stars;
  private _filledColor = 'yellow'
  private _emptyColor
  private _emptyBorderColor = 'yellow'
  private _filledBorderColor = 'yellow'

  public createNativeView() {
    this.ratingBar = new MaterialRatingBar(this._context)
    this.backgroundBar = new MaterialRatingBar(this._context)
    this._stars =  this.ratingBar.getProgressDrawable() as LayerDrawable

    const absoluteLayout = new AbsoluteLayout(this._context)
    const absoluteLayoutParams = new AbsoluteLayout.LayoutParams(AbsoluteLayout.LayoutParams.MATCH_PARENT, AbsoluteLayout.LayoutParams.MATCH_PARENT, 0, 0)
    absoluteLayoutParams.gravity = Gravity.CENTER

    const backgroundRatingLayout = new LinearLayout(this._context)
    const backgroundLayoutParams = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.MATCH_PARENT)

    const starRatingLayout = new LinearLayout(this._context)
    const ratingLayoutParams = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.MATCH_PARENT)

    this.backgroundBar.setLayoutParams(backgroundLayoutParams)
    this.ratingBar.setLayoutParams(ratingLayoutParams)

    backgroundRatingLayout.setLayoutParams(absoluteLayoutParams)
    starRatingLayout.setLayoutParams(absoluteLayoutParams)

    backgroundRatingLayout.setGravity(Gravity.CENTER)
    starRatingLayout.setGravity(Gravity.CENTER)    

    backgroundRatingLayout.addView( this.backgroundBar)
    starRatingLayout.addView( this.ratingBar)

    absoluteLayout.addView(backgroundRatingLayout)
    absoluteLayout.addView(starRatingLayout)

    this.backgroundBar.setVisibility(android.view.View.GONE)

    return absoluteLayout;
  }

  public initNativeView() {
    if (this._filledColor) {
      this.filledColor = this._filledColor;
    }
    if (this._filledBorderColor) {
      this.filledBorderColor = this._filledBorderColor;
    }
    if (this._emptyColor) {
      this.emptyColor = this._emptyColor;
    }
    if (this._emptyBorderColor) {
      this.emptyBorderColor = this._emptyBorderColor;
    }

    const ref = new WeakRef(this);
    this.ratingBar.setOnRatingBarChangeListener(
      new OnRatingBarChangeListener({
        onRatingChanged: function (
          ratingBar,
          rating: number,
          fromUser: boolean
        ) {

          const owner = ref.get();
          if (fromUser) {
            valueProperty.nativeValueChange(owner, rating);
            // owner.value = rating

            owner.notify({
              eventName: StarRatingBase.valueChagendEvent,
              object: owner,
              newValue: rating,
              oldValue: rating
            } as ValueChangedEventData)
          }

          valueProperty.coerce(this)
        }
      })
    );
  }

  set emptyColor(color: string) {
    this._emptyColor = color;
    if(this.backgroundBar) {
      this.backgroundBar.setVisibility(android.view.View.VISIBLE)
      this.backgroundBar.setSupportProgressTintList(ColorStateList.valueOf(new Color(color).android))
    }
  }

  set emptyBorderColor(color: string) {
    this._emptyBorderColor = color
    if(this.ratingBar) {
      this.ratingBar.setSupportProgressBackgroundTintList(ColorStateList.valueOf(new Color(color).android))
    }
  }

  set filledColor(color: string) {
    this._filledColor = color;
    if(this.ratingBar) {
      this.ratingBar.setSupportProgressTintList(ColorStateList.valueOf(new Color(color).android))
    }
  }

  set filledBorderColor(color: string) {
    this._filledBorderColor = color
    if(this.ratingBar) {
      this.ratingBar.setSupportSecondaryProgressTintList(ColorStateList.valueOf(new Color(color).android))
    }
  }

  [fillModeProperty.getDefault]() {
    return FillMode.FULL
  }

  [fillModeProperty.setNative](mode: FillMode) {
      this.setupFillMode(mode)
  }

  private setupFillMode(mode: FillMode) {
    switch (mode) {
      case FillMode.HALF:
        this.ratingBar.setStepSize(0.5);
        break;
      case FillMode.PRECISE:
        this.ratingBar.setStepSize(0.1);
        break;
      default:
        this.ratingBar.setStepSize(1.0);
        break;
    }
  }

  /* [indicatorProperty.setNative](isindicator: boolean) {
    if (this.nativeView) {
      this.nativeView.setIsIndicator(isindicator);
    }
  }
 */
  public onLoaded() {
    super.onLoaded();

    if (this.ratingBar) {

      if(this.value) {
        this.ratingBar.setRating(Number(this.value));
        this.backgroundBar.setRating(this.ratingBar.getNumStars())
      }

      if(this.fillMode) {
        this.setupFillMode(this.fillMode)
      }
    }
  }

  public disposeNativeView() {
    if (!this.ratingBar) return;
    this.ratingBar.setOnRatingBarChangeListener(null);
  }

  public  [valueProperty.getDefault]() {
    return 1
  }

  public [valueProperty.setNative](value: number) {
    console.log('Value', value)
    if (this.ratingBar) {
      this.ratingBar.setRating(Number(this.value));
    }
  }


  [maxProperty.setNative](max: number) {
    console.log('Max', max)
    if (this.ratingBar) {
      this.ratingBar.setMax(Number(max));
      this.ratingBar.setNumStars(Number(max))
      this.backgroundBar.setMax(Number(max))
      this.backgroundBar.setNumStars(Number(max))
      this.backgroundBar.setRating(Number(max))
    }
  }

  [maxProperty.getDefault]() {
    console.log('DefaultMax')
    return 5
  }
}
