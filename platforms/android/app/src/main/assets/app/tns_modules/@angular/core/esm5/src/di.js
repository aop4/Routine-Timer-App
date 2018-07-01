/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export * from './di/metadata';
export { defineInjectable, defineInjector } from './di/defs';
export { forwardRef, resolveForwardRef } from './di/forward_ref';
export { Injectable } from './di/injectable';
export { inject, INJECTOR, Injector } from './di/injector';
export { ReflectiveInjector } from './di/reflective_injector';
export { createInjector } from './di/r3_injector';
export { ResolvedReflectiveFactory } from './di/reflective_provider';
export { ReflectiveKey } from './di/reflective_key';
export { InjectionToken } from './di/injection_token';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9kaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBY0EsY0FBYyxlQUFlLENBQUM7QUFDOUIsT0FBTyxFQUErQixnQkFBZ0IsRUFBRSxjQUFjLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDekYsT0FBTyxFQUFDLFVBQVUsRUFBRSxpQkFBaUIsRUFBZSxNQUFNLGtCQUFrQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxVQUFVLEVBQTBDLE1BQU0saUJBQWlCLENBQUM7QUFDcEYsT0FBTyxFQUFDLE1BQU0sRUFBZSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRTVELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMseUJBQXlCLEVBQTZCLE1BQU0sMEJBQTBCLENBQUM7QUFDL0YsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBAbW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSBgZGlgIG1vZHVsZSBwcm92aWRlcyBkZXBlbmRlbmN5IGluamVjdGlvbiBjb250YWluZXIgc2VydmljZXMuXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9kaS9tZXRhZGF0YSc7XG5leHBvcnQge0luamVjdGFibGVUeXBlLCBJbmplY3RvclR5cGUsIGRlZmluZUluamVjdGFibGUsIGRlZmluZUluamVjdG9yfSBmcm9tICcuL2RpL2RlZnMnO1xuZXhwb3J0IHtmb3J3YXJkUmVmLCByZXNvbHZlRm9yd2FyZFJlZiwgRm9yd2FyZFJlZkZufSBmcm9tICcuL2RpL2ZvcndhcmRfcmVmJztcbmV4cG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0YWJsZURlY29yYXRvciwgSW5qZWN0YWJsZVByb3ZpZGVyfSBmcm9tICcuL2RpL2luamVjdGFibGUnO1xuZXhwb3J0IHtpbmplY3QsIEluamVjdEZsYWdzLCBJTkpFQ1RPUiwgSW5qZWN0b3J9IGZyb20gJy4vZGkvaW5qZWN0b3InO1xuZXhwb3J0IHtSZWZsZWN0aXZlSW5qZWN0b3J9IGZyb20gJy4vZGkvcmVmbGVjdGl2ZV9pbmplY3Rvcic7XG5leHBvcnQge1N0YXRpY1Byb3ZpZGVyLCBWYWx1ZVByb3ZpZGVyLCBFeGlzdGluZ1Byb3ZpZGVyLCBGYWN0b3J5UHJvdmlkZXIsIFByb3ZpZGVyLCBUeXBlUHJvdmlkZXIsIENsYXNzUHJvdmlkZXJ9IGZyb20gJy4vZGkvcHJvdmlkZXInO1xuZXhwb3J0IHtjcmVhdGVJbmplY3Rvcn0gZnJvbSAnLi9kaS9yM19pbmplY3Rvcic7XG5leHBvcnQge1Jlc29sdmVkUmVmbGVjdGl2ZUZhY3RvcnksIFJlc29sdmVkUmVmbGVjdGl2ZVByb3ZpZGVyfSBmcm9tICcuL2RpL3JlZmxlY3RpdmVfcHJvdmlkZXInO1xuZXhwb3J0IHtSZWZsZWN0aXZlS2V5fSBmcm9tICcuL2RpL3JlZmxlY3RpdmVfa2V5JztcbmV4cG9ydCB7SW5qZWN0aW9uVG9rZW59IGZyb20gJy4vZGkvaW5qZWN0aW9uX3Rva2VuJztcbiJdfQ==