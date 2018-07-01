/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export module events {
					export class Event extends javalangObject {
						public setStartDate(param0: number): void;
						public setCalendarId(param0: number): void;
						public getEndDate(): number;
						public getStartDate(): number;
						public isAllDay(): boolean;
						public getCalendarId(): number;
						public getTitle(): string;
						public setEventColor(param0: number): void;
						public getEventColor(): number;
						public setTitle(param0: string): void;
						public constructor(param0: string, param1: number, param2: number);
						public setEndDate(param0: number): void;
						public setAllDay(param0: boolean): void;
					}
				}
			}
		}
	}
}

/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.graphics.Bitmap.d.ts" />
/// <reference path="./android.graphics.Canvas.d.ts" />
/// <reference path="./android.graphics.Paint.d.ts" />
/// <reference path="./android.graphics.Rect.d.ts" />
/// <reference path="./com.telerik.widget.calendar.ElementVisibility.d.ts" />
/// <reference path="./com.telerik.widget.calendar.RadCalendarView.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export abstract class CalendarElement extends javalangObject {
					public static TOP: number;
					public static LEFT: number;
					public static RIGHT: number;
					public static BOTTOM: number;
					public static CENTER_HORIZONTAL: number;
					public static CENTER_VERTICAL: number;
					public static CENTER: number;
					public virtualOffsetX: number;
					public virtualOffsetY: number;
					public context: androidcontentContext;
					public owner: com.telerik.widget.calendar.RadCalendarView;
					public backgroundPaint: androidgraphicsPaint;
					public parent: com.telerik.widget.calendar.CalendarElement;
					public visibility: com.telerik.widget.calendar.ElementVisibility;
					public enabled: boolean;
					public alpha: number;
					public setPaddingHorizontal(param0: number): void;
					public getBitmapPosition(): number;
					public getBitmap(): androidgraphicsBitmap;
					public getBottom(): number;
					public virtualBottom(): number;
					public arrange(param0: number, param1: number, param2: number, param3: number): void;
					public postRender(param0: androidgraphicsCanvas): void;
					public render(param0: androidgraphicsCanvas): void;
					public virtualTranslate(param0: number, param1: number): void;
					public getPaddingLeft(): number;
					public setPadding(param0: number, param1: number, param2: number, param3: number): void;
					public isEnabled(): boolean;
					public getPaddingTop(): number;
					public onAlphaChanged(): void;
					public setParent(param0: com.telerik.widget.calendar.CalendarElement): void;
					public setEnabled(param0: boolean): void;
					public getAlpha(): number;
					public getPaddingRight(): number;
					public updateBackgroundColor(): void;
					public getRight(): number;
					public getHeight(): number;
					public calcBorderRect(): androidgraphicsRect;
					public virtualRight(): number;
					public getPaddingBottom(): number;
					public setBitmapPosition(param0: number): void;
					public translate(param0: number, param1: number): void;
					public setAlpha(param0: number): void;
					public virtualLeft(): number;
					public getLeft(): number;
					public getVirtualOffsetX(): number;
					public getBackgroundColorDisabled(): number;
					public getBackgroundColorEnabled(): number;
					public setVirtualOffsets(param0: number, param1: number): void;
					public pointIsInsideElement(param0: number, param1: number): boolean;
					public getParent(): com.telerik.widget.calendar.CalendarElement;
					public setBackgroundColorEnabled(param0: number): void;
					public getVirtualOffsetY(): number;
					public setVirtualOffsetX(param0: number): void;
					public getVisibility(): com.telerik.widget.calendar.ElementVisibility;
					public onArrange(): void;
					public getWidth(): number;
					public setBackgroundColorDisabled(param0: number): void;
					public setBitmap(param0: androidgraphicsBitmap): void;
					public setPaddingVertical(param0: number): void;
					public setBackgroundColor(param0: number): void;
					public virtualTop(): number;
					public getTop(): number;
					public setBackgroundColor(param0: number, param1: number): void;
					public setVisibility(param0: com.telerik.widget.calendar.ElementVisibility): void;
					public setVirtualOffsetY(param0: number): void;
					public constructor(param0: com.telerik.widget.calendar.RadCalendarView);
				}
			}
		}
	}
}

/// <reference path="./java.lang.Class.d.ts" />
/// <reference path="./java.lang.Enum.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export class CalendarDisplayMode extends javalangEnum<any> {
					public static Month: com.telerik.widget.calendar.CalendarDisplayMode;
					public static Year: com.telerik.widget.calendar.CalendarDisplayMode;
					public static Week: com.telerik.widget.calendar.CalendarDisplayMode;
					public static Day: com.telerik.widget.calendar.CalendarDisplayMode;
					public static values(): native.Array<com.telerik.widget.calendar.CalendarDisplayMode>;
					public static valueOf(param0: string): com.telerik.widget.calendar.CalendarDisplayMode;
					public static valueOf(param0: javalangClass<any>, param1: string): javalangEnum<any>;
				}
			}
		}
	}
}

import javalangBoolean = java.lang.Boolean;
/// <reference path="./com.telerik.android.common.Function.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarCellType.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarDisplayMode.d.ts" />
/// <reference path="./java.lang.Boolean.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export class CalendarDayCellFilter extends javalangObject {
					public setIsFromCurrentMonth(param0: javalangBoolean): void;
					public getCalendarDisplayMode(): com.telerik.widget.calendar.CalendarDisplayMode;
					public setCellType(param0: com.telerik.widget.calendar.CalendarCellType): void;
					public setIsToday(param0: javalangBoolean): void;
					public getIsToday(): javalangBoolean;
					public getIsWeekend(): javalangBoolean;
					public setCalendarDisplayMode(param0: com.telerik.widget.calendar.CalendarDisplayMode): void;
					public getCellType(): com.telerik.widget.calendar.CalendarCellType;
					public setCustom(param0: com.telerik.android.common.Function): void;
					public constructor();
					public getIsFromCurrentMonth(): javalangBoolean;
					public getCustom(): com.telerik.android.common.Function;
					public getIsSelected(): javalangBoolean;
					public setIsSelected(param0: javalangBoolean): void;
					public setIsWeekend(param0: javalangBoolean): void;
				}
			}
		}
	}
}

/// <reference path="./java.lang.Class.d.ts" />
/// <reference path="./java.lang.Enum.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export class CalendarCellType extends javalangEnum<any> {
					public static Date: com.telerik.widget.calendar.CalendarCellType;
					public static WeekNumber: com.telerik.widget.calendar.CalendarCellType;
					public static DayName: com.telerik.widget.calendar.CalendarCellType;
					public static Title: com.telerik.widget.calendar.CalendarCellType;
					public static valueOf(param0: string): com.telerik.widget.calendar.CalendarCellType;
					public static values(): native.Array<com.telerik.widget.calendar.CalendarCellType>;
					public static valueOf(param0: javalangClass<any>, param1: string): javalangEnum<any>;
				}
			}
		}
	}
}

/// <reference path="./com.telerik.android.common.Function.d.ts" />
/// <reference path="./java.lang.Boolean.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export class CalendarMonthCellFilter extends javalangObject {
					public getTextIsToday(): javalangBoolean;
					public setTextIsMonthName(param0: javalangBoolean): void;
					public getTextIsDayName(): javalangBoolean;
					public getMonthIsCurrent(): javalangBoolean;
					public getTextIsWeekend(): javalangBoolean;
					public setTextIsToday(param0: javalangBoolean): void;
					public setMonthIsCurrent(param0: javalangBoolean): void;
					public setTextIsDayName(param0: javalangBoolean): void;
					public setTextIsDate(param0: javalangBoolean): void;
					public getTextIsCustomDate(): com.telerik.android.common.Function;
					public setTextIsWeekend(param0: javalangBoolean): void;
					public constructor();
					public getMonthIsCustomDate(): com.telerik.android.common.Function;
					public getTextIsDate(): javalangBoolean;
					public setMonthIsCustomDate(param0: com.telerik.android.common.Function): void;
					public setTextIsCustomDate(param0: com.telerik.android.common.Function): void;
					public getTextIsMonthName(): javalangBoolean;
					public getMonthIsCompact(): javalangBoolean;
					public setMonthIsCompact(param0: javalangBoolean): void;
				}
			}
		}
	}
}

import javautilHashtable = java.util.Hashtable;
import javautilLocale = java.util.Locale;
import androidviewanimationAnimationAnimationListener = android.view.animation.Animation.AnimationListener;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.graphics.Canvas.d.ts" />
/// <reference path="./android.graphics.Point.d.ts" />
/// <reference path="./android.graphics.Rect.d.ts" />
/// <reference path="./android.graphics.drawable.Drawable.d.ts" />
/// <reference path="./android.os.Bundle.d.ts" />
/// <reference path="./android.os.Parcelable.d.ts" />
/// <reference path="./android.util.AttributeSet.d.ts" />
/// <reference path="./android.view.ActionMode.d.ts" />
/// <reference path="./android.view.ContextMenu.d.ts" />
/// <reference path="./android.view.KeyEvent.d.ts" />
/// <reference path="./android.view.MotionEvent.d.ts" />
/// <reference path="./android.view.ScaleGestureDetector.d.ts" />
/// <reference path="./android.view.View.d.ts" />
/// <reference path="./android.view.ViewParent.d.ts" />
/// <reference path="./android.view.accessibility.AccessibilityEvent.d.ts" />
/// <reference path="./com.telerik.android.common.Function.d.ts" />
/// <reference path="./com.telerik.android.common.Procedure.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarAdapter.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarAnimationsManager.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarCell.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarDayCell.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarDayCellStyle.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarDisplayMode.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarFragment.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarGestureManager.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarMonthCell.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarMonthCellStyle.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarRow.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarScrollManager.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarSelectionManager.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarSelectionMode.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarTextElement.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CellDecorationsLayer.d.ts" />
/// <reference path="./com.telerik.widget.calendar.DateRange.d.ts" />
/// <reference path="./com.telerik.widget.calendar.EventsManager.d.ts" />
/// <reference path="./com.telerik.widget.calendar.GridLinesLayer.d.ts" />
/// <reference path="./com.telerik.widget.calendar.RadCalendarView.d.ts" />
/// <reference path="./com.telerik.widget.calendar.ScrollMode.d.ts" />
/// <reference path="./com.telerik.widget.calendar.WeekNumbersDisplayMode.d.ts" />
/// <reference path="./com.telerik.widget.calendar.decorations.Decorator.d.ts" />
/// <reference path="./com.telerik.widget.calendar.events.EventAdapter.d.ts" />
/// <reference path="./com.telerik.widget.calendar.events.EventsDisplayMode.d.ts" />
/// <reference path="./java.lang.Runnable.d.ts" />
/// <reference path="./java.util.Calendar.d.ts" />
/// <reference path="./java.util.Hashtable.d.ts" />
/// <reference path="./java.util.List.d.ts" />
/// <reference path="./java.util.Locale.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export class RadCalendarView extends androidviewViewGroup {
					public initialRowHeight: number;
					public selectionMode: com.telerik.widget.calendar.CalendarSelectionMode;
					public suspendDisplayModeChange: boolean;
					public getTitleHeight(): number;
					public recomputeViewAttributes(param0: androidviewView): void;
					public bringChildToFront(param0: androidviewView): void;
					public setCustomizationRule(param0: com.telerik.android.common.Procedure): void;
					public onNestedPreScroll(param0: androidviewView, param1: number, param2: number, param3: native.Array<number>): void;
					public getDisplayDate(): number;
					public addView(param0: androidviewView, param1: number, param2: androidviewViewGroupLayoutParams): void;
					public animateToPrevious(): void;
					public setGridLinesLayer(param0: com.telerik.widget.calendar.GridLinesLayer): void;
					public isYearModeCompact(): boolean;
					public addMonthCellStyle(param0: com.telerik.widget.calendar.CalendarMonthCellStyle): void;
					public isAnimationEnabled(): boolean;
					public invalidate(param0: androidgraphicsRect): void;
					public onFling(param0: androidviewMotionEvent, param1: androidviewMotionEvent, param2: number, param3: number): boolean;
					public addDayCellStyle(param0: com.telerik.widget.calendar.CalendarDayCellStyle): void;
					public invalidate(param0: number, param1: number, param2: number, param3: number): void;
					public invalidateArrange(): void;
					public childDrawableStateChanged(param0: androidviewView): void;
					public getLocale(): javautilLocale;
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet);
					public setAdapter(param0: com.telerik.widget.calendar.CalendarAdapter): void;
					public focusableViewAvailable(param0: androidviewView): void;
					public getCellDecorator(): com.telerik.widget.calendar.decorations.Decorator;
					public onScale(param0: androidviewScaleGestureDetector): boolean;
					public getShowCellDecorations(): boolean;
					public onDraw(param0: androidgraphicsCanvas): void;
					public onKeyMultiple(param0: number, param1: number, param2: androidviewKeyEvent): boolean;
					public setInOriginalSizeForAllModes(param0: boolean): void;
					public onKeyDown(param0: number, param1: androidviewKeyEvent): boolean;
					public getCalendar(): javautilCalendar;
					public unscheduleDrawable(param0: androidgraphicsdrawableDrawable, param1: javalangRunnable): void;
					public onSingleTapUp(param0: androidviewMotionEvent): boolean;
					public getShowDayNames(): boolean;
					public setOnSelectedDatesChangedListener(param0: com.telerik.widget.calendar.RadCalendarView.OnSelectedDatesChangedListener): void;
					public invalidateChild(param0: androidviewView, param1: androidgraphicsRect): void;
					public onNestedFling(param0: androidviewView, param1: number, param2: number, param3: boolean): boolean;
					public setOnDisplayDateChangedListener(param0: com.telerik.widget.calendar.RadCalendarView.OnDisplayDateChangedListener): void;
					public onNestedScroll(param0: androidviewView, param1: number, param2: number, param3: number, param4: number): void;
					public onDoubleTap(param0: androidviewMotionEvent): boolean;
					public setDateToColor(param0: com.telerik.android.common.Function): void;
					public isDrawingHorizontalGridLines(): boolean;
					public changeDisplayMode(param0: com.telerik.widget.calendar.CalendarDisplayMode, param1: boolean): void;
					public beginUpdate(): void;
					public getSelectedDates(): javautilList<any>;
					public endUpdate(): void;
					public getSelectedRange(): com.telerik.widget.calendar.DateRange;
					public sendAccessibilityEvent(param0: number): void;
					public getShowTitle(): boolean;
					public onDetachedFromWindow(): void;
					public isDrawingAllCells(): boolean;
					public getTextAlignment(): number;
					public updateViewLayout(param0: androidviewView, param1: androidviewViewGroupLayoutParams): void;
					public getChildVisibleRect(param0: androidviewView, param1: androidgraphicsRect, param2: androidgraphicsPoint): boolean;
					public startActionModeForChild(param0: androidviewView, param1: androidviewActionModeCallback, param2: number): androidviewActionMode;
					public setYearModeCompact(param0: boolean): void;
					public onNestedPrePerformAccessibilityAction(param0: androidviewView, param1: number, param2: androidosBundle): boolean;
					public onScaleBegin(param0: androidviewScaleGestureDetector): boolean;
					public setAnimationEnabled(param0: boolean): void;
					public dayNames(): com.telerik.widget.calendar.CalendarRow;
					public getMaxDate(): number;
					public onScaleEnd(param0: androidviewScaleGestureDetector): void;
					public beginUpdate(param0: boolean): void;
					public getAnimationsManager(): com.telerik.widget.calendar.CalendarAnimationsManager;
					public onDown(param0: androidviewMotionEvent): boolean;
					public focusSearch(param0: number): androidviewView;
					public isLayoutRequested(): boolean;
					public setCellDecorator(param0: com.telerik.widget.calendar.decorations.Decorator): void;
					public getCustomizationRule(): com.telerik.android.common.Procedure;
					public getParentForAccessibility(): androidviewViewParent;
					public isLayoutDirectionResolved(): boolean;
					public onSaveInstanceState(): androidosParcelable;
					public getBackgroundColor(): number;
					public endUpdate(param0: boolean): void;
					public notifySubtreeAccessibilityStateChanged(param0: androidviewView, param1: androidviewView, param2: number): void;
					public addView(param0: androidviewView, param1: number, param2: number): void;
					public setDisplayDate(param0: number): void;
					public requestChildFocus(param0: androidviewView, param1: androidviewView): void;
					public getDayNameToColor(): com.telerik.android.common.Function;
					public changeDisplayMode(param0: com.telerik.widget.calendar.CalendarDisplayMode): void;
					public canShiftToNextDate(): boolean;
					public scheduleDrawable(param0: androidgraphicsdrawableDrawable, param1: javalangRunnable, param2: number): void;
					public getTextDirection(): number;
					public onStopNestedScroll(param0: androidviewView): void;
					public setDisplayMode(param0: com.telerik.widget.calendar.CalendarDisplayMode): void;
					public requestFitSystemWindows(): void;
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet, param2: number);
					public onStartNestedScroll(param0: androidviewView, param1: androidviewView, param2: number): boolean;
					public canResolveTextDirection(): boolean;
					public getDateToColor(): com.telerik.android.common.Function;
					public addView(param0: androidviewView, param1: number): void;
					public setCellDecorationsLayer(param0: com.telerik.widget.calendar.CellDecorationsLayer): void;
					public requestDisallowInterceptTouchEvent(param0: boolean): void;
					public onRestoreInstanceState(param0: androidosParcelable): void;
					public setCalendar(param0: javautilCalendar): void;
					public setDrawingVerticalGridLines(param0: boolean): void;
					public setDrawingHorizontalGridLines(param0: boolean): void;
					public removeView(param0: androidviewView): void;
					public setShowCellDecorations(param0: boolean): void;
					public canShiftToPreviousDate(): boolean;
					public canResolveLayoutDirection(): boolean;
					public dateToCell(): javautilHashtable<any, any>;
					public isHorizontalScroll(): boolean;
					public animateMonthView(param0: number, param1: number, param2: number, param3: number, param4: number, param5: number, param6: androidviewanimationAnimationAnimationListener): void;
					public getEventsDisplayMode(): com.telerik.widget.calendar.events.EventsDisplayMode;
					public animateToNext(): void;
					public setBackgroundColor(param0: number): void;
					public onShowPress(param0: androidviewMotionEvent): void;
					public rebuildCalendar(): void;
					public setMaxDate(param0: number): void;
					public requestSendAccessibilityEvent(param0: androidviewView, param1: androidviewaccessibilityAccessibilityEvent): boolean;
					public title(): com.telerik.widget.calendar.CalendarTextElement;
					public requestChildRectangleOnScreen(param0: androidviewView, param1: androidgraphicsRect, param2: boolean): boolean;
					public onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
					public constructor(param0: androidcontentContext);
					public addView(param0: androidviewView): void;
					public onTouchEvent(param0: androidviewMotionEvent): boolean;
					public onNestedScrollAccepted(param0: androidviewView, param1: androidviewView, param2: number): void;
					public setHorizontalScroll(param0: boolean): void;
					public createContextMenu(param0: androidviewContextMenu): void;
					public setEventsDisplayMode(param0: com.telerik.widget.calendar.events.EventsDisplayMode): void;
					public setScrollManager(param0: com.telerik.widget.calendar.CalendarScrollManager): void;
					public getSelectionManager(): com.telerik.widget.calendar.CalendarSelectionManager;
					public setSelectionMode(param0: com.telerik.widget.calendar.CalendarSelectionMode): void;
					public isTextDirectionResolved(): boolean;
					public setScrollMode(param0: com.telerik.widget.calendar.ScrollMode): void;
					public updateFragmentWeekMode(param0: com.telerik.widget.calendar.CalendarFragment, param1: number, param2: boolean): void;
					public getScrollManager(): com.telerik.widget.calendar.CalendarScrollManager;
					public updateFragmentMonthMode(param0: com.telerik.widget.calendar.CalendarFragment, param1: number, param2: boolean): void;
					public updateCalendar(): void;
					public getLayoutDirection(): number;
					public childHasTransientStateChanged(param0: androidviewView, param1: boolean): void;
					public getCellDecorationsLayer(): com.telerik.widget.calendar.decorations.Decorator;
					public setDayNamesHeight(param0: number): void;
					public setSelectionManager(param0: com.telerik.widget.calendar.CalendarSelectionManager): void;
					public isDrawingVerticalGridLines(): boolean;
					public getOnSelectedDatesChangedListener(): com.telerik.widget.calendar.RadCalendarView.OnSelectedDatesChangedListener;
					public eventsManager(): com.telerik.widget.calendar.EventsManager;
					public setEventAdapter(param0: com.telerik.widget.calendar.events.EventAdapter): void;
					public setGestureManager(param0: com.telerik.widget.calendar.CalendarGestureManager): void;
					public setShowDayNames(param0: boolean): void;
					public invalidate(): void;
					public isTextAlignmentResolved(): boolean;
					public invalidateChildInParent(param0: native.Array<number>, param1: androidgraphicsRect): androidviewViewParent;
					public setWeekNumbersDisplayMode(param0: com.telerik.widget.calendar.WeekNumbersDisplayMode): void;
					public canResolveTextAlignment(): boolean;
					public getWeekNumbersDisplayMode(): com.telerik.widget.calendar.WeekNumbersDisplayMode;
					public setShowGridLines(param0: boolean): void;
					public requestLayout(): void;
					public requestTransparentRegion(param0: androidviewView): void;
					public addView(param0: androidviewView, param1: androidviewViewGroupLayoutParams): void;
					public setLocale(param0: javautilLocale): void;
					public updateFragments(param0: boolean): void;
					public onNestedPreFling(param0: androidviewView, param1: number, param2: number): boolean;
					public applyMonthCellStyles(param0: com.telerik.widget.calendar.CalendarMonthCell): void;
					public removeDayCellStyle(param0: com.telerik.widget.calendar.CalendarDayCellStyle): void;
					public getGestureManager(): com.telerik.widget.calendar.CalendarGestureManager;
					public updateFragmentYearMode(param0: com.telerik.widget.calendar.CalendarFragment, param1: number, param2: boolean): void;
					public onDoubleTapEvent(param0: androidviewMotionEvent): boolean;
					public setShowTitle(param0: boolean): void;
					public setOnCellClickListener(param0: com.telerik.widget.calendar.RadCalendarView.OnCellClickListener): void;
					public sendAccessibilityEventUnchecked(param0: androidviewaccessibilityAccessibilityEvent): void;
					public getMinDate(): number;
					public focusSearch(param0: androidviewView, param1: number): androidviewView;
					public onAttachedToWindow(): void;
					public isInOriginalSizeForAllModes(): boolean;
					public notifyDataChanged(): void;
					public onKeyUp(param0: number, param1: androidviewKeyEvent): boolean;
					public setDayNameToColor(param0: com.telerik.android.common.Function): void;
					public setMinDate(param0: number): void;
					public getShowGridLines(): boolean;
					public shiftDate(param0: boolean): void;
					public getScrollMode(): com.telerik.widget.calendar.ScrollMode;
					public clearChildFocus(param0: androidviewView): void;
					public onKeyLongPress(param0: number, param1: androidviewKeyEvent): boolean;
					public removeMonthCellStyle(param0: com.telerik.widget.calendar.CalendarMonthCellStyle): void;
					public setDrawingAllCells(param0: boolean): void;
					public setSelectedDates(param0: javautilList<any>): void;
					public startActionModeForChild(param0: androidviewView, param1: androidviewActionModeCallback): androidviewActionMode;
					public showContextMenuForChild(param0: androidviewView): boolean;
					public onLongPress(param0: androidviewMotionEvent): void;
					public getParent(): androidviewViewParent;
					public getDayNamesHeight(): number;
					public getSelectionMode(): com.telerik.widget.calendar.CalendarSelectionMode;
					public updateFragments(): void;
					public getGridLinesLayer(): com.telerik.widget.calendar.GridLinesLayer;
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet, param2: number, param3: number);
					public setTitleHeight(param0: number): void;
					public applyDayCellStyles(param0: com.telerik.widget.calendar.CalendarDayCell): void;
					public invalidateDrawable(param0: androidgraphicsdrawableDrawable): void;
					public onScroll(param0: androidviewMotionEvent, param1: androidviewMotionEvent, param2: number, param3: number): boolean;
					public setAnimationsManager(param0: com.telerik.widget.calendar.CalendarAnimationsManager): void;
					public getAdapter(): com.telerik.widget.calendar.CalendarAdapter;
					public setDisplayDateSilent(param0: number): void;
					public createImageFromView(param0: androidviewView): androidgraphicsdrawableDrawable;
					public unscheduleDrawable(param0: androidgraphicsdrawableDrawable): void;
					public getEventAdapter(): com.telerik.widget.calendar.events.EventAdapter;
					public getDisplayMode(): com.telerik.widget.calendar.CalendarDisplayMode;
					public onSingleTapConfirmed(param0: androidviewMotionEvent): boolean;
					public setSelectedRange(param0: com.telerik.widget.calendar.DateRange): void;
					public setOnDisplayModeChangedListener(param0: com.telerik.widget.calendar.RadCalendarView.OnDisplayModeChangedListener): void;
					public drawDayNames(param0: androidgraphicsCanvas): void;
					public getDayView(): com.telerik.widget.calendar.dayview.CalendarDayView;
				}
				export module RadCalendarView {
					export class CalendarTask extends javalangObject {
						/**
						 * Constructs a new instance of the com.telerik.widget.calendar.RadCalendarView$CalendarTask interface with the provided implementation.
						 */
						public constructor(implementation: {
							displayMode(): com.telerik.widget.calendar.CalendarDisplayMode;
							execute(): void;
						});
						public displayMode(): com.telerik.widget.calendar.CalendarDisplayMode;
						public execute(): void;
					}
					export class DatesHolderView extends androidviewViewGroup {
						public isLayoutRequested(): boolean;
						public onKeyDown(param0: number, param1: androidviewKeyEvent): boolean;
						public focusableViewAvailable(param0: androidviewView): void;
						public canResolveLayoutDirection(): boolean;
						public constructor(param0: com.telerik.widget.calendar.RadCalendarView, param1: androidcontentContext, param2: androidutilAttributeSet);
						public showContextMenuForChild(param0: androidviewView): boolean;
						public sendAccessibilityEvent(param0: number): void;
						public childDrawableStateChanged(param0: androidviewView): void;
						public constructor(param0: androidcontentContext, param1: androidutilAttributeSet, param2: number);
						public requestTransparentRegion(param0: androidviewView): void;
						public constructor(param0: androidcontentContext, param1: androidutilAttributeSet, param2: number, param3: number);
						public onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
						public onNestedFling(param0: androidviewView, param1: number, param2: number, param3: boolean): boolean;
						public constructor(param0: androidcontentContext, param1: androidutilAttributeSet);
						public getParent(): androidviewViewParent;
						public addView(param0: androidviewView, param1: androidviewViewGroupLayoutParams): void;
						public onNestedScrollAccepted(param0: androidviewView, param1: androidviewView, param2: number): void;
						public requestChildRectangleOnScreen(param0: androidviewView, param1: androidgraphicsRect, param2: boolean): boolean;
						public isTextAlignmentResolved(): boolean;
						public onKeyLongPress(param0: number, param1: androidviewKeyEvent): boolean;
						public invalidateDrawable(param0: androidgraphicsdrawableDrawable): void;
						public startActionModeForChild(param0: androidviewView, param1: androidviewActionModeCallback): androidviewActionMode;
						public recomputeViewAttributes(param0: androidviewView): void;
						public getTextDirection(): number;
						public unscheduleDrawable(param0: androidgraphicsdrawableDrawable, param1: javalangRunnable): void;
						public constructor(param0: com.telerik.widget.calendar.RadCalendarView, param1: androidcontentContext, param2: androidutilAttributeSet, param3: number);
						public requestSendAccessibilityEvent(param0: androidviewView, param1: androidviewaccessibilityAccessibilityEvent): boolean;
						public clearChildFocus(param0: androidviewView): void;
						public requestChildFocus(param0: androidviewView, param1: androidviewView): void;
						public getParentForAccessibility(): androidviewViewParent;
						public canResolveTextDirection(): boolean;
						public requestDisallowInterceptTouchEvent(param0: boolean): void;
						public isLayoutDirectionResolved(): boolean;
						public invalidateChild(param0: androidviewView, param1: androidgraphicsRect): void;
						public onNestedScroll(param0: androidviewView, param1: number, param2: number, param3: number, param4: number): void;
						public requestLayout(): void;
						public constructor(param0: androidcontentContext);
						public isTextDirectionResolved(): boolean;
						public unscheduleDrawable(param0: androidgraphicsdrawableDrawable): void;
						public focusSearch(param0: number): androidviewView;
						public notifySubtreeAccessibilityStateChanged(param0: androidviewView, param1: androidviewView, param2: number): void;
						public onNestedPrePerformAccessibilityAction(param0: androidviewView, param1: number, param2: androidosBundle): boolean;
						public addView(param0: androidviewView, param1: number): void;
						public addView(param0: androidviewView, param1: number, param2: androidviewViewGroupLayoutParams): void;
						public constructor(param0: com.telerik.widget.calendar.RadCalendarView, param1: androidcontentContext);
						public onNestedPreScroll(param0: androidviewView, param1: number, param2: number, param3: native.Array<number>): void;
						public onKeyUp(param0: number, param1: androidviewKeyEvent): boolean;
						public childHasTransientStateChanged(param0: androidviewView, param1: boolean): void;
						public onNestedPreFling(param0: androidviewView, param1: number, param2: number): boolean;
						public onKeyMultiple(param0: number, param1: number, param2: androidviewKeyEvent): boolean;
						public createContextMenu(param0: androidviewContextMenu): void;
						public onStartNestedScroll(param0: androidviewView, param1: androidviewView, param2: number): boolean;
						public removeView(param0: androidviewView): void;
						public scheduleDrawable(param0: androidgraphicsdrawableDrawable, param1: javalangRunnable, param2: number): void;
						public requestFitSystemWindows(): void;
						public startActionModeForChild(param0: androidviewView, param1: androidviewActionModeCallback, param2: number): androidviewActionMode;
						public onStopNestedScroll(param0: androidviewView): void;
						public bringChildToFront(param0: androidviewView): void;
						public sendAccessibilityEventUnchecked(param0: androidviewaccessibilityAccessibilityEvent): void;
						public focusSearch(param0: androidviewView, param1: number): androidviewView;
						public addView(param0: androidviewView): void;
						public getChildVisibleRect(param0: androidviewView, param1: androidgraphicsRect, param2: androidgraphicsPoint): boolean;
						public getTextAlignment(): number;
						public invalidateChildInParent(param0: native.Array<number>, param1: androidgraphicsRect): androidviewViewParent;
						public addView(param0: androidviewView, param1: number, param2: number): void;
						public updateViewLayout(param0: androidviewView, param1: androidviewViewGroupLayoutParams): void;
						public getLayoutDirection(): number;
						public canResolveTextAlignment(): boolean;
					}
					export class FragmentHolderView extends androidviewView {
						public arrangePassed: boolean;
						public onKeyDown(param0: number, param1: androidviewKeyEvent): boolean;
						public scheduleDrawable(param0: androidgraphicsdrawableDrawable, param1: javalangRunnable, param2: number): void;
						public unscheduleDrawable(param0: androidgraphicsdrawableDrawable): void;
						public sendAccessibilityEvent(param0: number): void;
						public setActive(param0: boolean): void;
						public constructor(param0: androidcontentContext, param1: androidutilAttributeSet, param2: number);
						public constructor(param0: com.telerik.widget.calendar.RadCalendarView, param1: androidcontentContext);
						public sendAccessibilityEventUnchecked(param0: androidviewaccessibilityAccessibilityEvent): void;
						public onKeyUp(param0: number, param1: androidviewKeyEvent): boolean;
						public constructor(param0: androidcontentContext, param1: androidutilAttributeSet, param2: number, param3: number);
						public onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
						public constructor(param0: androidcontentContext, param1: androidutilAttributeSet);
						public onDraw(param0: androidgraphicsCanvas): void;
						public onKeyMultiple(param0: number, param1: number, param2: androidviewKeyEvent): boolean;
						public onKeyLongPress(param0: number, param1: androidviewKeyEvent): boolean;
						public invalidateDrawable(param0: androidgraphicsdrawableDrawable): void;
						public constructor(param0: com.telerik.widget.calendar.RadCalendarView, param1: androidcontentContext, param2: com.telerik.widget.calendar.CalendarFragment);
						public constructor(param0: androidcontentContext);
						public isActive(): boolean;
						public unscheduleDrawable(param0: androidgraphicsdrawableDrawable, param1: javalangRunnable): void;
					}
					export class HeadWrapperView extends androidviewView {
						public onKeyDown(param0: number, param1: androidviewKeyEvent): boolean;
						public scheduleDrawable(param0: androidgraphicsdrawableDrawable, param1: javalangRunnable, param2: number): void;
						public unscheduleDrawable(param0: androidgraphicsdrawableDrawable): void;
						public sendAccessibilityEvent(param0: number): void;
						public invalidate(param0: number, param1: number, param2: number, param3: number): void;
						public constructor(param0: androidcontentContext, param1: androidutilAttributeSet, param2: number);
						public constructor(param0: com.telerik.widget.calendar.RadCalendarView, param1: androidcontentContext);
						public sendAccessibilityEventUnchecked(param0: androidviewaccessibilityAccessibilityEvent): void;
						public bringToFront(): void;
						public onKeyUp(param0: number, param1: androidviewKeyEvent): boolean;
						public constructor(param0: androidcontentContext, param1: androidutilAttributeSet, param2: number, param3: number);
						public constructor(param0: androidcontentContext, param1: androidutilAttributeSet);
						public onDraw(param0: androidgraphicsCanvas): void;
						public onKeyMultiple(param0: number, param1: number, param2: androidviewKeyEvent): boolean;
						public invalidate(): void;
						public onKeyLongPress(param0: number, param1: androidviewKeyEvent): boolean;
						public invalidateDrawable(param0: androidgraphicsdrawableDrawable): void;
						public constructor(param0: androidcontentContext);
						public invalidate(param0: androidgraphicsRect): void;
						public unscheduleDrawable(param0: androidgraphicsdrawableDrawable, param1: javalangRunnable): void;
					}
					export class OnCellClickListener extends javalangObject {
						/**
						 * Constructs a new instance of the com.telerik.widget.calendar.RadCalendarView$OnCellClickListener interface with the provided implementation.
						 */
						public constructor(implementation: {
							onCellClick(param0: com.telerik.widget.calendar.CalendarCell): void;
						});
						public onCellClick(param0: com.telerik.widget.calendar.CalendarCell): void;
					}
					export class OnDisplayDateChangedListener extends javalangObject {
						/**
						 * Constructs a new instance of the com.telerik.widget.calendar.RadCalendarView$OnDisplayDateChangedListener interface with the provided implementation.
						 */
						public constructor(implementation: {
							onDisplayDateChanged(param0: number, param1: number): void;
						});
						public onDisplayDateChanged(param0: number, param1: number): void;
					}
					export class OnDisplayModeChangedListener extends javalangObject {
						/**
						 * Constructs a new instance of the com.telerik.widget.calendar.RadCalendarView$OnDisplayModeChangedListener interface with the provided implementation.
						 */
						public constructor(implementation: {
							onDisplayModeChanged(param0: com.telerik.widget.calendar.CalendarDisplayMode, param1: com.telerik.widget.calendar.CalendarDisplayMode): void;
						});
						public onDisplayModeChanged(param0: com.telerik.widget.calendar.CalendarDisplayMode, param1: com.telerik.widget.calendar.CalendarDisplayMode): void;
					}
					export class OnSelectedDatesChangedListener extends javalangObject {
						/**
						 * Constructs a new instance of the com.telerik.widget.calendar.RadCalendarView$OnSelectedDatesChangedListener interface with the provided implementation.
						 */
						public constructor(implementation: {
							onSelectedDatesChanged(param0: com.telerik.widget.calendar.RadCalendarView.SelectionContext): void;
						});
						public onSelectedDatesChanged(param0: com.telerik.widget.calendar.RadCalendarView.SelectionContext): void;
					}
					export class SelectionContext extends javalangObject {
						public constructor();
						public newSelection(): javautilList<any>;
						public datesRemoved(): javautilList<any>;
						public oldSelection(): javautilList<any>;
						public datesAdded(): javautilList<any>;
					}
				}
			}
		}
	}
}

import javalangFloat = java.lang.Float;
/// <reference path="./java.lang.Float.d.ts" />
/// <reference path="./java.lang.Integer.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export abstract class CalendarCellStyle extends javalangObject {
					public getFontName(): string;
					public setBorderWidth(param0: javalangFloat): void;
					public getTextColor(): javalangInteger;
					public getBackgroundColor(): javalangInteger;
					public getTextSize(): javalangFloat;
					public getBorderColor(): javalangInteger;
					public setTextSize(param0: javalangFloat): void;
					public setBorderColor(param0: javalangInteger): void;
					public setBackgroundColor(param0: javalangInteger): void;
					public getFontStyle(): javalangInteger;
					public constructor();
					public setFontStyle(param0: javalangInteger): void;
					public setFontName(param0: string): void;
					public setTextColor(param0: javalangInteger): void;
					public getBorderWidth(): javalangFloat;
				}
			}
		}
	}
}

/// <reference path="./com.telerik.widget.calendar.CalendarMonthCellFilter.d.ts" />
/// <reference path="./java.lang.Integer.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export class CalendarMonthCellStyle extends com.telerik.widget.calendar.CalendarCellStyle {
					public getFilter(): com.telerik.widget.calendar.CalendarMonthCellFilter;
					public setFilter(param0: com.telerik.widget.calendar.CalendarMonthCellFilter): void;
					public constructor();
					public getTextBackgroundColor(): javalangInteger;
					public setTextBackgroundColor(param0: javalangInteger): void;
				}
			}
		}
	}
}

/// <reference path="./com.telerik.widget.calendar.CalendarDayCellFilter.d.ts" />
/// <reference path="./java.lang.Integer.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export class CalendarDayCellStyle extends com.telerik.widget.calendar.CalendarCellStyle {
					public getTextPosition(): javalangInteger;
					public setFilter(param0: com.telerik.widget.calendar.CalendarDayCellFilter): void;
					public setPaddingHorizontal(param0: javalangInteger): void;
					public getFilter(): com.telerik.widget.calendar.CalendarDayCellFilter;
					public constructor();
					public setTextPosition(param0: javalangInteger): void;
					public getPaddingHorizontal(): javalangInteger;
					public getPaddingVertical(): javalangInteger;
					public setPaddingVertical(param0: javalangInteger): void;
				}
			}
		}
	}
}

import javatextSimpleDateFormat = java.text.SimpleDateFormat;
/// <reference path="./java.text.SimpleDateFormat.d.ts" />
/// <reference path="./com.telerik.widget.calendar.RadCalendarView.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export module dayview {
					export class DayEventsViewStyle {
						public setBackgroundColor(param0: number): void;
						public setTimeLabelFormat(param0: javatextSimpleDateFormat): void;
						public setTimeLabelColor(param0: number): void;
						public setTimeLabelTextSize(param0: number): void;
						public setTimeLinesWidth(param0: number): void;
						public setTimeLinesColor(param0: number): void;
					}
					export class AllDayEventsViewStyle {
						public setBackgroundColor(param0: number): void;
						public setAllDayText(param0: string): void;
						public setAllDayTextIsVisible(param0: boolean): void;
						public setAllDayTextSize(param0: number): void;
						public setAllDayTextColor(param0: number): void;
					}
					export class CalendarDayView extends android.widget.LinearLayout {
						public getDayEventsViewStyle(): DayEventsViewStyle;
						public getAllDayEventsViewStyle(): AllDayEventsViewStyle;
					}
					export module CalendarDayView {
						export class EventViewTapListener extends javalangObject {
							public constructor(implementation: {
								onEventViewTap(event: com.telerik.widget.calendar.events.Event): void;
							});
							public onEventViewTap(event: com.telerik.widget.calendar.events.Event): void;
						}
					}
				}
			}
		}
	}
}

/// <reference path="./com.telerik.widget.calendar.RadCalendarView.d.ts" />
/// <reference path="./com.telerik.widget.calendar.events.Event.d.ts" />
/// <reference path="./com.telerik.widget.calendar.events.EventRenderer.d.ts" />
/// <reference path="./com.telerik.widget.calendar.events.read.GenericResultCallback.d.ts" />
/// <reference path="./java.util.Calendar.d.ts" />
/// <reference path="./java.util.List.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export module events {
					export class EventAdapter extends javalangObject {
						public owner: com.telerik.widget.calendar.RadCalendarView;
						public calendar: javautilCalendar;
						public setRenderer(param0: com.telerik.widget.calendar.events.EventRenderer): void;
						public eventShouldBeVisible(param0: com.telerik.widget.calendar.events.Event, param1: number, param2: number): boolean;
						public constructor(param0: com.telerik.widget.calendar.RadCalendarView);
						public requestEventsForDates(param0: javautilList<any>, param1: com.telerik.widget.calendar.events.read.GenericResultCallback): void;
						public getEventsForDate(param0: number): javautilList<any>;
						public addEvent(param0: com.telerik.widget.calendar.events.Event): void;
						public setEvents(param0: javautilList<any>): void;
						public getRenderer(): com.telerik.widget.calendar.events.EventRenderer;
						public constructor(param0: com.telerik.widget.calendar.RadCalendarView, param1: javautilList<any>);
						public getEvents(): javautilList<any>;
					}
				}
			}
		}
	}
}

/// <reference path="./java.lang.Class.d.ts" />
/// <reference path="./java.lang.Enum.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export module events {
					export class EventRenderMode extends javalangEnum<any> {
						public static Shape: com.telerik.widget.calendar.events.EventRenderMode;
						public static Text: com.telerik.widget.calendar.events.EventRenderMode;
						public static Shape_And_Text: com.telerik.widget.calendar.events.EventRenderMode;
						public static None: com.telerik.widget.calendar.events.EventRenderMode;
						public static values(): native.Array<com.telerik.widget.calendar.events.EventRenderMode>;
						public static valueOf(param0: javalangClass<any>, param1: string): javalangEnum<any>;
						public static valueOf(param0: string): com.telerik.widget.calendar.events.EventRenderMode;
					}
				}
			}
		}
	}
}

import androidgraphicsTypeface = android.graphics.Typeface;
import androidutilSparseArray = android.util.SparseArray;
import javalangLong = java.lang.Long;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.graphics.Typeface.d.ts" />
/// <reference path="./android.util.SparseArray.d.ts" />
/// <reference path="./com.telerik.android.common.Procedure.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarCell.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarDayCell.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarDisplayMode.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarFragment.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarMonthCell.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarRow.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarStyle.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarTitleCell.d.ts" />
/// <reference path="./com.telerik.widget.calendar.RadCalendarView.d.ts" />
/// <reference path="./java.lang.Long.d.ts" />
/// <reference path="./java.util.Calendar.d.ts" />
/// <reference path="./java.util.List.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export class CalendarAdapter extends javalangObject {
					public owner: com.telerik.widget.calendar.RadCalendarView;
					public context: androidcontentContext;
					public dateCells: javautilList<any>;
					public weekNumberCells: javautilList<any>;
					public dayNameCells: javautilList<any>;
					public style: com.telerik.widget.calendar.CalendarStyle;
					public workCalendar: javautilCalendar;
					public getDayNameCell(): com.telerik.widget.calendar.CalendarCell;
					public getTitleTypeFace(): androidgraphicsTypeface;
					public setMonthNameTypeFace(param0: androidgraphicsTypeface): void;
					public getDayNameTextColor(): number;
					public setInlineEventTitleTextSize(param0: number): void;
					public getDayNameTextSizeYearMode(): number;
					public setDateTextSizeYearMode(param0: number): void;
					public getTitleBackgroundColor(): number;
					public setTitleTextSize(param0: number): void;
					public setDateCellPaddingVertical(param0: number): void;
					public setWeekNumberTypeFace(param0: androidgraphicsTypeface): void;
					public applyProcedureToDateCells(param0: com.telerik.android.common.Procedure): void;
					public updateDateCell(param0: com.telerik.widget.calendar.CalendarDayCell, param1: javalangLong, param2: javautilList<any>, param3: boolean): void;
					public getDateCell(): com.telerik.widget.calendar.CalendarDayCell;
					public getTodayTextColor(): number;
					public setSelectedCellTypeFace(param0: androidgraphicsTypeface): void;
					public getDayNamePaddingVertical(): number;
					public setDayNameTextColor(param0: number): void;
					public getDayNameTypeFace(): androidgraphicsTypeface;
					public updateWeekNumberCellStyle(param0: com.telerik.widget.calendar.CalendarDayCell): void;
					public setWeekNumberTextSize(param0: number): void;
					public setDateTextColorYearMode(param0: number, param1: number): void;
					public getDateTextSizeYearMode(): number;
					public setMonthCellPaddingVertical(param0: number): void;
					public getSelectedCellBackgroundColor(): number;
					public setDayNameTypefaceYearMode(param0: androidgraphicsTypeface): void;
					public generateCalendarRow(): com.telerik.widget.calendar.CalendarRow;
					public getMonthNameCached(param0: number): string;
					public getDayNameTextColorYearModeDisabled(): number;
					public setTodayCellBorderColor(param0: number): void;
					public updateDayNameCellStyle(param0: com.telerik.widget.calendar.CalendarDayCell): void;
					public applyProcedureToWeekNumberCells(param0: com.telerik.android.common.Procedure): void;
					public setTodayTextColor(param0: number): void;
					public setTitleTextPosition(param0: number): void;
					public getWeekNumberTextColorDisabled(): number;
					public setMonthNameTextColor(param0: number, param1: number): void;
					public getSelectedCellBorderWidth(): number;
					public setMonthNameTextSize(param0: number): void;
					public getInlineEventTitleTextSize(): number;
					public setDayNameTextPosition(param0: number): void;
					public getTodayCellTypeFace(): androidgraphicsTypeface;
					public getDateTypeFace(): androidgraphicsTypeface;
					public getDayNameCell(param0: number): com.telerik.widget.calendar.CalendarDayCell;
					public getDateCellPaddingVertical(): number;
					public getDayNamePaddingHorizontal(): number;
					public getTitleTextColor(): number;
					public setDayNameTextColorYearMode(param0: number, param1: number): void;
					public setDateTypeFaceYearMode(param0: androidgraphicsTypeface): void;
					public getTodayTypeFace(): androidgraphicsTypeface;
					public updateDateCellStyle(param0: com.telerik.widget.calendar.CalendarDayCell): void;
					public applyStyle(param0: com.telerik.widget.calendar.CalendarStyle): void;
					public getDayNameTextPosition(): number;
					public getMonthNameTextPosition(): number;
					public updateWeekNumberCell(param0: com.telerik.widget.calendar.CalendarDayCell, param1: number): void;
					public getTodayCellBorderColor(): number;
					public setTodayCellBackgroundColor(param0: number): void;
					public setDayNameTypeFace(param0: androidgraphicsTypeface): void;
					public setTitleTypeFace(param0: androidgraphicsTypeface): void;
					public reset(): void;
					public setTitleTextColor(param0: number): void;
					public getMonthNameTypeFace(): androidgraphicsTypeface;
					public getPopupEventTimeTextSize(): number;
					public setSelectedCellBorderWidth(param0: number): void;
					public generateCalendarDayCell(): com.telerik.widget.calendar.CalendarDayCell;
					public updateMonthCellStyle(param0: com.telerik.widget.calendar.CalendarMonthCell): void;
					public getDateValues(): androidutilSparseArray<any>;
					public getTitleTextSize(): number;
					public updateDayNameCell(param0: com.telerik.widget.calendar.CalendarDayCell, param1: number): void;
					public setDateTextPosition(param0: number): void;
					public getMonthNameTextSizeCompact(): number;
					public setWeekNumberTextColor(param0: number, param1: number): void;
					public setDateCellPaddingHorizontal(param0: number): void;
					public constructor(param0: com.telerik.widget.calendar.RadCalendarView);
					public setTodayCellTypeFace(param0: androidgraphicsTypeface): void;
					public setDateTextColor(param0: number, param1: number): void;
					public getInlineEventsBackgroundColor(): number;
					public setWeekNumberBackgroundColor(param0: number, param1: number): void;
					public setDayNameBackgroundColor(param0: number): void;
					public generateCalendarMonthCell(): com.telerik.widget.calendar.CalendarMonthCell;
					public getDateTextColorEnabled(): number;
					public getTodayCellBorderWidth(): number;
					public setInlineEventTimeStartTextColor(param0: number): void;
					public setSelectedCellTextColor(param0: number): void;
					public setTitleBackgroundColor(param0: number): void;
					public setInlineEventTimeEndTextColor(param0: number): void;
					public setTodayBackgroundColor(param0: number): void;
					public setDateTypeFace(param0: androidgraphicsTypeface): void;
					public getDateTextColorDisabled(): number;
					public setDayNameTextSize(param0: number): void;
					public updateTitleCellStyle(param0: com.telerik.widget.calendar.CalendarDayCell): void;
					public getTitleTextPosition(): number;
					public setInlineEventsBackgroundColor(param0: number): void;
					public setTodayCellSelectedTextColor(param0: number): void;
					public getInlineEventTimeEndTextColor(): number;
					public getDateTypeFaceYearMode(): androidgraphicsTypeface;
					public getMonthNameTextSize(): number;
					public applyProcedureToAllCells(param0: com.telerik.android.common.Procedure): void;
					public setPopupEventsWindowBackgroundColor(param0: number): void;
					public setMonthCellPaddingHorizontal(param0: number): void;
					public getWeekNumberCell(): com.telerik.widget.calendar.CalendarDayCell;
					public getWeekNumberTextSize(): number;
					public setMonthNameTextPosition(param0: number): void;
					public getDateTextSize(): number;
					public setPopupEventTimeTextSize(param0: number): void;
					public setTodayTypeFace(param0: androidgraphicsTypeface): void;
					public getDayNameTextColorYearModeEnabled(): number;
					public getPopupEventsWindowBackgroundColor(): number;
					public getMonthNameTextColorEnabled(): number;
					public getDateCellPaddingHorizontal(): number;
					public setStyle(param0: com.telerik.widget.calendar.CalendarStyle): void;
					public getTitleCell(param0: number, param1: com.telerik.widget.calendar.CalendarDisplayMode): com.telerik.widget.calendar.CalendarTitleCell;
					public getWeekNumberTextColorEnabled(): number;
					public getStyle(): com.telerik.widget.calendar.CalendarStyle;
					public setSelectedCellBackgroundColor(param0: number): void;
					public setDateValues(param0: androidutilSparseArray<any>): void;
					public setInlineEventTimeStartTextSize(param0: number): void;
					public updateTitle(param0: com.telerik.widget.calendar.CalendarDayCell, param1: number, param2: com.telerik.widget.calendar.CalendarDisplayMode): void;
					public setWeekNumberTextPosition(param0: number): void;
					public setDayNameTextSizeYearMode(param0: number): void;
					public getDateCellBackgroundColorEnabled(): number;
					public setDateTextSize(param0: number): void;
					public getTodayCellBackgroundColor(): number;
					public generateFragment(): com.telerik.widget.calendar.CalendarFragment;
					public setPopupEventTitleTextSize(param0: number): void;
					public getDateCellBackgroundColorDisabled(): number;
					public getSelectedCellTypeFace(): androidgraphicsTypeface;
					public getInlineEventTimeStartTextSize(): number;
					public getMonthNameTextColorDisabled(): number;
					public getDateTextColorYearModeEnabled(): number;
					public getWeekNumberBackgroundColorEnabled(): number;
					public getTodayBackgroundColor(): number;
					public getMonthCellPaddingHorizontal(): number;
					public getDayNameBackgroundColor(): number;
					public getInlineEventTimeStartTextColor(): number;
					public getDayNameTextSize(): number;
					public getWeekNumberTextPosition(): number;
					public getWeekNumberTypeFace(): androidgraphicsTypeface;
					public updateCalendarMonthCell(param0: com.telerik.widget.calendar.CalendarMonthCell, param1: number): void;
					public getDateTextColorYearModeDisabled(): number;
					public setMonthNameTextSizeCompact(param0: number): void;
					public setDayNamePadding(param0: number, param1: number): void;
					public getDayNameTypefaceYearMode(): androidgraphicsTypeface;
					public getTodayCellSelectedTextColor(): number;
					public getPopupEventTitleTextSize(): number;
					public setDateCellBackgroundColor(param0: number, param1: number): void;
					public getTodayCellTextColor(): number;
					public getWeekNumberBackgroundColorDisabled(): number;
					public getDateTextPosition(): number;
					public setTodayCellTextColor(param0: number): void;
					public setTodayCellBorderWidth(param0: number): void;
					public getMonthCell(): com.telerik.widget.calendar.CalendarMonthCell;
					public getMonthCellPaddingVertical(): number;
					public setInlineEventTimeEndTextSize(param0: number): void;
					public applyProcedureToDayNameCells(param0: com.telerik.android.common.Procedure): void;
					public getSelectedCellTextColor(): number;
					public updateMonthNamesCache(): void;
					public getInlineEventTimeEndTextSize(): number;
				}
			}
		}
	}
}

/// <reference path="./java.lang.Class.d.ts" />
/// <reference path="./java.lang.Enum.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export class WeekNumbersDisplayMode extends javalangEnum<any> {
					public static None: com.telerik.widget.calendar.WeekNumbersDisplayMode;
					public static Inline: com.telerik.widget.calendar.WeekNumbersDisplayMode;
					public static Block: com.telerik.widget.calendar.WeekNumbersDisplayMode;
					public static valueOf(param0: string): com.telerik.widget.calendar.WeekNumbersDisplayMode;
					public static valueOf(param0: javalangClass<any>, param1: string): javalangEnum<any>;
					public static values(): native.Array<com.telerik.widget.calendar.WeekNumbersDisplayMode>;
				}
			}
		}
	}
}

import androidgraphicsPaint = android.graphics.Paint;
/// <reference path="./android.graphics.Canvas.d.ts" />
/// <reference path="./android.graphics.Paint.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarCellType.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarRow.d.ts" />
/// <reference path="./com.telerik.widget.calendar.RadCalendarView.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export abstract class CalendarCell extends com.telerik.widget.calendar.CalendarTextElement {
					public cellType: com.telerik.widget.calendar.CalendarCellType;
					public cellToday: boolean;
					public getDate(): number;
					public getBorderColor(): number;
					public borderPaint(): androidgraphicsPaint;
					public setCellType(param0: com.telerik.widget.calendar.CalendarCellType): void;
					public isToday(): boolean;
					public getRow(): com.telerik.widget.calendar.CalendarRow;
					public postRender(param0: androidgraphicsCanvas): void;
					public setLastCellInRow(param0: boolean): void;
					public isDrawBorderInsideCell(): boolean;
					public isWeekend(): boolean;
					public isLastCellInRow(): boolean;
					public getBorderWidth(): number;
					public getCellType(): com.telerik.widget.calendar.CalendarCellType;
					public setDrawBorderInsideCell(param0: boolean): void;
					public updateBorder(): void;
					public setBorderWidth(param0: number): void;
					public setRow(param0: com.telerik.widget.calendar.CalendarRow): void;
					public setAsToday(param0: boolean): void;
					public constructor(param0: com.telerik.widget.calendar.RadCalendarView);
					public setDate(param0: number): void;
					public setBorderColor(param0: number): void;
				}
			}
		}
	}
}

/// <reference path="./com.telerik.widget.calendar.CalendarCell.d.ts" />
/// <reference path="./com.telerik.widget.calendar.RadCalendarView.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export class CellDecorationsLayer extends com.telerik.widget.calendar.decorations.SegmentDecorator {
					public addDecorationForCell(param0: com.telerik.widget.calendar.CalendarCell): void;
					public addDecorationForCell(param0: number, param1: number, param2: number, param3: number, param4: number): void;
					public removeDecorationForCell(param0: number, param1: number, param2: number, param3: number, param4: number): void;
					public constructor(param0: com.telerik.widget.calendar.RadCalendarView);
					public addDecorationForCell(param0: number, param1: com.telerik.widget.calendar.CalendarCell): void;
					public addDecorationForCell(param0: number, param1: number, param2: number, param3: number): void;
				}
			}
		}
	}
}

/// <reference path="./android.graphics.Canvas.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarCell.d.ts" />
/// <reference path="./com.telerik.widget.calendar.RadCalendarView.d.ts" />
/// <reference path="./java.util.Hashtable.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export module decorations {
					export abstract class CellDecorator extends com.telerik.widget.calendar.decorations.Decorator {
						public stroked: boolean;
						public scale: number;
						public cellsForDecoration: javautilHashtable<any, any>;
						public toggleDecorationForCell(param0: com.telerik.widget.calendar.CalendarCell, param1: number): void;
						public constructor(param0: com.telerik.widget.calendar.RadCalendarView);
						public getScale(): number;
						public clearDecorations(): void;
						public setStroked(param0: boolean): void;
						public setScale(param0: number): void;
						public isStroked(): boolean;
						public renderLayer(param0: number, param1: androidgraphicsCanvas): void;
						public renderDecorationForCell(param0: androidgraphicsCanvas, param1: com.telerik.widget.calendar.CalendarCell): void;
						public toggleDecorationForCell(param0: com.telerik.widget.calendar.CalendarCell): void;
					}
				}
			}
		}
	}
}

/// <reference path="./android.graphics.Canvas.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarCell.d.ts" />
/// <reference path="./com.telerik.widget.calendar.RadCalendarView.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export module decorations {
					export class CircularCellDecorator extends com.telerik.widget.calendar.decorations.CellDecorator {
						public constructor(param0: com.telerik.widget.calendar.RadCalendarView);
						public constructor(param0: com.telerik.widget.calendar.RadCalendarView, param1: number);
						public setRadius(radius: number);
						public getRadius(): number;
						public renderDecorationForCell(param0: androidgraphicsCanvas, param1: com.telerik.widget.calendar.CalendarCell): void;
					}
				}
			}
		}
	}
}

/// <reference path="./android.graphics.Canvas.d.ts" />
/// <reference path="./android.graphics.Paint.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarCell.d.ts" />
/// <reference path="./com.telerik.widget.calendar.RadCalendarView.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export module decorations {
					export abstract class Decorator extends javalangObject {
						public paint: androidgraphicsPaint;
						public strokeWidth: number;
						public color: number;
						public owner: com.telerik.widget.calendar.RadCalendarView;
						public getColor(): number;
						public getStrokeWidth(): number;
						public setStrokeWidth(param0: number): void;
						public render(param0: androidgraphicsCanvas): void;
						public toggleDecorationForCell(param0: com.telerik.widget.calendar.CalendarCell, param1: number): void;
						public constructor(param0: com.telerik.widget.calendar.RadCalendarView);
						public clearDecorations(): void;
						public setColor(param0: number): void;
						public renderLayer(param0: number, param1: androidgraphicsCanvas): void;
						public toggleDecorationForCell(param0: com.telerik.widget.calendar.CalendarCell): void;
					}
				}
			}
		}
	}
}

/// <reference path="./android.graphics.Canvas.d.ts" />
/// <reference path="./com.telerik.widget.calendar.CalendarCell.d.ts" />
/// <reference path="./com.telerik.widget.calendar.RadCalendarView.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export module decorations {
					export class SquareCellDecorator extends com.telerik.widget.calendar.decorations.CellDecorator {
						public constructor(param0: com.telerik.widget.calendar.RadCalendarView);
						public constructor(param0: com.telerik.widget.calendar.RadCalendarView, param1: number);
						public setSize(size: number);
						public getSize(): number;
						public renderDecorationForCell(param0: androidgraphicsCanvas, param1: com.telerik.widget.calendar.CalendarCell): void;
					}
				}
			}
		}
	}
}

/// <reference path="./java.lang.Class.d.ts" />
/// <reference path="./java.lang.Enum.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export class CalendarSelectionMode extends javalangEnum<any> {
					public static None: com.telerik.widget.calendar.CalendarSelectionMode;
					public static Single: com.telerik.widget.calendar.CalendarSelectionMode;
					public static Range: com.telerik.widget.calendar.CalendarSelectionMode;
					public static Multiple: com.telerik.widget.calendar.CalendarSelectionMode;
					public static values(): native.Array<com.telerik.widget.calendar.CalendarSelectionMode>;
					public static valueOf(param0: string): com.telerik.widget.calendar.CalendarSelectionMode;
					public static valueOf(param0: javalangClass<any>, param1: string): javalangEnum<any>;
				}
			}
		}
	}
}

/// <reference path="./java.lang.Object.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export class DateRange extends javalangObject {
					public equals(param0: javalangObject): boolean;
					public getEnd(): number;
					public setStart(param0: number): void;
					public setEnd(param0: number): void;
					public hashCode(): number;
					public getStart(): number;
					public constructor(param0: number, param1: number);
				}
			}
		}
	}
}


/// <reference path="./java.lang.Class.d.ts" />
/// <reference path="./java.lang.Enum.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export class ScrollMode extends javalangEnum<any> {
					public static None: com.telerik.widget.calendar.ScrollMode;
					public static Plain: com.telerik.widget.calendar.ScrollMode;
					public static Sticky: com.telerik.widget.calendar.ScrollMode;
					public static Free: com.telerik.widget.calendar.ScrollMode;
					public static Combo: com.telerik.widget.calendar.ScrollMode;
					public static Overlap: com.telerik.widget.calendar.ScrollMode;
					public static Stack: com.telerik.widget.calendar.ScrollMode;
					public static valueOf(param0: string): com.telerik.widget.calendar.ScrollMode;
					public static valueOf(param0: javalangClass<any>, param1: string): javalangEnum<any>;
					public static values(): native.Array<com.telerik.widget.calendar.ScrollMode>;
				}
			}
		}
	}
}

/// <reference path="./java.lang.Class.d.ts" />
/// <reference path="./java.lang.Enum.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module calendar {
				export module events {
					export class EventsDisplayMode extends javalangEnum<any> {
						public static Normal: com.telerik.widget.calendar.events.EventsDisplayMode;
						public static Inline: com.telerik.widget.calendar.events.EventsDisplayMode;
						public static Popup: com.telerik.widget.calendar.events.EventsDisplayMode;
						public static valueOf(param0: string): com.telerik.widget.calendar.events.EventsDisplayMode;
						public static valueOf(param0: javalangClass<any>, param1: string): javalangEnum<any>;
						public static values(): native.Array<com.telerik.widget.calendar.events.EventsDisplayMode>;
					}
				}
			}
		}
	}
}