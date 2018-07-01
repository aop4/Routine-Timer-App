
declare class TKCalendarEvent extends NSObject implements TKCalendarEventProtocol {

	static alloc(): TKCalendarEvent; // inherited from NSObject

	static new(): TKCalendarEvent; // inherited from NSObject

	content: string;

	location: string;

	allDay: boolean; // inherited from TKCalendarEventProtocol

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	endDate: Date; // inherited from TKCalendarEventProtocol

	eventColor: UIColor; // inherited from TKCalendarEventProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	startDate: Date; // inherited from TKCalendarEventProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	title: string; // inherited from TKCalendarEventProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare const enum TKCalendarCellAlignment {

	Left = 1,

	Right = 2,

	Top = 4,

	Bottom = 8,

	HorizontalCenter = 16,

	VerticalCenter = 32
}

declare class TKCalendarCellStyle extends TKStyleNode {

	static alloc(): TKCalendarCellStyle; // inherited from NSObject

    static new(): TKCalendarCellStyle; // inherited from NSObject
    
    init(): TKCalendarCellStyle;

	backgroundColor: UIColor;

	bottomBorderColor: UIColor;

	bottomBorderWidth: number;

	leftBorderColor: UIColor;

	leftBorderWidth: number;

	rightBorderColor: UIColor;

	rightBorderWidth: number;

	shape: TKShape;

	shapeFill: TKFill;

	shapeStroke: TKStroke;

	textAlignment: TKCalendarCellAlignment;

	textColor: UIColor;

	textFont: UIFont;

	textInsets: UIEdgeInsets;

	topBorderColor: UIColor;

	topBorderWidth: number;
}

declare class TKCalendarDayViewPresenter extends UIView implements TKCalendarPresenter {
	readonly dayView: TKCalendarDayView;

	dayNamesHidden: boolean;

	readonly style: TKCalendarDayPresenterStyle;

	titleHidden: boolean;

	weekNumbersHidden: boolean;

	weekendsHidden: boolean;
}

declare class TKCalendarDayCellStyle extends TKCalendarCellStyle {

	static alloc(): TKCalendarDayCellStyle; // inherited from NSObject

    static new(): TKCalendarDayCellStyle; // inherited from NSObject
    
    init(): TKCalendarDayCellStyle;

	allDayEventTextColor: UIColor;

	defaultSelectionColor: UIColor;

	displayEventsAsText: boolean;

	eventAlignment: TKCalendarCellAlignment;

	eventFont: UIFont;

	eventInsets: UIEdgeInsets;

	eventOrientation: TKCalendarDayCellEventOrientation;

	eventShape: TKShape;

	eventSpacing: number;

	eventTextColor: UIColor;

	maxEventsCount: number;

	stretchEvents: boolean;

	useDefaultSelectionStyle: boolean;

	wrapEventText: boolean;
}

declare class TKCalendarYearPresenter extends UIView implements TKCalendarPresenter {

	static alloc(): TKCalendarYearPresenter; // inherited from NSObject

	static appearance(): TKCalendarYearPresenter; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): TKCalendarYearPresenter; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKCalendarYearPresenter; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): TKCalendarYearPresenter; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKCalendarYearPresenter; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): TKCalendarYearPresenter; // inherited from UIAppearance

	static new(): TKCalendarYearPresenter; // inherited from NSObject

	readonly collectionView: UICollectionView;

	columns: number;

	delegate: TKCalendarYearPresenterDelegate;

	monthCellClass: typeof NSObject;

	readonly style: TKCalendarYearPresenterStyle;

	titleViewClass: typeof NSObject;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	dateFromPoint(pt: CGPoint): Date;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	navigateBack(animated: boolean): boolean;

	navigateForward(animated: boolean): boolean;

	navigateToDateAnimated(date: Date, animated: boolean): void;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	update(reset: boolean): void;

	updateState(lastSelected: Date): void;
}

declare class TKCalendarMonthPresenter extends TKCalendarPresenterBase {

	static alloc(): TKCalendarMonthPresenter; // inherited from NSObject

	static appearance(): TKCalendarMonthPresenter; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): TKCalendarMonthPresenter; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKCalendarMonthPresenter; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): TKCalendarMonthPresenter; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKCalendarMonthPresenter; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): TKCalendarMonthPresenter; // inherited from UIAppearance

	static new(): TKCalendarMonthPresenter; // inherited from NSObject

	readonly contentView: UIView;

	dayNamesHidden: boolean;

	equalWeekNumber: boolean;

	headerIsSticky: boolean;

	readonly headerView: UIView;

	inlineEventsView: TKCalendarInlineView;

	inlineEventsViewMode: TKCalendarInlineEventsViewMode;

	readonly owner: TKCalendar;

	readonly style: TKCalendarMonthPresenterStyle;

	titleHidden: boolean;

	weekNumbersHidden: boolean;

	weekendsHidden: boolean;

	cellForDate(date: Date): TKCalendarDayCell;

	createCellWithType(cellType: TKCalendarCellType): TKCalendarCell;

	dateForRowCol(row: number, col: number): Date;

	hideInlineEvents(animated: boolean): void;

	showInlineEventsForCellAnimated(cell: TKCalendarDayCell, animated: boolean): void;

	updateInlineView(): void;
}

declare class TKCalendarWeekPresenter extends TKCalendarMonthPresenter {

	static alloc(): TKCalendarWeekPresenter; // inherited from NSObject

	static appearance(): TKCalendarWeekPresenter; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): TKCalendarWeekPresenter; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKCalendarWeekPresenter; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): TKCalendarWeekPresenter; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKCalendarWeekPresenter; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): TKCalendarWeekPresenter; // inherited from UIAppearance

	static new(): TKCalendarWeekPresenter; // inherited from NSObject
}

declare class TKCalendar extends TKView {

	static alloc(): TKCalendar; // inherited from NSObject

	static appearance(): TKCalendar; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): TKCalendar; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKCalendar; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): TKCalendar; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKCalendar; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): TKCalendar; // inherited from UIAppearance

	static dateWithYearMonthDayWithCalendar(year: number, month: number, day: number, calendar: NSCalendar): Date;

    static isDateEqualToDateWithComponentsWithCalendar(date1: Date, date2: Date, components: NSCalendarUnit, calendar: NSCalendar): boolean;
    
    init(): TKCalendar;

	static new(): TKCalendar; // inherited from NSObject

	allowPinchZoom: boolean;

	calendar: NSCalendar;

	dataSource: TKCalendarDataSource;

	delegate: TKCalendarDelegate;

	readonly displayedDate: Date;

	locale: NSLocale;

	maxDate: Date;

	minDate: Date;

	readonly presenter: TKCalendarPresenter;

	selectedDate: Date;

	selectedDates: NSArray<any>;

	selectedDatesRange: TKDateRange;

	selectionMode: TKCalendarSelectionMode;

	theme: TKTheme;

	viewMode: TKCalendarViewMode;

	clearSelection(): void;

	eventsForDate(date: Date): NSArray<any>;

	navigateBack(animated: boolean): void;

	navigateForward(animated: boolean): void;

	navigateToDateAnimated(date: Date, animated: boolean): void;

	reloadData(): void;
}

interface TKCalendarDataSource extends NSObjectProtocol {

	calendarEventsForDate?(calendar: TKCalendar, date: Date): NSArray<any>;

	calendarEventsFromDateToDateWithCallback?(calendar: TKCalendar, startDate: Date, endDate: Date, eventsCallback: (p1: NSArray<any>) => void): void;
}

declare var TKCalendarDataSource: {

	prototype: TKCalendarDataSource;
};

declare class TKCalendarPresenterBase extends UIView implements TKCalendarPresenter {

	static alloc(): TKCalendarPresenterBase; // inherited from NSObject

	static appearance(): TKCalendarPresenterBase; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): TKCalendarPresenterBase; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKCalendarPresenterBase; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): TKCalendarPresenterBase; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKCalendarPresenterBase; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): TKCalendarPresenterBase; // inherited from UIAppearance

	static new(): TKCalendarPresenterBase; // inherited from NSObject

	delegate: TKCalendarPresenterDelegate;

	panGestureSensitivity: number;

	transitionDuration: number;

	transitionIsReverse: boolean;

	transitionIsVertical: boolean;

	transitionMode: TKCalendarTransitionMode;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	dateFromPoint(pt: CGPoint): Date;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	navigateBack(animated: boolean): boolean;

	navigateForward(animated: boolean): boolean;

	navigateToDateAnimated(date: Date, animated: boolean): void;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	update(reset: boolean): void;

	updateState(lastSelected: Date): void;
}

declare const enum TKCalendarSelectionMode {

	None = 0,

	Single = 1,

	Multiple = 2,

	Range = 3
}

declare const enum TKCalendarTransitionMode {

	None = 0,

	Flip = 1,

	Fold = 2,

	Float = 3,

	Card = 4,

	Rotate = 5,

	Scroll = 6
}

declare const enum TKCalendarViewMode {

	Week = 0,

	Month = 1,

	MonthNames = 2,

	Year = 3,

	YearNumbers = 4,

	Flow = 5,

	Day = 6
}

declare const enum TKCalendarInlineEventsViewMode {

	None = 0,

	Inline = 1,

	Popover = 2
}

declare class TKDateRange extends NSObject {

	static alloc(): TKDateRange; // inherited from NSObject

	static new(): TKDateRange; // inherited from NSObject

	endDate: Date;

	readonly isNormalized: boolean;

	startDate: Date;

	constructor(o: { start: Date; end: Date; });

	containsDate(date: Date): boolean;

	initWithStartEnd(startDate: Date, endDate: Date): this;

	normalize(): void;
}

interface TKCalendarMonthPresenterDelegate extends TKCalendarPresenterDelegate {

	monthPresenterInlineEventSelected?(presenter: TKCalendarMonthPresenter, event: TKCalendarEventProtocol): void;

	monthPresenterInlineEventsViewDidHideForCell?(presenter: TKCalendarMonthPresenter, cell: TKCalendarDayCell): void;

	monthPresenterInlineEventsViewDidShowForCell?(presenter: TKCalendarMonthPresenter, cell: TKCalendarDayCell): void;

	monthPresenterUpdateVisualsForInlineEventCell?(presenter: TKCalendarMonthPresenter, cell: TKCalendarInlineViewTableViewCell): void;
}

declare var TKCalendarMonthPresenterDelegate: {

	prototype: TKCalendarMonthPresenterDelegate;
};

declare class TKCalendarInlineViewTableViewCell extends UITableViewCell {

	static alloc(): TKCalendarInlineViewTableViewCell; // inherited from NSObject

	static appearance(): TKCalendarInlineViewTableViewCell; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): TKCalendarInlineViewTableViewCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKCalendarInlineViewTableViewCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): TKCalendarInlineViewTableViewCell; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKCalendarInlineViewTableViewCell; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): TKCalendarInlineViewTableViewCell; // inherited from UIAppearance

	static new(): TKCalendarInlineViewTableViewCell; // inherited from NSObject

	readonly style: TKCalendarInlineViewTableViewCellStyle;

	attachWithCellEventIndex(cell: TKCalendarDayCell, index: number): void;

	updateTextForEventWithCell(event: TKCalendarEventProtocol, cell: TKCalendarDayCell): void;
}

interface TKCalendarDayViewDelegate extends NSObjectProtocol {
	dayViewDidSelectEvent?(dayView: TKCalendarDayView, event: TKCalendarEventProtocol): void;
}

declare var TKCalendarDayViewDelegate: {
	prototype: TKCalendarDayViewDelegate;
};

interface TKCalendarDayViewDelegate extends NSObjectProtocol {
	dayViewDidSelectEvent?(dayView: TKCalendarDayView, event: TKCalendarEventProtocol): void;
}

declare var TKCalendarDayViewDelegate: {
	prototype: TKCalendarDayViewDelegate;
};

interface TKCalendarEventProtocol extends NSObjectProtocol {

	allDay: boolean;

	endDate: Date;

	eventColor: UIColor;

	startDate: Date;

	title: string;
}
declare var TKCalendarEventProtocol: {
	prototype: TKCalendarEventProtocol;
};

declare class TKCalendarDayView extends UIView {
	readonly eventsView: TKCalendarDayViewEventsView;
	readonly allDayEventsView: TKCalendarDayViewAllDayEventsView;
	delegate: TKCalendarDayViewDelegate;
}

interface TKCalendarDelegate extends NSObjectProtocol {

	calendarDidChangedViewModeFromTo?(calendar: TKCalendar, previousViewMode: TKCalendarViewMode, viewMode: TKCalendarViewMode): void;

	calendarDidDeselectedDate?(calendar: TKCalendar, date: Date): void;

	calendarDidNavigateToDate?(calendar: TKCalendar, date: Date): void;

	calendarDidSelectDate?(calendar: TKCalendar, date: Date): void;

	calendarShapeForEvent?(calendar: TKCalendar, event: TKCalendarEventProtocol): TKShape;

	calendarShouldSelectDate?(calendar: TKCalendar, date: Date): boolean;

	calendarTextForEvent?(calendar: TKCalendar, event: TKCalendarEventProtocol): string;

	calendarUpdateVisualsForCell?(calendar: TKCalendar, cell: TKCalendarCell): void;

	calendarViewForCellOfKind?(calendar: TKCalendar, cellType: TKCalendarCellType): TKCalendarCell;

	calendarWillNavigateToDate?(calendar: TKCalendar, date: Date): void;
}

declare var TKCalendarDelegate: {
	prototype: TKCalendarDelegate;
};

declare class TKCalendarDayCell extends TKCalendarCell {

	static alloc(): TKCalendarDayCell; // inherited from NSObject

	static appearance(): TKCalendarDayCell; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): TKCalendarDayCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKCalendarDayCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): TKCalendarDayCell; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKCalendarDayCell; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): TKCalendarDayCell; // inherited from UIAppearance

	static new(): TKCalendarDayCell; // inherited from NSObject

	readonly date: Date;

	readonly events: NSArray<any>;

	state: TKCalendarDayState;

	attachWithCalendarWithDate(owner: TKCalendar, date: Date): void;

	drawEventsRect(context: any, rect: CGRect): void;

	stateForDate(date: Date): TKCalendarDayState;

	style(): TKCalendarDayCellStyle;

	textAttributesForEvent(event: TKCalendarEventProtocol): NSDictionary<any, any>;

	textForEvent(event: TKCalendarEventProtocol): string;
}

declare class TKCalendarCell extends UIView {

	static alloc(): TKCalendarCell; // inherited from NSObject

	static appearance(): TKCalendarCell; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): TKCalendarCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKCalendarCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): TKCalendarCell; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKCalendarCell; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): TKCalendarCell; // inherited from UIAppearance

	static new(): TKCalendarCell; // inherited from NSObject

	readonly label: UILabel;

	owner: TKCalendar;

	applyStyleForState(state: number): void;

	style(): TKCalendarCellStyle;

	updateVisuals(): void;
}

declare class TKCalendarWeekNumberCell extends TKCalendarCell {

	static alloc(): TKCalendarWeekNumberCell; // inherited from NSObject

	static appearance(): TKCalendarWeekNumberCell; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): TKCalendarWeekNumberCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKCalendarWeekNumberCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): TKCalendarWeekNumberCell; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKCalendarWeekNumberCell; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): TKCalendarWeekNumberCell; // inherited from UIAppearance

	static new(): TKCalendarWeekNumberCell; // inherited from NSObject

	attachWithCalendarWithWeekNumber(owner: TKCalendar, weekNumber: number): void;
}

declare class TKCalendarDayNameCell extends TKCalendarCell {

	static alloc(): TKCalendarDayNameCell; // inherited from NSObject

	static appearance(): TKCalendarDayNameCell; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): TKCalendarDayNameCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKCalendarDayNameCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): TKCalendarDayNameCell; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKCalendarDayNameCell; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): TKCalendarDayNameCell; // inherited from UIAppearance

	static new(): TKCalendarDayNameCell; // inherited from NSObject

	attachWithCalendarWithDayOffset(owner: TKCalendar, index: number): void;
}

declare class TKCalendarTitleCell extends TKCalendarCell {

	static alloc(): TKCalendarTitleCell; // inherited from NSObject

	static appearance(): TKCalendarTitleCell; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): TKCalendarTitleCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKCalendarTitleCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): TKCalendarTitleCell; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKCalendarTitleCell; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): TKCalendarTitleCell; // inherited from UIAppearance

	static new(): TKCalendarTitleCell; // inherited from NSObject

	attachWithCalendarWithText(owner: TKCalendar, text: string): void;
}

declare class TKCalendarMonthNameCell extends TKCalendarCell {

	static alloc(): TKCalendarMonthNameCell; // inherited from NSObject

	static appearance(): TKCalendarMonthNameCell; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): TKCalendarMonthNameCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): TKCalendarMonthNameCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): TKCalendarMonthNameCell; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): TKCalendarMonthNameCell; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): TKCalendarMonthNameCell; // inherited from UIAppearance

	static new(): TKCalendarMonthNameCell; // inherited from NSObject

	readonly date: Date;

	state: TKCalendarMonthNameState;

	attachWithCalendarWithDate(owner: TKCalendar, date: Date): void;
}

declare const enum TKCalendarDayState {

	Today = 1,

	Weekend = 2,

	CurrentMonth = 4,

	CurrentYear = 8,

	Selected = 16,

	FirstInSelection = 32,

	LastInSelection = 64,

	MidInSelection = 128,

	Disabled = 256
}

declare class TKPredefinedShape extends TKShape {

	static alloc(): TKPredefinedShape; // inherited from NSObject

	static new(): TKPredefinedShape; // inherited from NSObject

	static shapeWithTypeAndSize(type: TKShapeType, size: CGSize): TKPredefinedShape;

	readonly type: TKShapeType;

	constructor(o: { type: TKShapeType; andSize: CGSize; });

	initWithTypeAndSize(type: TKShapeType, size: CGSize): this;
}

declare const enum TKShapeType {

	None = 0,

	Square = 1,

	Circle = 2,

	TriangleUp = 3,

	TriangleDown = 4,

	Rhombus = 5,

	Pentagon = 6,

	Hexagon = 7,

	Star = 8,

	Heart = 9
}

declare class TKSolidFill extends TKFill {

	static alloc(): TKSolidFill; // inherited from NSObject

	static new(): TKSolidFill; // inherited from NSObject

	static solidFillWithColor(color: UIColor): TKSolidFill;

	static solidFillWithColorCornerRadius(color: UIColor, cornerRadius: number): TKSolidFill;

	color: UIColor;

	constructor(o: { color: UIColor; });

	constructor(o: { color: UIColor; cornerRadius: number; });

	initWithColor(color: UIColor): this;

	initWithColorCornerRadius(color: UIColor, cornerRadius: number): this;
}