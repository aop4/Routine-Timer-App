import androidutilAttributeSet = android.util.AttributeSet;
import androidcontentresTypedArray = android.content.res.TypedArray;
import androidwidgetTextView = android.widget.TextView;
import androidgraphicsPaint = android.graphics.Paint;
import androidgraphicsCanvas = android.graphics.Canvas;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.content.res.TypedArray.d.ts" />
/// <reference path="./android.graphics.Canvas.d.ts" />
/// <reference path="./android.graphics.Paint.d.ts" />
/// <reference path="./android.util.AttributeSet.d.ts" />
/// <reference path="./android.widget.TextView.d.ts" />
/// <reference path="./com.telerik.widget.scales.GaugeScale.d.ts" />
/// <reference path="./java.util.ArrayList.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module gauge {
				export abstract class RadGaugeView {
					public scales: javautilArrayList<javalangObject>;
					public title: androidwidgetTextView;
					public subtitle: androidwidgetTextView;
					public titleHorizontalOffset: number;
					public titleVerticalOffset: number;
					public subtitleHorizontalOffset: number;
					public subtitleVerticalOffset: number;
					public fillColor: number;
					public fillPaint: androidgraphicsPaint;
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet, param2: number);
					public getTitle(): androidwidgetTextView;
					public setTitle(param0: androidwidgetTextView): void;
					public getSubtitleHorizontalOffset(): number;
					public onDraw(param0: androidgraphicsCanvas): void;
					public removeScale(param0: number): void;
					public requestArrange(): void;
					public getTitleHorizontalOffset(): number;
					public getSubtitle(): androidwidgetTextView;
					public removeAllScales(): void;
					public addScale(param0: number, param1: com.telerik.widget.scales.GaugeScale): void;
					public animateGauge(): void;
					public setTitleVerticalOffset(param0: number): void;
					public setFillPaint(param0: androidgraphicsPaint): void;
					public setScales(param0: javautilArrayList<javalangObject>): void;
					public addScale(param0: com.telerik.widget.scales.GaugeScale): void;
					public setTitleHorizontalOffset(param0: number): void;
					public requestRender(): void;
					public init(): void;
					public setSubtitleHorizontalOffset(param0: number): void;
					public initWithXml(param0: androidcontentresTypedArray): void;
					public setSubtitleVerticalOffset(param0: number): void;
					public setSubtitle(param0: androidwidgetTextView): void;
					public getFillPaint(): androidgraphicsPaint;
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet);
					public getScales(): javautilArrayList<javalangObject>;
					public onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
					public constructor(param0: androidcontentContext);
					public getSubtitleVerticalOffset(): number;
					public getFillColor(): number;
					public setFillColor(param0: number): void;
					public removeScale(param0: com.telerik.widget.scales.GaugeScale): void;
					public getTitleVerticalOffset(): number;
				}
			}
		}
	}
}

/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.util.AttributeSet.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module gauge {
				export class RadRadialGaugeView extends com.telerik.widget.gauge.RadGaugeView {
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet, param2: number);
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet);
					public onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
					public constructor(param0: androidcontentContext);
				}
			}
		}
	}
}

import androidosParcelable = android.os.Parcelable;
import androidosParcel = android.os.Parcel;
import androidosParcelableCreator = android.os.Parcelable.Creator;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.content.res.TypedArray.d.ts" />
/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./android.os.Parcelable.d.ts" />
/// <reference path="./android.util.AttributeSet.d.ts" />
/// <reference path="./com.telerik.widget.indicators.GaugeBarIndicatorCapMode.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module indicators {
				export abstract class GaugeBarIndicator extends com.telerik.widget.indicators.GaugeIndicator {
					public barWidth: number;
					public minimum: number;
					public maximum: number;
					public location: number;
					public animationStartValue: number;
					public drawMaximum: number;
					public cap: com.telerik.widget.indicators.GaugeBarIndicatorCapMode;
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet, param2: number);
					public getBarWidth(): number;
					public getMinimum(): number;
					public setupValueAnimator(): void;
					public setRange(param0: number, param1: number): void;
					public setMinimum(param0: number): void;
					public setLocation(param0: number): void;
					public startAnimation(): void;
					public setCap(param0: com.telerik.widget.indicators.GaugeBarIndicatorCapMode): void;
					public init(): void;
					public getCap(): com.telerik.widget.indicators.GaugeBarIndicatorCapMode;
					public initWithXml(param0: androidcontentresTypedArray): void;
					public setMaximum(param0: number): void;
					public onRestoreInstanceState(param0: androidosParcelable): void;
					public setBarWidth(param0: number): void;
					public onSaveInstanceState(): androidosParcelable;
					public getMaximum(): number;
					public getAnimationStartValue(): number;
					public setAnimationStartValue(param0: number): void;
					public getLocation(): number;
				}
				export module GaugeBarIndicator {
					export class SavedState {
						public static CREATOR: androidosParcelableCreator<javalangObject>;
						public writeToParcel(param0: androidosParcel, param1: number): void;
					}
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module indicators {
				export class GaugeBarIndicatorCapMode {
					public static ROUND: com.telerik.widget.indicators.GaugeBarIndicatorCapMode;
					public static EDGE: com.telerik.widget.indicators.GaugeBarIndicatorCapMode;
					public static valueOf(param0: string): com.telerik.widget.indicators.GaugeBarIndicatorCapMode;
					public static values(): native.Array<com.telerik.widget.indicators.GaugeBarIndicatorCapMode>;
				}
			}
		}
	}
}

import androidanimationTimeInterpolator = android.animation.TimeInterpolator;
import androidanimationValueAnimator = android.animation.ValueAnimator;
/// <reference path="./android.animation.TimeInterpolator.d.ts" />
/// <reference path="./android.animation.ValueAnimator.d.ts" />
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.content.res.TypedArray.d.ts" />
/// <reference path="./android.graphics.Paint.d.ts" />
/// <reference path="./android.util.AttributeSet.d.ts" />
/// <reference path="./com.telerik.widget.indicators.GaugeIndicator.d.ts" />
/// <reference path="./com.telerik.widget.scales.GaugeScale.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module indicators {
				export abstract class GaugeIndicator extends androidviewView {
					public static DEFAULT_GAUGE_INDICATOR_COLOR: number;
					public scale: com.telerik.widget.scales.GaugeScale;
					public strokePaint: androidgraphicsPaint;
					public strokeColor: number;
					public strokeWidth: number;
					public fillPaint: androidgraphicsPaint;
					public fillColor: number;
					public animated: boolean;
					public animationDuration: number;
					public animator: androidanimationValueAnimator;
					public interpolator: androidanimationTimeInterpolator;
					public renderSuspended: boolean;
					public onValueChangedListener: com.telerik.widget.indicators.GaugeIndicator.OnValueChangedListener;
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet, param2: number);
					public setAnimated(param0: boolean): void;
					public isAnimated(): boolean;
					public getScale(): com.telerik.widget.scales.GaugeScale;
					public setInterpolator(param0: androidanimationTimeInterpolator): void;
					public getOnValueChangedListener(): com.telerik.widget.indicators.GaugeIndicator.OnValueChangedListener;
					public setScale(param0: com.telerik.widget.scales.GaugeScale): void;
					public getStrokeWidth(): number;
					public getInterpolator(): androidanimationTimeInterpolator;
					public setFillPaint(param0: androidgraphicsPaint): void;
					public setupValueAnimator(): void;
					public startAnimation(): void;
					public setOnValueChangedListener(param0: com.telerik.widget.indicators.GaugeIndicator.OnValueChangedListener): void;
					public requestRender(): void;
					public init(): void;
					public initWithXml(param0: androidcontentresTypedArray): void;
					public getAnimationDuration(): number;
					public getStrokePaint(): androidgraphicsPaint;
					public getFillPaint(): androidgraphicsPaint;
					public setStrokeColor(param0: number): void;
					public setAnimationDuration(param0: number): void;
					public setStrokePaint(param0: androidgraphicsPaint): void;
					public getStrokeColor(): number;
					public getFillColor(): number;
					public setFillColor(param0: number): void;
					public setStrokeWidth(param0: number): void;
				}
				export module GaugeIndicator {
					export class OnValueChangedListener {
						/**
						 * Constructs a new instance of the com.telerik.widget.indicators.GaugeIndicator$OnValueChangedListener interface with the provided implementation.
						 */
						public constructor(implementation: {
							valueChanged(param0: com.telerik.widget.indicators.GaugeIndicator): void;
						});
						public valueChanged(param0: com.telerik.widget.indicators.GaugeIndicator): void;
					}
				}
			}
		}
	}
}

/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.graphics.Canvas.d.ts" />
/// <reference path="./android.util.AttributeSet.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module indicators {
				export class GaugeRadialBarIndicator extends com.telerik.widget.indicators.GaugeBarIndicator {
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet, param2: number);
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet);
					public onDraw(param0: androidgraphicsCanvas): void;
					public constructor(param0: androidcontentContext);
					public init(): void;
				}
			}
		}
	}
}

/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.content.res.TypedArray.d.ts" />
/// <reference path="./android.graphics.Canvas.d.ts" />
/// <reference path="./android.graphics.Paint.d.ts" />
/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./android.os.Parcelable.d.ts" />
/// <reference path="./android.util.AttributeSet.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module indicators {
				export class GaugeRadialNeedle extends com.telerik.widget.indicators.GaugeIndicator {
					public drawValue: number;
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet, param2: number);
					public getCircleRadius(): number;
					public setTopWidth(param0: number): void;
					public setCircleRadius(param0: number): void;
					public onDraw(param0: androidgraphicsCanvas): void;
					public getLength(): number;
					public getOffset(): number;
					public getBottomWidth(): number;
					public getCircleInnerRadius(): number;
					public onRestoreInstanceState(param0: androidosParcelable): void;
					public onSaveInstanceState(): androidosParcelable;
					public getValue(): number;
					public setOffset(param0: number): void;
					public getAnimationStartValue(): number;
					public setCircleStrokeColor(param0: number): void;
					public setCircleStrokeWidth(param0: number): void;
					public setCircleFillPaint(param0: androidgraphicsPaint): void;
					public getCircleStrokeColor(): number;
					public setupValueAnimator(): void;
					public getTopWidth(): number;
					public startAnimation(): void;
					public getCircleFillPaint(): androidgraphicsPaint;
					public init(): void;
					public getCircleFillColor(): number;
					public initWithXml(param0: androidcontentresTypedArray): void;
					public setLength(param0: number): void;
					public setCircleFillColor(param0: number): void;
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet);
					public getCircleStrokePaint(): androidgraphicsPaint;
					public setValue(param0: number): void;
					public getCircleStrokeWidth(): number;
					public setBottomWidth(param0: number): void;
					public setAnimationStartValue(param0: number): void;
					public setCircleStrokePaint(param0: androidgraphicsPaint): void;
					public constructor(param0: androidcontentContext);
					public setCircleInnerRadius(param0: number): void;
				}
				export module GaugeRadialNeedle {
					export class SavedState {
						public static CREATOR: androidosParcelableCreator<javalangObject>;
						public writeToParcel(param0: androidosParcel, param1: number): void;
					}
				}
			}
		}
	}
}

/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.content.res.TypedArray.d.ts" />
/// <reference path="./android.graphics.Canvas.d.ts" />
/// <reference path="./android.util.AttributeSet.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module scales {
				export class GaugeRadialScale extends com.telerik.widget.scales.GaugeScale {
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet, param2: number);
					public getOnScreenValue(param0: number): number;
					public getSweepAngle(): number;
					public onDraw(param0: androidgraphicsCanvas): void;
					public getLocation(param0: number): number;
					public init(): void;
					public getRadius(): number;
					public initWithXml(param0: androidcontentresTypedArray): void;
					public setStartAngle(param0: number): void;
					public getStartAngle(): number;
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet);
					public setRadius(param0: number): void;
					public constructor(param0: androidcontentContext);
					public setSweepAngle(param0: number): void;
				}
			}
		}
	}
}

/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.content.res.TypedArray.d.ts" />
/// <reference path="./android.graphics.Canvas.d.ts" />
/// <reference path="./android.graphics.Paint.d.ts" />
/// <reference path="./android.util.AttributeSet.d.ts" />
/// <reference path="./com.telerik.widget.gauge.RadGaugeView.d.ts" />
/// <reference path="./com.telerik.widget.indicators.GaugeIndicator.d.ts" />
/// <reference path="./com.telerik.widget.scales.GaugeScaleLabelsLayoutMode.d.ts" />
/// <reference path="./com.telerik.widget.scales.GaugeScaleTicksLayoutMode.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.ArrayList.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module scales {
				export abstract class GaugeScale {
					public owner: com.telerik.widget.gauge.RadGaugeView;
					public indicators: javautilArrayList<javalangObject>;
					public maximum: number;
					public minimum: number;
					public lineVisible: boolean;
					public fillPaint: androidgraphicsPaint;
					public fillColor: number;
					public strokePaint: androidgraphicsPaint;
					public strokeColor: number;
					public strokeWidth: number;
					public majorTicksFillPaint: androidgraphicsPaint;
					public majorTicksStrokePaint: androidgraphicsPaint;
					public majorTicksFillColor: number;
					public majorTicksStrokeColor: number;
					public minorTicksFillPaint: androidgraphicsPaint;
					public minorTicksStrokePaint: androidgraphicsPaint;
					public minorTicksFillColor: number;
					public minorTicksStrokeColor: number;
					public labelsPaint: androidgraphicsPaint;
					public labelsColor: number;
					public majorTicksCount: number;
					public minorTicksCount: number;
					public ticksVisible: boolean;
					public majorTicksLength: number;
					public minorTicksLength: number;
					public majorTicksWidth: number;
					public minorTicksWidth: number;
					public ticksOffset: number;
					public ticksLayoutMode: com.telerik.widget.scales.GaugeScaleTicksLayoutMode;
					public labelsVisible: boolean;
					public labelsCount: number;
					public labelsLayoutMode: com.telerik.widget.scales.GaugeScaleLabelsLayoutMode;
					public labelsOffset: number;
					public labelsFormat: string;
					public getMajorTicksWidth(): number;
					public setMinorTicksWidth(param0: number): void;
					public setMinorTicksStrokeColor(param0: number): void;
					public getLabelsColor(): number;
					public removeAllIndicators(): void;
					public setLabelsCount(param0: number): void;
					public setMinorTicksLength(param0: number): void;
					public getMajorTicksLength(): number;
					public getMinorTicksStrokeColor(): number;
					public removeIndicator(param0: number): void;
					public setTicksVisible(param0: boolean): void;
					public getMinorTicksWidth(): number;
					public getStrokeWidth(): number;
					public isLabelsVisible(): boolean;
					public getOnScreenValue(param0: number): number;
					public addIndicator(param0: number, param1: com.telerik.widget.indicators.GaugeIndicator): void;
					public getMajorTicksCount(): number;
					public getMajorTicksStrokePaint(): androidgraphicsPaint;
					public setTicksOffset(param0: number): void;
					public getMajorTicksStrokeColor(): number;
					public getMajorTicksFillColor(): number;
					public setMajorTicksFillPaint(param0: androidgraphicsPaint): void;
					public setOwner(param0: com.telerik.widget.gauge.RadGaugeView): void;
					public getMinorTicksCount(): number;
					public initWithXml(param0: androidcontentresTypedArray): void;
					public setMajorTicksCount(param0: number): void;
					public getLabelsOffset(): number;
					public setLabelsFormat(param0: string): void;
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet);
					public setMajorTicksWidth(param0: number): void;
					public getIndicators(): javautilArrayList<javalangObject>;
					public setLabelsLayoutMode(param0: com.telerik.widget.scales.GaugeScaleLabelsLayoutMode): void;
					public getTicksLayoutMode(): com.telerik.widget.scales.GaugeScaleTicksLayoutMode;
					public setLineVisible(param0: boolean): void;
					public setStrokePaint(param0: androidgraphicsPaint): void;
					public setMinorTicksFillPaint(param0: androidgraphicsPaint): void;
					public setLabelsOffset(param0: number): void;
					public setStrokeWidth(param0: number): void;
					public getMajorTicksFillPaint(): androidgraphicsPaint;
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet, param2: number);
					public isTicksVisible(): boolean;
					public setRange(param0: number, param1: number): void;
					public setMajorTicksFillColor(param0: number): void;
					public onDraw(param0: androidgraphicsCanvas): void;
					public getLabelsPaint(): androidgraphicsPaint;
					public setMajorTicksLength(param0: number): void;
					public getOwner(): com.telerik.widget.gauge.RadGaugeView;
					public setLabelsVisible(param0: boolean): void;
					public requestArrange(): void;
					public setLabelsColor(param0: number): void;
					public setTicksLayoutMode(param0: com.telerik.widget.scales.GaugeScaleTicksLayoutMode): void;
					public setMajorTicksStrokePaint(param0: androidgraphicsPaint): void;
					public getLabelsCount(): number;
					public getMinorTicksFillPaint(): androidgraphicsPaint;
					public getMinorTicksLength(): number;
					public addIndicator(param0: com.telerik.widget.indicators.GaugeIndicator): void;
					public setMinorTicksStrokePaint(param0: androidgraphicsPaint): void;
					public getLabelsFormat(): string;
					public setMajorTicksStrokeColor(param0: number): void;
					public setFillPaint(param0: androidgraphicsPaint): void;
					public getTicksOffset(): number;
					public getMinimum(): number;
					public isLineVisible(): boolean;
					public setMinimum(param0: number): void;
					public getLocation(param0: number): number;
					public setLabelsPaint(param0: androidgraphicsPaint): void;
					public removeIndicator(param0: com.telerik.widget.indicators.GaugeIndicator): void;
					public requestRender(): void;
					public init(): void;
					public setMinorTicksCount(param0: number): void;
					public setMaximum(param0: number): void;
					public getMinorTicksFillColor(): number;
					public getMinorTicksStrokePaint(): androidgraphicsPaint;
					public getStrokePaint(): androidgraphicsPaint;
					public getFillPaint(): androidgraphicsPaint;
					public setIndicators(param0: javautilArrayList<javalangObject>): void;
					public getMaximum(): number;
					public animateIndicators(): void;
					public onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
					public setMinorTicksFillColor(param0: number): void;
					public setStrokeColor(param0: number): void;
					public constructor(param0: androidcontentContext);
					public getLabelsLayoutMode(): com.telerik.widget.scales.GaugeScaleLabelsLayoutMode;
					public getFillColor(): number;
					public setFillColor(param0: number): void;
					public getStrokeColor(): number;
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module scales {
				export class GaugeScaleLabelsLayoutMode {
					public static OUTER: com.telerik.widget.scales.GaugeScaleLabelsLayoutMode;
					public static INNER: com.telerik.widget.scales.GaugeScaleLabelsLayoutMode;
					public static values(): native.Array<com.telerik.widget.scales.GaugeScaleLabelsLayoutMode>;
					public static valueOf(param0: string): com.telerik.widget.scales.GaugeScaleLabelsLayoutMode;
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module scales {
				export class GaugeScaleTicksLayoutMode {
					public static OUTER: com.telerik.widget.scales.GaugeScaleTicksLayoutMode;
					public static INNER: com.telerik.widget.scales.GaugeScaleTicksLayoutMode;
					public static valueOf(param0: string): com.telerik.widget.scales.GaugeScaleTicksLayoutMode;
					public static values(): native.Array<com.telerik.widget.scales.GaugeScaleTicksLayoutMode>;
				}
			}
		}
	}
}
