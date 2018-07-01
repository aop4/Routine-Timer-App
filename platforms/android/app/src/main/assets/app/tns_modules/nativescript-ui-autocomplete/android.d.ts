/// <reference path="./node_modules/nativescript-ui-core/android.d.ts" />

import androidsupportv7widgetRecyclerViewAdapter = android.support.v7.widget.RecyclerView.Adapter;
import javalangInteger = java.lang.Integer;
import androidsupportv7widgetRecyclerViewViewHolder = android.support.v7.widget.RecyclerView.ViewHolder;
import androidviewViewGroup = android.view.ViewGroup;
import androidviewViewOnClickListener = android.view.View.OnClickListener;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.view.View.d.ts" />
/// <reference path="./android.view.ViewGroup.d.ts" />
/// <reference path="./com.telerik.android.common.Function2Async.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.SuggestionItemViewHolder.d.ts" />
/// <reference path="./java.lang.Integer.d.ts" />
/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.ArrayList.d.ts" />
/// <reference path="./java.util.List.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class AutoCompleteAdapter extends androidsupportv7widgetRecyclerViewAdapter implements com.telerik.widget.autocomplete.AutoCompleteAdapterBase {
					public setFilteredList(param0: javautilArrayList<javalangObject>): void;
					public onCreateViewHolder(param0: androidviewViewGroup, param1: number): com.telerik.widget.autocomplete.SuggestionItemViewHolder;
					public onBindViewHolder(param0: com.telerik.widget.autocomplete.SuggestionItemViewHolder, param1: number): void;
					public getListener(): androidviewViewOnClickListener;
					public setListener(param0: androidviewViewOnClickListener): void;
					public setCompletionMode(param0: com.telerik.android.common.Function2Async): void;
					public onCreateViewHolder(param0: androidviewViewGroup, param1: number): androidsupportv7widgetRecyclerViewViewHolder;
					public getHighlightColor(): number;
					public onBindViewHolder(param0: androidsupportv7widgetRecyclerViewViewHolder, param1: number): void;
					public getInitialListOfItems(): javautilList<javalangObject>;
					public constructor();
					public constructor(param0: androidcontentContext, param1: javautilList<javalangObject>, param2: javalangInteger);
					public getFilteredList(): javautilArrayList<javalangObject>;
					public onBindViewHolder(param0: androidsupportv7widgetRecyclerViewViewHolder, param1: number, param2: javautilList<javalangObject>): void;
					public getCompletionMode(): com.telerik.android.common.Function2Async;
					public getHighlightingEnabled(): boolean;
					public setHighlightingEnabled(param0: boolean): void;
					public setHighlightColor(param0: number): void;
					public getItems(): javautilList<javalangObject>;
					public filter(param0: string): void;
					public getItem(param0: number): javalangObject;
					public attachOnClickListener(param0: androidviewView): void;
					public getFilteredList(): javautilList<javalangObject>;
					public setInitialListOfItems(param0: javautilList<javalangObject>): void;
					public getItemCount(): number;
					public constructor(param0: androidcontentContext, param1: javautilList<javalangObject>, param2: com.telerik.widget.autocomplete.SuggestionItemViewHolder);
					public setItems(param0: javautilList<any>): void;
				}
			}
		}
	}
}

/// <reference path="./com.telerik.android.common.Function2Async.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.List.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class AutoCompleteAdapterBase {
					/**
					 * Constructs a new instance of the com.telerik.widget.autocomplete.AutoCompleteAdapterBase interface with the provided implementation.
					 */
					public constructor(implementation: {
						getCompletionMode(): com.telerik.android.common.Function2Async;
						setCompletionMode(param0: com.telerik.android.common.Function2Async): void;
						getFilteredList(): javautilList<javalangObject>;
						filter(param0: string): void;
					});
					public getFilteredList(): javautilList<javalangObject>;
					public filter(param0: string): void;
					public setCompletionMode(param0: com.telerik.android.common.Function2Async): void;
					public getCompletionMode(): com.telerik.android.common.Function2Async;
				}
			}
		}
	}
}

declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class BuildConfig {
					public static DEBUG: boolean;
					public static APPLICATION_ID: string;
					public static BUILD_TYPE: string;
					public static FLAVOR: string;
					public static VERSION_CODE: number;
					public static VERSION_NAME: string;
					public constructor();
				}
			}
		}
	}
}

/// <reference path="./com.telerik.android.common.Function2Async.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class CompletionMode {
					public static STARTS_WITH: com.telerik.android.common.Function2Async;
					public static CONTAINS: com.telerik.android.common.Function2Async;
					public constructor();
				}
			}
		}
	}
}

/// <reference path="./com.telerik.widget.autocomplete.RadAutoCompleteTextView.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class DidAutoCompleteListener {
					/**
					 * Constructs a new instance of the com.telerik.widget.autocomplete.DidAutoCompleteListener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onDidAutoComplete(param0: com.telerik.widget.autocomplete.RadAutoCompleteTextView, param1: string): void;
					});
					public onDidAutoComplete(param0: com.telerik.widget.autocomplete.RadAutoCompleteTextView, param1: string): void;
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class DisplayMode {
					public static PLAIN: com.telerik.widget.autocomplete.DisplayMode;
					public static TOKENS: com.telerik.widget.autocomplete.DisplayMode;
					public static values(): native.Array<com.telerik.widget.autocomplete.DisplayMode>;
					public static valueOf(param0: string): com.telerik.widget.autocomplete.DisplayMode;
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class LayoutMode {
					public static HORIZONTAL: com.telerik.widget.autocomplete.LayoutMode;
					public static WRAP: com.telerik.widget.autocomplete.LayoutMode;
					public static values(): native.Array<com.telerik.widget.autocomplete.LayoutMode>;
					public static valueOf(param0: string): com.telerik.widget.autocomplete.LayoutMode;
				}
			}
		}
	}
}

import androidutilAttributeSet = android.util.AttributeSet;
import androidwidgetProgressBar = android.widget.ProgressBar;
import androidwidgetEditText = android.widget.EditText;
import androidsupportv7widgetRecyclerView = android.support.v7.widget.RecyclerView;
import androidwidgetPopupWindow = android.widget.PopupWindow;
import androidgraphicsdrawableDrawable = android.graphics.drawable.Drawable;
import androidosParcelable = android.os.Parcelable;
import androidosParcel = android.os.Parcel;
import androidosParcelableCreator = android.os.Parcelable.Creator;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.graphics.drawable.Drawable.d.ts" />
/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./android.os.Parcelable.d.ts" />
/// <reference path="./android.support.v7.widget.RecyclerView.d.ts" />
/// <reference path="./android.util.AttributeSet.d.ts" />
/// <reference path="./android.view.View.d.ts" />
/// <reference path="./android.widget.EditText.d.ts" />
/// <reference path="./android.widget.PopupWindow.d.ts" />
/// <reference path="./android.widget.ProgressBar.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.AutoCompleteAdapter.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.DidAutoCompleteListener.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.DisplayMode.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.LayoutMode.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.ShowSuggestionListListener.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.SuggestMode.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.TokenAdapter.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.TokenAddedListener.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.TokenDeselectedListener.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.TokenModel.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.TokenRemovedListener.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.TokenSelectedListener.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.TokenView.d.ts" />
/// <reference path="./java.lang.CharSequence.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.ArrayList.d.ts" />
/// <reference path="./java.util.List.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class RadAutoCompleteTextView {
					public getAutocompleteHint(): string;
					public setSuggestionViewAlwaysVisible(param0: boolean): void;
					public getUsingAsyncData(): boolean;
					public getAppendTextColor(): number;
					public setSuggestMode(param0: com.telerik.widget.autocomplete.SuggestMode): void;
					public addShowSuggestionListListener(param0: com.telerik.widget.autocomplete.ShowSuggestionListListener): void;
					public onAttachedToWindow(): void;
					public setCloseButtonView(param0: androidviewView): void;
					public resolveAfterFilter(param0: string, param1: boolean): void;
					public setText(param0: string): void;
					public getSuggestionViewAlwaysVisible(): boolean;
					public getMinimumCharactersToSearch(): number;
					public onSaveInstanceState(): androidosParcelable;
					public addTextChangedListener(param0: com.telerik.widget.autocomplete.TextChangedListener): void;
					public addTokenSelectedListener(param0: com.telerik.widget.autocomplete.TokenSelectedListener): void;
					public setPadding(param0: number, param1: number, param2: number, param3: number): void;
					public setSuggestionViewHeight(param0: number): void;
					public getTextField(): androidwidgetEditText;
					public setAdapter(param0: com.telerik.widget.autocomplete.AutoCompleteAdapter): void;
					public getTokens(): javautilList<javalangObject>;
					public getTokensLayoutMode(): com.telerik.widget.autocomplete.LayoutMode;
					public getText(): string;
					public setTokenAdapter(param0: com.telerik.widget.autocomplete.TokenAdapter): void;
					public setAutocompleteHint(param0: string): void;
					public onGlobalLayout(): void;
					public setReadOnly(param0: boolean): void;
					public getAdapter(): com.telerik.widget.autocomplete.AutoCompleteAdapter;
					public addToken(param0: com.telerik.widget.autocomplete.TokenView): void;
					public insertTokenAt(param0: number, param1: com.telerik.widget.autocomplete.TokenView): void;
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet);
					public setDisplayMode(param0: com.telerik.widget.autocomplete.DisplayMode): void;
					public setMaximumTokensCount(param0: number): void;
					public getCloseButtonView(): androidviewView;
					public setAppendTextColor(param0: number): void;
					public getMaximumTokensCount(): number;
					public removeTokenSelectedListener(param0: com.telerik.widget.autocomplete.TokenSelectedListener): void;
					public removeShowSuggestionListListener(param0: com.telerik.widget.autocomplete.ShowSuggestionListListener): void;
					public setUsingAsyncData(param0: boolean): void;
					public setMaximumWrapViewHeight(param0: number): void;
					public setAllowCustomTokens(param0: boolean): void;
					public addTokenDeselectedListener(param0: com.telerik.widget.autocomplete.TokenDeselectedListener): void;
					public getMaximumWrapViewHeight(): number;
					public removeTokenRemovedListener(param0: com.telerik.widget.autocomplete.TokenRemovedListener): void;
					public getSuggestMode(): com.telerik.widget.autocomplete.SuggestMode;
					public addTokenView(param0: com.telerik.widget.autocomplete.TokenModel): void;
					public onRestoreInstanceState(param0: androidosParcelable): void;
					public setAutocompleteIcon(param0: androidgraphicsdrawableDrawable): void;
					public getTokenAdapter(): com.telerik.widget.autocomplete.TokenAdapter;
					public addFocusables(param0: javautilArrayList<javalangObject>, param1: number, param2: number): void;
					public setMinimumCharactersToSearch(param0: number): void;
					public removeAllTokens(): void;
					public addTokenRemovedListener(param0: com.telerik.widget.autocomplete.TokenRemovedListener): void;
					public getPopUp(): androidwidgetPopupWindow;
					public getProgressBar(): androidwidgetProgressBar;
					public onDetachedFromWindow(): void;
					public addTokenAddedListener(param0: com.telerik.widget.autocomplete.TokenAddedListener): void;
					public removeTokenDeselectedListener(param0: com.telerik.widget.autocomplete.TokenDeselectedListener): void;
					public addDidAutoCompleteListener(param0: com.telerik.widget.autocomplete.DidAutoCompleteListener): void;
					public setAllowTokenizingWithSymbol(param0: boolean): void;
					public getSuggestionViewHeight(): number;
					public getSuggestionView(): androidsupportv7widgetRecyclerView;
					public setShowCloseButton(param0: boolean): void;
					public getDisplayMode(): com.telerik.widget.autocomplete.DisplayMode;
					public getTokenAt(param0: number): com.telerik.widget.autocomplete.TokenView;
					public removeTokenAddedListener(param0: com.telerik.widget.autocomplete.TokenAddedListener): void;
					public isShowCloseButton(): boolean;
					public removeTokenAt(param0: number): void;
					public setTokensLayoutMode(param0: com.telerik.widget.autocomplete.LayoutMode): void;
					public addItemFromTokenModel(param0: com.telerik.widget.autocomplete.TokenModel): void;
					public resetAutocomplete(): void;
					public onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
					public removeToken(param0: com.telerik.widget.autocomplete.TokenView): void;
					public getAllowCustomTokens(): boolean;
					public constructor(param0: androidcontentContext);
					public removeDidAutoCompleteListener(param0: com.telerik.widget.autocomplete.DidAutoCompleteListener): void;
					public getAllowTokenizingWitgSymbol(): boolean;
					public setProgressBar(param0: androidwidgetProgressBar): void;
				}
				export module RadAutoCompleteTextView {
					export class SavedState {
						public static CREATOR: androidosParcelableCreator<javalangObject>;
						public writeToParcel(param0: androidosParcel, param1: number): void;
					}
				}
			}
		}
	}
}

/// <reference path="./com.telerik.widget.autocomplete.RadAutoCompleteTextView.d.ts" />
/// <reference path="./java.util.List.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class ShowSuggestionListListener {
					/**
					 * Constructs a new instance of the com.telerik.widget.autocomplete.ShowSuggestionListListener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onShowSuggestionList(param0: com.telerik.widget.autocomplete.RadAutoCompleteTextView, param1: javautilList<javalangObject>): void;
					});
					public onShowSuggestionList(param0: com.telerik.widget.autocomplete.RadAutoCompleteTextView, param1: javautilList<javalangObject>): void;
				}
			}
		}
	}
}

/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class SuggestMode {
					public static SUGGEST: com.telerik.widget.autocomplete.SuggestMode;
					public static APPEND: com.telerik.widget.autocomplete.SuggestMode;
					public static SUGGEST_APPEND: com.telerik.widget.autocomplete.SuggestMode;
					public static values(): native.Array<com.telerik.widget.autocomplete.SuggestMode>;
					public static valueOf(param0: string): com.telerik.widget.autocomplete.SuggestMode;
				}
			}
		}
	}
}

import androidwidgetImageView = android.widget.ImageView;
import androidwidgetTextView = android.widget.TextView;
/// <reference path="./android.view.View.d.ts" />
/// <reference path="./android.widget.ImageView.d.ts" />
/// <reference path="./android.widget.TextView.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class SuggestionItemViewHolder extends androidsupportv7widgetRecyclerViewViewHolder {
					public itemImage: androidwidgetImageView;
					public textView: androidwidgetTextView;
					public constructor(param0: androidviewView);
				}
			}
		}
	}
}

/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.TokenModel.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.TokenView.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class TokenAdapter {
					public constructor(param0: androidcontentContext);
					public getViewForTokenObject(param0: com.telerik.widget.autocomplete.TokenModel): com.telerik.widget.autocomplete.TokenView;
				}
			}
		}
	}
}

/// <reference path="./com.telerik.widget.autocomplete.TokenModel.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.TokenView.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class TokenAdapterBase {
					/**
					 * Constructs a new instance of the com.telerik.widget.autocomplete.TokenAdapterBase interface with the provided implementation.
					 */
					public constructor(implementation: {
						getViewForTokenObject(param0: com.telerik.widget.autocomplete.TokenModel): com.telerik.widget.autocomplete.TokenView;
					});
					public getViewForTokenObject(param0: com.telerik.widget.autocomplete.TokenModel): com.telerik.widget.autocomplete.TokenView;
				}
			}
		}
	}
}

/// <reference path="./com.telerik.widget.autocomplete.RadAutoCompleteTextView.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.TokenModel.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class TokenAddedListener {
					/**
					 * Constructs a new instance of the com.telerik.widget.autocomplete.TokenAddedListener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onTokenAdded(param0: com.telerik.widget.autocomplete.RadAutoCompleteTextView, param1: com.telerik.widget.autocomplete.TokenModel): void;
					});
					public onTokenAdded(param0: com.telerik.widget.autocomplete.RadAutoCompleteTextView, param1: com.telerik.widget.autocomplete.TokenModel): void;
				}
			}
		}
	}
}

/// <reference path="./com.telerik.widget.autocomplete.RadAutoCompleteTextView.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.TokenModel.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class TokenDeselectedListener {
					/**
					 * Constructs a new instance of the com.telerik.widget.autocomplete.TokenDeselectedListener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onTokenDeselected(param0: com.telerik.widget.autocomplete.RadAutoCompleteTextView, param1: com.telerik.widget.autocomplete.TokenModel): void;
					});
					public onTokenDeselected(param0: com.telerik.widget.autocomplete.RadAutoCompleteTextView, param1: com.telerik.widget.autocomplete.TokenModel): void;
				}
			}
		}
	}
}

/// <reference path="./android.graphics.drawable.Drawable.d.ts" />
/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class TokenModel {
					public static CREATOR: androidosParcelableCreator<javalangObject>;
					public constructor(param0: string, param1: androidgraphicsdrawableDrawable);
					public toString(): string;
					public setText(param0: string): void;
					public getText(): string;
					public constructor(param0: androidosParcel);
					public describeContents(): number;
					public getNsImageName(): string;
					public getImage(): androidgraphicsdrawableDrawable;
					public setNsImageName(param0: string): void;
					public setImage(param0: androidgraphicsdrawableDrawable): void;
					public writeToParcel(param0: androidosParcel, param1: number): void;
				}
			}
		}
	}
}

/// <reference path="./com.telerik.widget.autocomplete.RadAutoCompleteTextView.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.TokenModel.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class TokenRemovedListener {
					/**
					 * Constructs a new instance of the com.telerik.widget.autocomplete.TokenRemovedListener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onTokenRemoved(param0: com.telerik.widget.autocomplete.RadAutoCompleteTextView, param1: com.telerik.widget.autocomplete.TokenModel): void;
					});
					public onTokenRemoved(param0: com.telerik.widget.autocomplete.RadAutoCompleteTextView, param1: com.telerik.widget.autocomplete.TokenModel): void;
				}
			}
		}
	}
}

/// <reference path="./com.telerik.widget.autocomplete.RadAutoCompleteTextView.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.TokenModel.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class TextChangedListener {
					/**
					 * Constructs a new instance of the com.telerik.widget.autocomplete.TokenSelectedListener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onTextChanged(param0: com.telerik.widget.autocomplete.RadAutoCompleteTextView, param1: string): void;
					});
					public onTextChanged(param0: com.telerik.widget.autocomplete.RadAutoCompleteTextView, param1: string): void;
				}
			}
		}
	}
}

/// <reference path="./com.telerik.widget.autocomplete.RadAutoCompleteTextView.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.TokenModel.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class TokenSelectedListener {
					/**
					 * Constructs a new instance of the com.telerik.widget.autocomplete.TokenSelectedListener interface with the provided implementation.
					 */
					public constructor(implementation: {
						onTokenSelected(param0: com.telerik.widget.autocomplete.RadAutoCompleteTextView, param1: com.telerik.widget.autocomplete.TokenModel): void;
					});
					public onTokenSelected(param0: com.telerik.widget.autocomplete.RadAutoCompleteTextView, param1: com.telerik.widget.autocomplete.TokenModel): void;
				}
			}
		}
	}
}

/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.util.AttributeSet.d.ts" />
/// <reference path="./android.widget.ImageView.d.ts" />
/// <reference path="./com.telerik.widget.autocomplete.TokenModel.d.ts" />
declare module com {
	export module telerik {
		export module widget {
			export module autocomplete {
				export class TokenView {
					public deleteImage(): androidwidgetImageView;
					public getModel(): com.telerik.widget.autocomplete.TokenModel;
					public setSelected(param0: boolean): void;
					public constructor(param0: androidcontentContext, param1: androidutilAttributeSet);
					public constructor(param0: androidcontentContext);
					public setModel(param0: com.telerik.widget.autocomplete.TokenModel): void;
				}
			}
		}
	}
}

//------- android-support-v7-recyclerview classes -------//
import javalangRunnable = java.lang.Runnable;
/// <reference path="./android.content.Context.d.ts" />
/// <reference path="./android.graphics.Canvas.d.ts" />
/// <reference path="./android.graphics.PointF.d.ts" />
/// <reference path="./android.graphics.Rect.d.ts" />
/// <reference path="./android.os.Bundle.d.ts" />
/// <reference path="./android.os.Parcel.d.ts" />
/// <reference path="./android.os.Parcelable.d.ts" />
/// <reference path="./android.support.v4.view.accessibility.AccessibilityNodeInfoCompat.d.ts" />
/// <reference path="./android.support.v7.widget.RecyclerView.d.ts" />
/// <reference path="./android.support.v7.widget.RecyclerViewAccessibilityDelegate.d.ts" />
/// <reference path="./android.util.AttributeSet.d.ts" />
/// <reference path="./android.util.SparseArray.d.ts" />
/// <reference path="./android.view.MotionEvent.d.ts" />
/// <reference path="./android.view.View.d.ts" />
/// <reference path="./android.view.ViewGroup.d.ts" />
/// <reference path="./android.view.accessibility.AccessibilityEvent.d.ts" />
/// <reference path="./android.view.animation.Interpolator.d.ts" />
/// <reference path="./java.lang.Object.d.ts" />
/// <reference path="./java.lang.Runnable.d.ts" />
/// <reference path="./java.lang.String.d.ts" />
/// <reference path="./java.util.ArrayList.d.ts" />
/// <reference path="./java.util.List.d.ts" />
declare module android {
	export module support {
		export module v7 {
			export module widget {
				export class RecyclerView {
					public static HORIZONTAL: number;
					public static VERTICAL: number;
					public static NO_POSITION: number;
					public static NO_ID: number;
					public static INVALID_TYPE: number;
					public static TOUCH_SLOP_DEFAULT: number;
					public static TOUCH_SLOP_PAGING: number;
					public static SCROLL_STATE_IDLE: number;
					public static SCROLL_STATE_DRAGGING: number;
					public static SCROLL_STATE_SETTLING: number;
					public onDraw(param0: android.graphics.Canvas): void;
					public getChildDrawingOrder(param0: number, param1: number): number;
					public addItemDecoration(param0: android.support.v7.widget.RecyclerView.ItemDecoration): void;
					public getChildAdapterPosition(param0: android.view.View): number;
					public scrollToPosition(param0: number): void;
					public removeItemDecoration(param0: android.support.v7.widget.RecyclerView.ItemDecoration): void;
					public onChildDetachedFromWindow(param0: android.view.View): void;
					public stopNestedScroll(): void;
					public computeHorizontalScrollExtent(): number;
					public getMinFlingVelocity(): number;
					public setAdapter(param0: android.support.v7.widget.RecyclerView.Adapter): void;
					public getAdapter(): android.support.v7.widget.RecyclerView.Adapter;
					public removeOnChildAttachStateChangeListener(param0: android.support.v7.widget.RecyclerView.OnChildAttachStateChangeListener): void;
					public onTouchEvent(param0: android.view.MotionEvent): boolean;
					public setRecycledViewPool(param0: android.support.v7.widget.RecyclerView.RecycledViewPool): void;
					public offsetChildrenHorizontal(param0: number): void;
					public isComputingLayout(): boolean;
					public addItemDecoration(param0: android.support.v7.widget.RecyclerView.ItemDecoration, param1: number): void;
					public onChildAttachedToWindow(param0: android.view.View): void;
					public removeDetachedView(param0: android.view.View, param1: boolean): void;
					public offsetChildrenVertical(param0: number): void;
					public dispatchNestedFling(param0: number, param1: number, param2: boolean): boolean;
					public setScrollingTouchSlop(param0: number): void;
					public scrollTo(param0: number, param1: number): void;
					public onGenericMotionEvent(param0: android.view.MotionEvent): boolean;
					public getRecycledViewPool(): android.support.v7.widget.RecyclerView.RecycledViewPool;
					public onInterceptTouchEvent(param0: android.view.MotionEvent): boolean;
					public removeOnItemTouchListener(param0: android.support.v7.widget.RecyclerView.OnItemTouchListener): void;
					public invalidateItemDecorations(): void;
					public isAnimating(): boolean;
					public getChildItemId(param0: android.view.View): number;
					public findViewHolderForLayoutPosition(param0: number): android.support.v7.widget.RecyclerView.ViewHolder;
					public requestChildRectangleOnScreen(param0: android.view.View, param1: android.graphics.Rect, param2: boolean): boolean;
					public getChildPosition(param0: android.view.View): number;
					public getChildViewHolder(param0: android.view.View): android.support.v7.widget.RecyclerView.ViewHolder;
					public addFocusables(param0: javautilArrayList<javalangObject>, param1: number, param2: number): void;
					public setNestedScrollingEnabled(param0: boolean): void;
					public generateDefaultLayoutParams(): android.view.ViewGroup.LayoutParams;
					public stopScroll(): void;
					public requestLayout(): void;
					public hasPendingAdapterUpdates(): boolean;
					public onDetachedFromWindow(): void;
					public onMeasure(param0: number, param1: number): void;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet, param2: number);
					public getItemAnimator(): android.support.v7.widget.RecyclerView.ItemAnimator;
					public computeVerticalScrollRange(): number;
					public onRestoreInstanceState(param0: android.os.Parcelable): void;
					public onScrolled(param0: number, param1: number): void;
					public setItemAnimator(param0: android.support.v7.widget.RecyclerView.ItemAnimator): void;
					public smoothScrollToPosition(param0: number): void;
					public constructor(param0: android.content.Context);
					public dispatchSaveInstanceState(param0: android.util.SparseArray<javalangObject>): void;
					public isNestedScrollingEnabled(): boolean;
					public focusSearch(param0: android.view.View, param1: number): android.view.View;
					public checkLayoutParams(param0: android.view.ViewGroup.LayoutParams): boolean;
					public getChildLayoutPosition(param0: android.view.View): number;
					public dispatchNestedPreFling(param0: number, param1: number): boolean;
					public computeHorizontalScrollOffset(): number;
					public setHasFixedSize(param0: boolean): void;
					public findContainingViewHolder(param0: android.view.View): android.support.v7.widget.RecyclerView.ViewHolder;
					public sendAccessibilityEventUnchecked(param0: android.view.accessibility.AccessibilityEvent): void;
					public getScrollState(): number;
					public dispatchNestedPreScroll(param0: number, param1: number, param2: native.Array<number>, param3: native.Array<number>): boolean;
					public computeHorizontalScrollRange(): number;
					public onAttachedToWindow(): void;
					public setAccessibilityDelegateCompat(param0: android.support.v7.widget.RecyclerViewAccessibilityDelegate): void;
					public findViewHolderForItemId(param0: number): android.support.v7.widget.RecyclerView.ViewHolder;
					public swapAdapter(param0: android.support.v7.widget.RecyclerView.Adapter, param1: boolean): void;
					public generateLayoutParams(param0: android.util.AttributeSet): android.view.ViewGroup.LayoutParams;
					public setItemViewCacheSize(param0: number): void;
					public computeVerticalScrollExtent(): number;
					public setChildDrawingOrderCallback(param0: android.support.v7.widget.RecyclerView.ChildDrawingOrderCallback): void;
					public addOnChildAttachStateChangeListener(param0: android.support.v7.widget.RecyclerView.OnChildAttachStateChangeListener): void;
					public requestChildFocus(param0: android.view.View, param1: android.view.View): void;
					public onScrollStateChanged(param0: number): void;
					public getCompatAccessibilityDelegate(): android.support.v7.widget.RecyclerViewAccessibilityDelegate;
					public getLayoutManager(): android.support.v7.widget.RecyclerView.LayoutManager;
					public computeVerticalScrollOffset(): number;
					public dispatchNestedScroll(param0: number, param1: number, param2: number, param3: number, param4: native.Array<number>): boolean;
					public findContainingItemView(param0: android.view.View): android.view.View;
					public setLayoutFrozen(param0: boolean): void;
					public dispatchRestoreInstanceState(param0: android.util.SparseArray<javalangObject>): void;
					public clearOnChildAttachStateChangeListeners(): void;
					public setLayoutManager(param0: android.support.v7.widget.RecyclerView.LayoutManager): void;
					public findViewHolderForAdapterPosition(param0: number): android.support.v7.widget.RecyclerView.ViewHolder;
					public onSaveInstanceState(): android.os.Parcelable;
					public isAttachedToWindow(): boolean;
					public scrollBy(param0: number, param1: number): void;
					public getBaseline(): number;
					public findChildViewUnder(param0: number, param1: number): android.view.View;
					public clearOnScrollListeners(): void;
					public addOnScrollListener(param0: android.support.v7.widget.RecyclerView.OnScrollListener): void;
					public requestDisallowInterceptTouchEvent(param0: boolean): void;
					public setClipToPadding(param0: boolean): void;
					public fling(param0: number, param1: number): boolean;
					public draw(param0: android.graphics.Canvas): void;
					public findViewHolderForPosition(param0: number): android.support.v7.widget.RecyclerView.ViewHolder;
					public hasFixedSize(): boolean;
					public isLayoutFrozen(): boolean;
					public generateLayoutParams(param0: android.view.ViewGroup.LayoutParams): android.view.ViewGroup.LayoutParams;
					public setOnScrollListener(param0: android.support.v7.widget.RecyclerView.OnScrollListener): void;
					public onSizeChanged(param0: number, param1: number, param2: number, param3: number): void;
					public getMaxFlingVelocity(): number;
					public setRecyclerListener(param0: android.support.v7.widget.RecyclerView.RecyclerListener): void;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
					public smoothScrollBy(param0: number, param1: number): void;
					public drawChild(param0: android.graphics.Canvas, param1: android.view.View, param2: number): boolean;
					public onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
					public setViewCacheExtension(param0: android.support.v7.widget.RecyclerView.ViewCacheExtension): void;
					public addOnItemTouchListener(param0: android.support.v7.widget.RecyclerView.OnItemTouchListener): void;
					public startNestedScroll(param0: number): boolean;
					public hasNestedScrollingParent(): boolean;
					public removeOnScrollListener(param0: android.support.v7.widget.RecyclerView.OnScrollListener): void;
				}
				export module RecyclerView {
					export abstract class Adapter {
						public notifyItemMoved(param0: number, param1: number): void;
						public setHasStableIds(param0: boolean): void;
						public unregisterAdapterDataObserver(param0: android.support.v7.widget.RecyclerView.AdapterDataObserver): void;
						public createViewHolder(param0: android.view.ViewGroup, param1: number): android.support.v7.widget.RecyclerView.ViewHolder;
						public hasStableIds(): boolean;
						public onCreateViewHolder(param0: android.view.ViewGroup, param1: number): android.support.v7.widget.RecyclerView.ViewHolder;
						public bindViewHolder(param0: android.support.v7.widget.RecyclerView.ViewHolder, param1: number): void;
						public onBindViewHolder(param0: android.support.v7.widget.RecyclerView.ViewHolder, param1: number, param2: javautilList<javalangObject>): void;
						public onFailedToRecycleView(param0: android.support.v7.widget.RecyclerView.ViewHolder): boolean;
						public getItemId(param0: number): number;
						public onViewRecycled(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						public notifyItemChanged(param0: number): void;
						public notifyItemInserted(param0: number): void;
						public onAttachedToRecyclerView(param0: android.support.v7.widget.RecyclerView): void;
						public constructor();
						public hasObservers(): boolean;
						public onViewAttachedToWindow(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						public onViewDetachedFromWindow(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						public onBindViewHolder(param0: android.support.v7.widget.RecyclerView.ViewHolder, param1: number): void;
						public getItemViewType(param0: number): number;
						public notifyItemRangeChanged(param0: number, param1: number): void;
						public notifyItemRangeChanged(param0: number, param1: number, param2: javalangObject): void;
						public notifyItemRangeRemoved(param0: number, param1: number): void;
						public onDetachedFromRecyclerView(param0: android.support.v7.widget.RecyclerView): void;
						public notifyDataSetChanged(): void;
						public notifyItemRangeInserted(param0: number, param1: number): void;
						public getItemCount(): number;
						public notifyItemChanged(param0: number, param1: javalangObject): void;
						public notifyItemRemoved(param0: number): void;
						public registerAdapterDataObserver(param0: android.support.v7.widget.RecyclerView.AdapterDataObserver): void;
					}
					export class AdapterDataObservable {
						public notifyItemMoved(param0: number, param1: number): void;
						public hasObservers(): boolean;
						public notifyItemRangeInserted(param0: number, param1: number): void;
						public notifyItemRangeChanged(param0: number, param1: number): void;
						public notifyItemRangeChanged(param0: number, param1: number, param2: javalangObject): void;
						public notifyChanged(): void;
						public notifyItemRangeRemoved(param0: number, param1: number): void;
					}
					export abstract class AdapterDataObserver {
						public onItemRangeChanged(param0: number, param1: number, param2: javalangObject): void;
						public constructor();
						public onChanged(): void;
						public onItemRangeMoved(param0: number, param1: number, param2: number): void;
						public onItemRangeChanged(param0: number, param1: number): void;
						public onItemRangeInserted(param0: number, param1: number): void;
						public onItemRangeRemoved(param0: number, param1: number): void;
					}
					export class ChildDrawingOrderCallback {
						/**
						 * Constructs a new instance of the android.support.v7.widget.RecyclerView$ChildDrawingOrderCallback interface with the provided implementation.
						 */
						public constructor(implementation: {
							onGetChildDrawingOrder(param0: number, param1: number): number;
						});
						public onGetChildDrawingOrder(param0: number, param1: number): number;
					}
					export abstract class ItemAnimator {
						public static FLAG_CHANGED: number;
						public static FLAG_REMOVED: number;
						public static FLAG_INVALIDATED: number;
						public static FLAG_MOVED: number;
						public static FLAG_APPEARED_IN_PRE_LAYOUT: number;
						public setMoveDuration(param0: number): void;
						public animatePersistence(param0: android.support.v7.widget.RecyclerView.ViewHolder, param1: android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo, param2: android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo): boolean;
						public dispatchAnimationStarted(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						public getMoveDuration(): number;
						public endAnimations(): void;
						public animateAppearance(param0: android.support.v7.widget.RecyclerView.ViewHolder, param1: android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo, param2: android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo): boolean;
						public isRunning(): boolean;
						public runPendingAnimations(): void;
						public animateDisappearance(param0: android.support.v7.widget.RecyclerView.ViewHolder, param1: android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo, param2: android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo): boolean;
						public onAnimationFinished(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						public getAddDuration(): number;
						public setAddDuration(param0: number): void;
						public canReuseUpdatedViewHolder(param0: android.support.v7.widget.RecyclerView.ViewHolder, param1: javautilList<javalangObject>): boolean;
						public setChangeDuration(param0: number): void;
						public recordPostLayoutInformation(param0: android.support.v7.widget.RecyclerView.State, param1: android.support.v7.widget.RecyclerView.ViewHolder): android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo;
						public recordPreLayoutInformation(param0: android.support.v7.widget.RecyclerView.State, param1: android.support.v7.widget.RecyclerView.ViewHolder, param2: number, param3: javautilList<javalangObject>): android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo;
						public dispatchAnimationsFinished(): void;
						public getChangeDuration(): number;
						public constructor();
						public obtainHolderInfo(): android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo;
						public dispatchAnimationFinished(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						public canReuseUpdatedViewHolder(param0: android.support.v7.widget.RecyclerView.ViewHolder): boolean;
						public endAnimation(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						public setRemoveDuration(param0: number): void;
						public animateChange(param0: android.support.v7.widget.RecyclerView.ViewHolder, param1: android.support.v7.widget.RecyclerView.ViewHolder, param2: android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo, param3: android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo): boolean;
						public onAnimationStarted(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						public isRunning(param0: android.support.v7.widget.RecyclerView.ItemAnimator.ItemAnimatorFinishedListener): boolean;
						public getRemoveDuration(): number;
					}
					export module ItemAnimator {
						export class AdapterChanges {
							/**
							 * Constructs a new instance of the android.support.v7.widget.RecyclerView$ItemAnimator$AdapterChanges interface with the provided implementation.
							 */
							public constructor(implementation: {
							});
						}
						export class ItemAnimatorFinishedListener {
							/**
							 * Constructs a new instance of the android.support.v7.widget.RecyclerView$ItemAnimator$ItemAnimatorFinishedListener interface with the provided implementation.
							 */
							public constructor(implementation: {
								onAnimationsFinished(): void;
							});
							public onAnimationsFinished(): void;
						}
						export class ItemAnimatorListener {
							/**
							 * Constructs a new instance of the android.support.v7.widget.RecyclerView$ItemAnimator$ItemAnimatorListener interface with the provided implementation.
							 */
							public constructor(implementation: {
								onAnimationFinished(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
							});
							public onAnimationFinished(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						}
						export class ItemHolderInfo {
							public left: number;
							public top: number;
							public right: number;
							public bottom: number;
							public changeFlags: number;
							public constructor();
							public setFrom(param0: android.support.v7.widget.RecyclerView.ViewHolder, param1: number): android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo;
							public setFrom(param0: android.support.v7.widget.RecyclerView.ViewHolder): android.support.v7.widget.RecyclerView.ItemAnimator.ItemHolderInfo;
						}
					}
					export class ItemAnimatorRestoreListener {
						public onAnimationFinished(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
					}
					export abstract class ItemDecoration {
						public onDrawOver(param0: android.graphics.Canvas, param1: android.support.v7.widget.RecyclerView, param2: android.support.v7.widget.RecyclerView.State): void;
						public constructor();
						public onDraw(param0: android.graphics.Canvas, param1: android.support.v7.widget.RecyclerView): void;
						public getItemOffsets(param0: android.graphics.Rect, param1: android.view.View, param2: android.support.v7.widget.RecyclerView, param3: android.support.v7.widget.RecyclerView.State): void;
						public onDraw(param0: android.graphics.Canvas, param1: android.support.v7.widget.RecyclerView, param2: android.support.v7.widget.RecyclerView.State): void;
						public onDrawOver(param0: android.graphics.Canvas, param1: android.support.v7.widget.RecyclerView): void;
						public getItemOffsets(param0: android.graphics.Rect, param1: number, param2: android.support.v7.widget.RecyclerView): void;
					}
					export abstract class LayoutManager {
						public onMeasure(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State, param2: number, param3: number): void;
						public isLayoutHierarchical(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State): boolean;
						public measureChildWithMargins(param0: android.view.View, param1: number, param2: number): void;
						public onItemsRemoved(param0: android.support.v7.widget.RecyclerView, param1: number, param2: number): void;
						public getPaddingBottom(): number;
						public onSaveInstanceState(): android.os.Parcelable;
						public onInitializeAccessibilityNodeInfoForItem(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State, param2: android.view.View, param3: android.support.v4.view.accessibility.AccessibilityNodeInfoCompat): void;
						public addView(param0: android.view.View): void;
						public computeVerticalScrollExtent(param0: android.support.v7.widget.RecyclerView.State): number;
						public getRowCountForAccessibility(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State): number;
						public layoutDecorated(param0: android.view.View, param1: number, param2: number, param3: number, param4: number): void;
						public generateDefaultLayoutParams(): android.support.v7.widget.RecyclerView.LayoutParams;
						public constructor();
						public onDetachedFromWindow(param0: android.support.v7.widget.RecyclerView): void;
						public postOnAnimation(param0: javalangRunnable): void;
						public isAutoMeasureEnabled(): boolean;
						public onItemsAdded(param0: android.support.v7.widget.RecyclerView, param1: number, param2: number): void;
						public getDecoratedBottom(param0: android.view.View): number;
						public isSmoothScrolling(): boolean;
						public detachAndScrapAttachedViews(param0: android.support.v7.widget.RecyclerView.Recycler): void;
						public getFocusedChild(): android.view.View;
						public requestLayout(): void;
						public onItemsMoved(param0: android.support.v7.widget.RecyclerView, param1: number, param2: number, param3: number): void;
						public attachView(param0: android.view.View, param1: number): void;
						public removeAndRecycleAllViews(param0: android.support.v7.widget.RecyclerView.Recycler): void;
						public static getChildMeasureSpec(param0: number, param1: number, param2: number, param3: boolean): number;
						public generateLayoutParams(param0: android.content.Context, param1: android.util.AttributeSet): android.support.v7.widget.RecyclerView.LayoutParams;
						public getPaddingTop(): number;
						public computeHorizontalScrollOffset(param0: android.support.v7.widget.RecyclerView.State): number;
						public onAddFocusables(param0: android.support.v7.widget.RecyclerView, param1: javautilArrayList<javalangObject>, param2: number, param3: number): boolean;
						public getMinimumWidth(): number;
						public removeViewAt(param0: number): void;
						public getPaddingLeft(): number;
						public setMeasuredDimension(param0: number, param1: number): void;
						public isFocused(): boolean;
						public onItemsUpdated(param0: android.support.v7.widget.RecyclerView, param1: number, param2: number, param3: javalangObject): void;
						public getDecoratedLeft(param0: android.view.View): number;
						public scrollHorizontallyBy(param0: number, param1: android.support.v7.widget.RecyclerView.Recycler, param2: android.support.v7.widget.RecyclerView.State): number;
						public isMeasurementCacheEnabled(): boolean;
						public removeAndRecycleViewAt(param0: number, param1: android.support.v7.widget.RecyclerView.Recycler): void;
						public assertInLayoutOrScroll(param0: string): void;
						public performAccessibilityAction(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State, param2: number, param3: android.os.Bundle): boolean;
						public onItemsChanged(param0: android.support.v7.widget.RecyclerView): void;
						public canScrollVertically(): boolean;
						public onDetachedFromWindow(param0: android.support.v7.widget.RecyclerView, param1: android.support.v7.widget.RecyclerView.Recycler): void;
						public getChildCount(): number;
						public getRightDecorationWidth(param0: android.view.View): number;
						public getWidthMode(): number;
						public getHeight(): number;
						public calculateItemDecorationsForChild(param0: android.view.View, param1: android.graphics.Rect): void;
						public supportsPredictiveItemAnimations(): boolean;
						public removeAllViews(): void;
						public onScrollStateChanged(param0: number): void;
						public getItemCount(): number;
						public getColumnCountForAccessibility(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State): number;
						public findContainingItemView(param0: android.view.View): android.view.View;
						public removeAndRecycleView(param0: android.view.View, param1: android.support.v7.widget.RecyclerView.Recycler): void;
						public requestChildRectangleOnScreen(param0: android.support.v7.widget.RecyclerView, param1: android.view.View, param2: android.graphics.Rect, param3: boolean): boolean;
						public startSmoothScroll(param0: android.support.v7.widget.RecyclerView.SmoothScroller): void;
						public getLayoutDirection(): number;
						public getPosition(param0: android.view.View): number;
						public checkLayoutParams(param0: android.support.v7.widget.RecyclerView.LayoutParams): boolean;
						public detachAndScrapViewAt(param0: number, param1: android.support.v7.widget.RecyclerView.Recycler): void;
						public setMeasurementCacheEnabled(param0: boolean): void;
						public computeHorizontalScrollExtent(param0: android.support.v7.widget.RecyclerView.State): number;
						public getItemViewType(param0: android.view.View): number;
						public generateLayoutParams(param0: android.view.ViewGroup.LayoutParams): android.support.v7.widget.RecyclerView.LayoutParams;
						public getBaseline(): number;
						public getTopDecorationHeight(param0: android.view.View): number;
						public setAutoMeasureEnabled(param0: boolean): void;
						public removeCallbacks(param0: javalangRunnable): boolean;
						public onRequestChildFocus(param0: android.support.v7.widget.RecyclerView, param1: android.view.View, param2: android.view.View): boolean;
						public addDisappearingView(param0: android.view.View, param1: number): void;
						public onInitializeAccessibilityEvent(param0: android.view.accessibility.AccessibilityEvent): void;
						public getPaddingRight(): number;
						public getChildAt(param0: number): android.view.View;
						public ignoreView(param0: android.view.View): void;
						public onInitializeAccessibilityEvent(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State, param2: android.view.accessibility.AccessibilityEvent): void;
						public offsetChildrenHorizontal(param0: number): void;
						public onFocusSearchFailed(param0: android.view.View, param1: number, param2: android.support.v7.widget.RecyclerView.Recycler, param3: android.support.v7.widget.RecyclerView.State): android.view.View;
						public onAdapterChanged(param0: android.support.v7.widget.RecyclerView.Adapter, param1: android.support.v7.widget.RecyclerView.Adapter): void;
						public removeView(param0: android.view.View): void;
						public detachAndScrapView(param0: android.view.View, param1: android.support.v7.widget.RecyclerView.Recycler): void;
						public onInitializeAccessibilityNodeInfo(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State, param2: android.support.v4.view.accessibility.AccessibilityNodeInfoCompat): void;
						public getPaddingEnd(): number;
						public onLayoutChildren(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State): void;
						public computeVerticalScrollRange(param0: android.support.v7.widget.RecyclerView.State): number;
						public getClipToPadding(): boolean;
						public onRequestChildFocus(param0: android.support.v7.widget.RecyclerView, param1: android.support.v7.widget.RecyclerView.State, param2: android.view.View, param3: android.view.View): boolean;
						public attachView(param0: android.view.View, param1: number, param2: android.support.v7.widget.RecyclerView.LayoutParams): void;
						public static getChildMeasureSpec(param0: number, param1: number, param2: number, param3: number, param4: boolean): number;
						public isAttachedToWindow(): boolean;
						public addView(param0: android.view.View, param1: number): void;
						public attachView(param0: android.view.View): void;
						public setMeasuredDimension(param0: android.graphics.Rect, param1: number, param2: number): void;
						public removeDetachedView(param0: android.view.View): void;
						public endAnimation(param0: android.view.View): void;
						public offsetChildrenVertical(param0: number): void;
						public static getProperties(param0: android.content.Context, param1: android.util.AttributeSet, param2: number, param3: number): android.support.v7.widget.RecyclerView.LayoutManager.Properties;
						public moveView(param0: number, param1: number): void;
						public getHeightMode(): number;
						public computeVerticalScrollOffset(param0: android.support.v7.widget.RecyclerView.State): number;
						public scrollToPosition(param0: number): void;
						public scrollVerticallyBy(param0: number, param1: android.support.v7.widget.RecyclerView.Recycler, param2: android.support.v7.widget.RecyclerView.State): number;
						public assertNotInLayoutOrScroll(param0: string): void;
						public getDecoratedTop(param0: android.view.View): number;
						public onInterceptFocusSearch(param0: android.view.View, param1: number): android.view.View;
						public requestSimpleAnimationsInNextLayout(): void;
						public smoothScrollToPosition(param0: android.support.v7.widget.RecyclerView, param1: android.support.v7.widget.RecyclerView.State, param2: number): void;
						public computeHorizontalScrollRange(param0: android.support.v7.widget.RecyclerView.State): number;
						public performAccessibilityActionForItem(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State, param2: android.view.View, param3: number, param4: android.os.Bundle): boolean;
						public onItemsUpdated(param0: android.support.v7.widget.RecyclerView, param1: number, param2: number): void;
						public getSelectionModeForAccessibility(param0: android.support.v7.widget.RecyclerView.Recycler, param1: android.support.v7.widget.RecyclerView.State): number;
						public hasFocus(): boolean;
						public getMinimumHeight(): number;
						public detachView(param0: android.view.View): void;
						public stopIgnoringView(param0: android.view.View): void;
						public measureChild(param0: android.view.View, param1: number, param2: number): void;
						public getBottomDecorationHeight(param0: android.view.View): number;
						public onAttachedToWindow(param0: android.support.v7.widget.RecyclerView): void;
						public getDecoratedMeasuredHeight(param0: android.view.View): number;
						public canScrollHorizontally(): boolean;
						public detachViewAt(param0: number): void;
						public static chooseSize(param0: number, param1: number, param2: number): number;
						public getWidth(): number;
						public addDisappearingView(param0: android.view.View): void;
						public getPaddingStart(): number;
						public getDecoratedRight(param0: android.view.View): number;
						public getLeftDecorationWidth(param0: android.view.View): number;
						public getDecoratedMeasuredWidth(param0: android.view.View): number;
						public onRestoreInstanceState(param0: android.os.Parcelable): void;
						public findViewByPosition(param0: number): android.view.View;
					}
					export module LayoutManager {
						export class Properties {
							public orientation: number;
							public spanCount: number;
							public reverseLayout: boolean;
							public stackFromEnd: boolean;
							public constructor();
						}
					}
					export class LayoutParams {
						public constructor(param0: android.view.ViewGroup.MarginLayoutParams);
						public isItemChanged(): boolean;
						public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
						public constructor(param0: android.view.ViewGroup.LayoutParams);
						public isItemRemoved(): boolean;
						public getViewPosition(): number;
						public getViewAdapterPosition(): number;
						public isViewInvalid(): boolean;
						public constructor(param0: android.support.v7.widget.RecyclerView.LayoutParams);
						public getViewLayoutPosition(): number;
						public viewNeedsUpdate(): boolean;
						public constructor(param0: number, param1: number);
					}
					export class OnChildAttachStateChangeListener {
						/**
						 * Constructs a new instance of the android.support.v7.widget.RecyclerView$OnChildAttachStateChangeListener interface with the provided implementation.
						 */
						public constructor(implementation: {
							onChildViewAttachedToWindow(param0: android.view.View): void;
							onChildViewDetachedFromWindow(param0: android.view.View): void;
						});
						public onChildViewAttachedToWindow(param0: android.view.View): void;
						public onChildViewDetachedFromWindow(param0: android.view.View): void;
					}
					export class OnItemTouchListener {
						/**
						 * Constructs a new instance of the android.support.v7.widget.RecyclerView$OnItemTouchListener interface with the provided implementation.
						 */
						public constructor(implementation: {
							onInterceptTouchEvent(param0: android.support.v7.widget.RecyclerView, param1: android.view.MotionEvent): boolean;
							onTouchEvent(param0: android.support.v7.widget.RecyclerView, param1: android.view.MotionEvent): void;
							onRequestDisallowInterceptTouchEvent(param0: boolean): void;
						});
						public onInterceptTouchEvent(param0: android.support.v7.widget.RecyclerView, param1: android.view.MotionEvent): boolean;
						public onTouchEvent(param0: android.support.v7.widget.RecyclerView, param1: android.view.MotionEvent): void;
						public onRequestDisallowInterceptTouchEvent(param0: boolean): void;
					}
					export abstract class OnScrollListener {
						public constructor();
						public onScrolled(param0: android.support.v7.widget.RecyclerView, param1: number, param2: number): void;
						public onScrollStateChanged(param0: android.support.v7.widget.RecyclerView, param1: number): void;
					}
					export class RecycledViewPool {
						public constructor();
						public putRecycledView(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						public clear(): void;
						public setMaxRecycledViews(param0: number, param1: number): void;
						public getRecycledView(param0: number): android.support.v7.widget.RecyclerView.ViewHolder;
					}
					export class Recycler {
						public getViewForPosition(param0: number): android.view.View;
						public recycleView(param0: android.view.View): void;
						public constructor(param0: android.support.v7.widget.RecyclerView);
						public setViewCacheSize(param0: number): void;
						public getScrapList(): javautilList<javalangObject>;
						public clear(): void;
						public bindViewToPosition(param0: android.view.View, param1: number): void;
						public convertPreLayoutPositionToPostLayout(param0: number): number;
					}
					export class RecyclerListener {
						/**
						 * Constructs a new instance of the android.support.v7.widget.RecyclerView$RecyclerListener interface with the provided implementation.
						 */
						public constructor(implementation: {
							onViewRecycled(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
						});
						public onViewRecycled(param0: android.support.v7.widget.RecyclerView.ViewHolder): void;
					}
					export class RecyclerViewDataObserver extends android.support.v7.widget.RecyclerView.AdapterDataObserver {
						public onItemRangeChanged(param0: number, param1: number, param2: javalangObject): void;
						public onChanged(): void;
						public onItemRangeMoved(param0: number, param1: number, param2: number): void;
						public onItemRangeChanged(param0: number, param1: number): void;
						public onItemRangeInserted(param0: number, param1: number): void;
						public onItemRangeRemoved(param0: number, param1: number): void;
					}
					export class SavedState {
						public static CREATOR: android.os.Parcelable.Creator<javalangObject>;
						public writeToParcel(param0: android.os.Parcel, param1: number): void;
					}
					export class SimpleOnItemTouchListener {
						public constructor();
						public onInterceptTouchEvent(param0: android.support.v7.widget.RecyclerView, param1: android.view.MotionEvent): boolean;
						public onTouchEvent(param0: android.support.v7.widget.RecyclerView, param1: android.view.MotionEvent): void;
						public onRequestDisallowInterceptTouchEvent(param0: boolean): void;
					}
					export abstract class SmoothScroller {
						public onTargetFound(param0: android.view.View, param1: android.support.v7.widget.RecyclerView.State, param2: android.support.v7.widget.RecyclerView.SmoothScroller.Action): void;
						public constructor();
						public getChildCount(): number;
						public getLayoutManager(): android.support.v7.widget.RecyclerView.LayoutManager;
						public onSeekTargetStep(param0: number, param1: number, param2: android.support.v7.widget.RecyclerView.State, param3: android.support.v7.widget.RecyclerView.SmoothScroller.Action): void;
						public onChildAttachedToWindow(param0: android.view.View): void;
						public stop(): void;
						public isRunning(): boolean;
						public onStop(): void;
						public setTargetPosition(param0: number): void;
						public getChildPosition(param0: android.view.View): number;
						public instantScrollToPosition(param0: number): void;
						public isPendingInitialRun(): boolean;
						public normalize(param0: android.graphics.PointF): void;
						public getTargetPosition(): number;
						public findViewByPosition(param0: number): android.view.View;
						public onStart(): void;
					}
					export module SmoothScroller {
						export class Action {
							public static UNDEFINED_DURATION: number;
							public constructor(param0: number, param1: number);
							public setDuration(param0: number): void;
							public getInterpolator(): android.view.animation.Interpolator;
							public setDy(param0: number): void;
							public update(param0: number, param1: number, param2: number, param3: android.view.animation.Interpolator): void;
							public getDx(): number;
							public constructor(param0: number, param1: number, param2: number);
							public constructor(param0: number, param1: number, param2: number, param3: android.view.animation.Interpolator);
							public setDx(param0: number): void;
							public getDy(): number;
							public setInterpolator(param0: android.view.animation.Interpolator): void;
							public getDuration(): number;
							public jumpTo(param0: number): void;
						}
					}
					export class State {
						public constructor();
						public isMeasuring(): boolean;
						public toString(): string;
						public getTargetScrollPosition(): number;
						public willRunPredictiveAnimations(): boolean;
						public get(param0: number): javalangObject;
						public hasTargetScrollPosition(): boolean;
						public willRunSimpleAnimations(): boolean;
						public getItemCount(): number;
						public didStructureChange(): boolean;
						public isPreLayout(): boolean;
						public remove(param0: number): void;
						public put(param0: number, param1: javalangObject): void;
					}
					export module State {
						export class LayoutState {
							/**
							 * Constructs a new instance of the android.support.v7.widget.RecyclerView$State$LayoutState interface with the provided implementation.
							 */
							public constructor(implementation: {
							});
						}
					}
					export abstract class ViewCacheExtension {
						public constructor();
						public getViewForPositionAndType(param0: android.support.v7.widget.RecyclerView.Recycler, param1: number, param2: number): android.view.View;
					}
					export class ViewFlinger {
						public smoothScrollBy(param0: number, param1: number, param2: number): void;
						public run(): void;
						public constructor(param0: android.support.v7.widget.RecyclerView);
						public smoothScrollBy(param0: number, param1: number, param2: number, param3: number): void;
						public smoothScrollBy(param0: number, param1: number): void;
						public smoothScrollBy(param0: number, param1: number, param2: number, param3: android.view.animation.Interpolator): void;
						public fling(param0: number, param1: number): void;
						public stop(): void;
					}
					export abstract class ViewHolder {
						public itemView: android.view.View;
						public isRecyclable(): boolean;
						public getAdapterPosition(): number;
						public constructor(param0: android.view.View);
						public getItemViewType(): number;
						public setIsRecyclable(param0: boolean): void;
						public getPosition(): number;
						public getLayoutPosition(): number;
						public getOldPosition(): number;
						public toString(): string;
						public getItemId(): number;
					}
				}
			}
		}
	}
}

/// <reference path="./android.os.Bundle.d.ts" />
/// <reference path="./android.support.v4.view.accessibility.AccessibilityNodeInfoCompat.d.ts" />
/// <reference path="./android.support.v7.widget.RecyclerView.d.ts" />
/// <reference path="./android.view.View.d.ts" />
/// <reference path="./android.view.accessibility.AccessibilityEvent.d.ts" />
declare module android {
	export module support {
		export module v7 {
			export module widget {
				export class RecyclerViewAccessibilityDelegate {
					public performAccessibilityAction(param0: android.view.View, param1: number, param2: android.os.Bundle): boolean;
					public onInitializeAccessibilityNodeInfo(param0: android.view.View, param1: android.support.v4.view.accessibility.AccessibilityNodeInfoCompat): void;
					public constructor(param0: android.support.v7.widget.RecyclerView);
					public onInitializeAccessibilityEvent(param0: android.view.View, param1: android.view.accessibility.AccessibilityEvent): void;
				}
			}
		}
	}
}