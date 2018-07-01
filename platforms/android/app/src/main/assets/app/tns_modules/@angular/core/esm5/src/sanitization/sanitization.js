/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { stringify } from '../render3/util';
import { _sanitizeHtml as _sanitizeHtml } from './html_sanitizer';
import { _sanitizeStyle as _sanitizeStyle } from './style_sanitizer';
import { _sanitizeUrl as _sanitizeUrl } from './url_sanitizer';
var BRAND = '__SANITIZER_TRUSTED_BRAND__';
/**
 * An `html` sanitizer which converts untrusted `html` **string** into trusted string by removing
 * dangerous content.
 *
 * This method parses the `html` and locates potentially dangerous content (such as urls and
 * javascript) and removes it.
 *
 * It is possible to mark a string as trusted by calling {@link bypassSanitizationTrustHtml}.
 *
 * @param unsafeHtml untrusted `html`, typically from the user.
 * @returns `html` string which is safe to display to user, because all of the dangerous javascript
 * and urls have been removed.
 */
export function sanitizeHtml(unsafeHtml) {
    if (unsafeHtml instanceof String && unsafeHtml[BRAND] === 'Html') {
        return unsafeHtml.toString();
    }
    return _sanitizeHtml(document, stringify(unsafeHtml));
}
/**
 * A `style` sanitizer which converts untrusted `style` **string** into trusted string by removing
 * dangerous content.
 *
 * This method parses the `style` and locates potentially dangerous content (such as urls and
 * javascript) and removes it.
 *
 * It is possible to mark a string as trusted by calling {@link bypassSanitizationTrustStyle}.
 *
 * @param unsafeStyle untrusted `style`, typically from the user.
 * @returns `style` string which is safe to bind to the `style` properties, because all of the
 * dangerous javascript and urls have been removed.
 */
export function sanitizeStyle(unsafeStyle) {
    if (unsafeStyle instanceof String && unsafeStyle[BRAND] === 'Style') {
        return unsafeStyle.toString();
    }
    return _sanitizeStyle(stringify(unsafeStyle));
}
/**
 * A `url` sanitizer which converts untrusted `url` **string** into trusted string by removing
 * dangerous
 * content.
 *
 * This method parses the `url` and locates potentially dangerous content (such as javascript) and
 * removes it.
 *
 * It is possible to mark a string as trusted by calling {@link bypassSanitizationTrustUrl}.
 *
 * @param unsafeUrl untrusted `url`, typically from the user.
 * @returns `url` string which is safe to bind to the `src` properties such as `<img src>`, because
 * all of the dangerous javascript has been removed.
 */
export function sanitizeUrl(unsafeUrl) {
    if (unsafeUrl instanceof String && unsafeUrl[BRAND] === 'Url') {
        return unsafeUrl.toString();
    }
    return _sanitizeUrl(stringify(unsafeUrl));
}
/**
 * A `url` sanitizer which only lets trusted `url`s through.
 *
 * This passes only `url`s marked trusted by calling {@link bypassSanitizationTrustResourceUrl}.
 *
 * @param unsafeResourceUrl untrusted `url`, typically from the user.
 * @returns `url` string which is safe to bind to the `src` properties such as `<img src>`, because
 * only trusted `url`s have been allowed to pass.
 */
export function sanitizeResourceUrl(unsafeResourceUrl) {
    if (unsafeResourceUrl instanceof String &&
        unsafeResourceUrl[BRAND] === 'ResourceUrl') {
        return unsafeResourceUrl.toString();
    }
    throw new Error('unsafe value used in a resource URL context (see http://g.co/ng/security#xss)');
}
/**
 * A `script` sanitizer which only lets trusted javascript through.
 *
 * This passes only `script`s marked trusted by calling {@link bypassSanitizationTrustScript}.
 *
 * @param unsafeScript untrusted `script`, typically from the user.
 * @returns `url` string which is safe to bind to the `<script>` element such as `<img src>`,
 * because only trusted `scripts`s have been allowed to pass.
 */
export function sanitizeScript(unsafeScript) {
    if (unsafeScript instanceof String && unsafeScript[BRAND] === 'Script') {
        return unsafeScript.toString();
    }
    throw new Error('unsafe value used in a script context');
}
/**
 * Mark `html` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link htmlSanitizer} to be trusted implicitly.
 *
 * @param trustedHtml `html` string which needs to be implicitly trusted.
 * @returns a `html` `String` which has been branded to be implicitly trusted.
 */
export function bypassSanitizationTrustHtml(trustedHtml) {
    return bypassSanitizationTrustString(trustedHtml, 'Html');
}
/**
 * Mark `style` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link styleSanitizer} to be trusted implicitly.
 *
 * @param trustedStyle `style` string which needs to be implicitly trusted.
 * @returns a `style` `String` which has been branded to be implicitly trusted.
 */
export function bypassSanitizationTrustStyle(trustedStyle) {
    return bypassSanitizationTrustString(trustedStyle, 'Style');
}
/**
 * Mark `script` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link scriptSanitizer} to be trusted implicitly.
 *
 * @param trustedScript `script` string which needs to be implicitly trusted.
 * @returns a `script` `String` which has been branded to be implicitly trusted.
 */
export function bypassSanitizationTrustScript(trustedScript) {
    return bypassSanitizationTrustString(trustedScript, 'Script');
}
/**
 * Mark `url` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link urlSanitizer} to be trusted implicitly.
 *
 * @param trustedUrl `url` string which needs to be implicitly trusted.
 * @returns a `url` `String` which has been branded to be implicitly trusted.
 */
export function bypassSanitizationTrustUrl(trustedUrl) {
    return bypassSanitizationTrustString(trustedUrl, 'Url');
}
/**
 * Mark `url` string as trusted.
 *
 * This function wraps the trusted string in `String` and brands it in a way which makes it
 * recognizable to {@link resourceUrlSanitizer} to be trusted implicitly.
 *
 * @param trustedResourceUrl `url` string which needs to be implicitly trusted.
 * @returns a `url` `String` which has been branded to be implicitly trusted.
 */
export function bypassSanitizationTrustResourceUrl(trustedResourceUrl) {
    return bypassSanitizationTrustString(trustedResourceUrl, 'ResourceUrl');
}
function bypassSanitizationTrustString(trustedString, mode) {
    var trusted = new String(trustedString);
    trusted[BRAND] = mode;
    return trusted;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FuaXRpemF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvc2FuaXRpemF0aW9uL3Nhbml0aXphdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBUUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTFDLE9BQU8sRUFBQyxhQUFhLElBQUksYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDaEUsT0FBTyxFQUFDLGNBQWMsSUFBSSxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRSxPQUFPLEVBQUMsWUFBWSxJQUFJLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdELElBQU0sS0FBSyxHQUFHLDZCQUE2QixDQUFDOzs7Ozs7Ozs7Ozs7OztBQWtFNUMsTUFBTSx1QkFBdUIsVUFBZTtJQUMxQyxFQUFFLENBQUMsQ0FBQyxVQUFVLFlBQVksTUFBTSxJQUFLLFVBQWdDLENBQUMsS0FBSyxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN4RixNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzlCO0lBQ0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Q0FDdkQ7Ozs7Ozs7Ozs7Ozs7O0FBZUQsTUFBTSx3QkFBd0IsV0FBZ0I7SUFDNUMsRUFBRSxDQUFDLENBQUMsV0FBVyxZQUFZLE1BQU0sSUFBSyxXQUFrQyxDQUFDLEtBQUssQ0FBQyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUYsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMvQjtJQUNELE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Q0FDL0M7Ozs7Ozs7Ozs7Ozs7OztBQWdCRCxNQUFNLHNCQUFzQixTQUFjO0lBQ3hDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsWUFBWSxNQUFNLElBQUssU0FBOEIsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDN0I7SUFDRCxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0NBQzNDOzs7Ozs7Ozs7O0FBV0QsTUFBTSw4QkFBOEIsaUJBQXNCO0lBQ3hELEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixZQUFZLE1BQU07UUFDbEMsaUJBQThDLENBQUMsS0FBSyxDQUFDLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQztRQUM3RSxNQUFNLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDckM7SUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLCtFQUErRSxDQUFDLENBQUM7Q0FDbEc7Ozs7Ozs7Ozs7QUFXRCxNQUFNLHlCQUF5QixZQUFpQjtJQUM5QyxFQUFFLENBQUMsQ0FBQyxZQUFZLFlBQVksTUFBTSxJQUFLLFlBQW9DLENBQUMsS0FBSyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNoRyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ2hDO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0NBQzFEOzs7Ozs7Ozs7O0FBV0QsTUFBTSxzQ0FBc0MsV0FBbUI7SUFDN0QsTUFBTSxDQUFDLDZCQUE2QixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztDQUMzRDs7Ozs7Ozs7OztBQVVELE1BQU0sdUNBQXVDLFlBQW9CO0lBQy9ELE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDN0Q7Ozs7Ozs7Ozs7QUFVRCxNQUFNLHdDQUF3QyxhQUFxQjtJQUNqRSxNQUFNLENBQUMsNkJBQTZCLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0NBQy9EOzs7Ozs7Ozs7O0FBVUQsTUFBTSxxQ0FBcUMsVUFBa0I7SUFDM0QsTUFBTSxDQUFDLDZCQUE2QixDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUN6RDs7Ozs7Ozs7OztBQVVELE1BQU0sNkNBQTZDLGtCQUEwQjtJQUUzRSxNQUFNLENBQUMsNkJBQTZCLENBQUMsa0JBQWtCLEVBQUUsYUFBYSxDQUFDLENBQUM7Q0FDekU7QUFTRCx1Q0FDSSxhQUFxQixFQUNyQixJQUF5RDtJQUMzRCxJQUFNLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQWtCLENBQUM7SUFDM0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztJQUN0QixNQUFNLENBQUMsT0FBTyxDQUFDO0NBQ2hCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge3N0cmluZ2lmeX0gZnJvbSAnLi4vcmVuZGVyMy91dGlsJztcblxuaW1wb3J0IHtfc2FuaXRpemVIdG1sIGFzIF9zYW5pdGl6ZUh0bWx9IGZyb20gJy4vaHRtbF9zYW5pdGl6ZXInO1xuaW1wb3J0IHtfc2FuaXRpemVTdHlsZSBhcyBfc2FuaXRpemVTdHlsZX0gZnJvbSAnLi9zdHlsZV9zYW5pdGl6ZXInO1xuaW1wb3J0IHtfc2FuaXRpemVVcmwgYXMgX3Nhbml0aXplVXJsfSBmcm9tICcuL3VybF9zYW5pdGl6ZXInO1xuXG5jb25zdCBCUkFORCA9ICdfX1NBTklUSVpFUl9UUlVTVEVEX0JSQU5EX18nO1xuXG4vKipcbiAqIEEgYnJhbmRlZCB0cnVzdGVkIHN0cmluZyB1c2VkIHdpdGggc2FuaXRpemF0aW9uLlxuICpcbiAqIFNlZToge0BsaW5rIFRydXN0ZWRIdG1sU3RyaW5nfSwge0BsaW5rIFRydXN0ZWRSZXNvdXJjZVVybFN0cmluZ30sIHtAbGluayBUcnVzdGVkU2NyaXB0U3RyaW5nfSxcbiAqIHtAbGluayBUcnVzdGVkU3R5bGVTdHJpbmd9LCB7QGxpbmsgVHJ1c3RlZFVybFN0cmluZ31cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcnVzdGVkU3RyaW5nIGV4dGVuZHMgU3RyaW5nIHtcbiAgJ19fU0FOSVRJWkVSX1RSVVNURURfQlJBTkRfXyc6ICdIdG1sJ3wnU3R5bGUnfCdTY3JpcHQnfCdVcmwnfCdSZXNvdXJjZVVybCc7XG59XG5cbi8qKlxuICogQSBicmFuZGVkIHRydXN0ZWQgc3RyaW5nIHVzZWQgd2l0aCBzYW5pdGl6YXRpb24gb2YgYGh0bWxgIHN0cmluZ3MuXG4gKlxuICogU2VlOiB7QGxpbmsgYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RIdG1sfSBhbmQge0BsaW5rIGh0bWxTYW5pdGl6ZXJ9LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRydXN0ZWRIdG1sU3RyaW5nIGV4dGVuZHMgVHJ1c3RlZFN0cmluZyB7ICdfX1NBTklUSVpFUl9UUlVTVEVEX0JSQU5EX18nOiAnSHRtbCc7IH1cblxuLyoqXG4gKiBBIGJyYW5kZWQgdHJ1c3RlZCBzdHJpbmcgdXNlZCB3aXRoIHNhbml0aXphdGlvbiBvZiBgc3R5bGVgIHN0cmluZ3MuXG4gKlxuICogU2VlOiB7QGxpbmsgYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTdHlsZX0gYW5kIHtAbGluayBzdHlsZVNhbml0aXplcn0uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJ1c3RlZFN0eWxlU3RyaW5nIGV4dGVuZHMgVHJ1c3RlZFN0cmluZyB7XG4gICdfX1NBTklUSVpFUl9UUlVTVEVEX0JSQU5EX18nOiAnU3R5bGUnO1xufVxuXG4vKipcbiAqIEEgYnJhbmRlZCB0cnVzdGVkIHN0cmluZyB1c2VkIHdpdGggc2FuaXRpemF0aW9uIG9mIGB1cmxgIHN0cmluZ3MuXG4gKlxuICogU2VlOiB7QGxpbmsgYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTY3JpcHR9IGFuZCB7QGxpbmsgc2NyaXB0U2FuaXRpemVyfS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcnVzdGVkU2NyaXB0U3RyaW5nIGV4dGVuZHMgVHJ1c3RlZFN0cmluZyB7XG4gICdfX1NBTklUSVpFUl9UUlVTVEVEX0JSQU5EX18nOiAnU2NyaXB0Jztcbn1cblxuLyoqXG4gKiBBIGJyYW5kZWQgdHJ1c3RlZCBzdHJpbmcgdXNlZCB3aXRoIHNhbml0aXphdGlvbiBvZiBgdXJsYCBzdHJpbmdzLlxuICpcbiAqIFNlZToge0BsaW5rIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0VXJsfSBhbmQge0BsaW5rIHVybFNhbml0aXplcn0uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJ1c3RlZFVybFN0cmluZyBleHRlbmRzIFRydXN0ZWRTdHJpbmcgeyAnX19TQU5JVElaRVJfVFJVU1RFRF9CUkFORF9fJzogJ1VybCc7IH1cblxuLyoqXG4gKiBBIGJyYW5kZWQgdHJ1c3RlZCBzdHJpbmcgdXNlZCB3aXRoIHNhbml0aXphdGlvbiBvZiBgcmVzb3VyY2VVcmxgIHN0cmluZ3MuXG4gKlxuICogU2VlOiB7QGxpbmsgYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RSZXNvdXJjZVVybH0gYW5kIHtAbGluayByZXNvdXJjZVVybFNhbml0aXplcn0uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJ1c3RlZFJlc291cmNlVXJsU3RyaW5nIGV4dGVuZHMgVHJ1c3RlZFN0cmluZyB7XG4gICdfX1NBTklUSVpFUl9UUlVTVEVEX0JSQU5EX18nOiAnUmVzb3VyY2VVcmwnO1xufVxuXG4vKipcbiAqIEFuIGBodG1sYCBzYW5pdGl6ZXIgd2hpY2ggY29udmVydHMgdW50cnVzdGVkIGBodG1sYCAqKnN0cmluZyoqIGludG8gdHJ1c3RlZCBzdHJpbmcgYnkgcmVtb3ZpbmdcbiAqIGRhbmdlcm91cyBjb250ZW50LlxuICpcbiAqIFRoaXMgbWV0aG9kIHBhcnNlcyB0aGUgYGh0bWxgIGFuZCBsb2NhdGVzIHBvdGVudGlhbGx5IGRhbmdlcm91cyBjb250ZW50IChzdWNoIGFzIHVybHMgYW5kXG4gKiBqYXZhc2NyaXB0KSBhbmQgcmVtb3ZlcyBpdC5cbiAqXG4gKiBJdCBpcyBwb3NzaWJsZSB0byBtYXJrIGEgc3RyaW5nIGFzIHRydXN0ZWQgYnkgY2FsbGluZyB7QGxpbmsgYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RIdG1sfS5cbiAqXG4gKiBAcGFyYW0gdW5zYWZlSHRtbCB1bnRydXN0ZWQgYGh0bWxgLCB0eXBpY2FsbHkgZnJvbSB0aGUgdXNlci5cbiAqIEByZXR1cm5zIGBodG1sYCBzdHJpbmcgd2hpY2ggaXMgc2FmZSB0byBkaXNwbGF5IHRvIHVzZXIsIGJlY2F1c2UgYWxsIG9mIHRoZSBkYW5nZXJvdXMgamF2YXNjcmlwdFxuICogYW5kIHVybHMgaGF2ZSBiZWVuIHJlbW92ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZUh0bWwodW5zYWZlSHRtbDogYW55KTogc3RyaW5nIHtcbiAgaWYgKHVuc2FmZUh0bWwgaW5zdGFuY2VvZiBTdHJpbmcgJiYgKHVuc2FmZUh0bWwgYXMgVHJ1c3RlZEh0bWxTdHJpbmcpW0JSQU5EXSA9PT0gJ0h0bWwnKSB7XG4gICAgcmV0dXJuIHVuc2FmZUh0bWwudG9TdHJpbmcoKTtcbiAgfVxuICByZXR1cm4gX3Nhbml0aXplSHRtbChkb2N1bWVudCwgc3RyaW5naWZ5KHVuc2FmZUh0bWwpKTtcbn1cblxuLyoqXG4gKiBBIGBzdHlsZWAgc2FuaXRpemVyIHdoaWNoIGNvbnZlcnRzIHVudHJ1c3RlZCBgc3R5bGVgICoqc3RyaW5nKiogaW50byB0cnVzdGVkIHN0cmluZyBieSByZW1vdmluZ1xuICogZGFuZ2Vyb3VzIGNvbnRlbnQuXG4gKlxuICogVGhpcyBtZXRob2QgcGFyc2VzIHRoZSBgc3R5bGVgIGFuZCBsb2NhdGVzIHBvdGVudGlhbGx5IGRhbmdlcm91cyBjb250ZW50IChzdWNoIGFzIHVybHMgYW5kXG4gKiBqYXZhc2NyaXB0KSBhbmQgcmVtb3ZlcyBpdC5cbiAqXG4gKiBJdCBpcyBwb3NzaWJsZSB0byBtYXJrIGEgc3RyaW5nIGFzIHRydXN0ZWQgYnkgY2FsbGluZyB7QGxpbmsgYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTdHlsZX0uXG4gKlxuICogQHBhcmFtIHVuc2FmZVN0eWxlIHVudHJ1c3RlZCBgc3R5bGVgLCB0eXBpY2FsbHkgZnJvbSB0aGUgdXNlci5cbiAqIEByZXR1cm5zIGBzdHlsZWAgc3RyaW5nIHdoaWNoIGlzIHNhZmUgdG8gYmluZCB0byB0aGUgYHN0eWxlYCBwcm9wZXJ0aWVzLCBiZWNhdXNlIGFsbCBvZiB0aGVcbiAqIGRhbmdlcm91cyBqYXZhc2NyaXB0IGFuZCB1cmxzIGhhdmUgYmVlbiByZW1vdmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FuaXRpemVTdHlsZSh1bnNhZmVTdHlsZTogYW55KTogc3RyaW5nIHtcbiAgaWYgKHVuc2FmZVN0eWxlIGluc3RhbmNlb2YgU3RyaW5nICYmICh1bnNhZmVTdHlsZSBhcyBUcnVzdGVkU3R5bGVTdHJpbmcpW0JSQU5EXSA9PT0gJ1N0eWxlJykge1xuICAgIHJldHVybiB1bnNhZmVTdHlsZS50b1N0cmluZygpO1xuICB9XG4gIHJldHVybiBfc2FuaXRpemVTdHlsZShzdHJpbmdpZnkodW5zYWZlU3R5bGUpKTtcbn1cblxuLyoqXG4gKiBBIGB1cmxgIHNhbml0aXplciB3aGljaCBjb252ZXJ0cyB1bnRydXN0ZWQgYHVybGAgKipzdHJpbmcqKiBpbnRvIHRydXN0ZWQgc3RyaW5nIGJ5IHJlbW92aW5nXG4gKiBkYW5nZXJvdXNcbiAqIGNvbnRlbnQuXG4gKlxuICogVGhpcyBtZXRob2QgcGFyc2VzIHRoZSBgdXJsYCBhbmQgbG9jYXRlcyBwb3RlbnRpYWxseSBkYW5nZXJvdXMgY29udGVudCAoc3VjaCBhcyBqYXZhc2NyaXB0KSBhbmRcbiAqIHJlbW92ZXMgaXQuXG4gKlxuICogSXQgaXMgcG9zc2libGUgdG8gbWFyayBhIHN0cmluZyBhcyB0cnVzdGVkIGJ5IGNhbGxpbmcge0BsaW5rIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0VXJsfS5cbiAqXG4gKiBAcGFyYW0gdW5zYWZlVXJsIHVudHJ1c3RlZCBgdXJsYCwgdHlwaWNhbGx5IGZyb20gdGhlIHVzZXIuXG4gKiBAcmV0dXJucyBgdXJsYCBzdHJpbmcgd2hpY2ggaXMgc2FmZSB0byBiaW5kIHRvIHRoZSBgc3JjYCBwcm9wZXJ0aWVzIHN1Y2ggYXMgYDxpbWcgc3JjPmAsIGJlY2F1c2VcbiAqIGFsbCBvZiB0aGUgZGFuZ2Vyb3VzIGphdmFzY3JpcHQgaGFzIGJlZW4gcmVtb3ZlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplVXJsKHVuc2FmZVVybDogYW55KTogc3RyaW5nIHtcbiAgaWYgKHVuc2FmZVVybCBpbnN0YW5jZW9mIFN0cmluZyAmJiAodW5zYWZlVXJsIGFzIFRydXN0ZWRVcmxTdHJpbmcpW0JSQU5EXSA9PT0gJ1VybCcpIHtcbiAgICByZXR1cm4gdW5zYWZlVXJsLnRvU3RyaW5nKCk7XG4gIH1cbiAgcmV0dXJuIF9zYW5pdGl6ZVVybChzdHJpbmdpZnkodW5zYWZlVXJsKSk7XG59XG5cbi8qKlxuICogQSBgdXJsYCBzYW5pdGl6ZXIgd2hpY2ggb25seSBsZXRzIHRydXN0ZWQgYHVybGBzIHRocm91Z2guXG4gKlxuICogVGhpcyBwYXNzZXMgb25seSBgdXJsYHMgbWFya2VkIHRydXN0ZWQgYnkgY2FsbGluZyB7QGxpbmsgYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RSZXNvdXJjZVVybH0uXG4gKlxuICogQHBhcmFtIHVuc2FmZVJlc291cmNlVXJsIHVudHJ1c3RlZCBgdXJsYCwgdHlwaWNhbGx5IGZyb20gdGhlIHVzZXIuXG4gKiBAcmV0dXJucyBgdXJsYCBzdHJpbmcgd2hpY2ggaXMgc2FmZSB0byBiaW5kIHRvIHRoZSBgc3JjYCBwcm9wZXJ0aWVzIHN1Y2ggYXMgYDxpbWcgc3JjPmAsIGJlY2F1c2VcbiAqIG9ubHkgdHJ1c3RlZCBgdXJsYHMgaGF2ZSBiZWVuIGFsbG93ZWQgdG8gcGFzcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplUmVzb3VyY2VVcmwodW5zYWZlUmVzb3VyY2VVcmw6IGFueSk6IHN0cmluZyB7XG4gIGlmICh1bnNhZmVSZXNvdXJjZVVybCBpbnN0YW5jZW9mIFN0cmluZyAmJlxuICAgICAgKHVuc2FmZVJlc291cmNlVXJsIGFzIFRydXN0ZWRSZXNvdXJjZVVybFN0cmluZylbQlJBTkRdID09PSAnUmVzb3VyY2VVcmwnKSB7XG4gICAgcmV0dXJuIHVuc2FmZVJlc291cmNlVXJsLnRvU3RyaW5nKCk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCd1bnNhZmUgdmFsdWUgdXNlZCBpbiBhIHJlc291cmNlIFVSTCBjb250ZXh0IChzZWUgaHR0cDovL2cuY28vbmcvc2VjdXJpdHkjeHNzKScpO1xufVxuXG4vKipcbiAqIEEgYHNjcmlwdGAgc2FuaXRpemVyIHdoaWNoIG9ubHkgbGV0cyB0cnVzdGVkIGphdmFzY3JpcHQgdGhyb3VnaC5cbiAqXG4gKiBUaGlzIHBhc3NlcyBvbmx5IGBzY3JpcHRgcyBtYXJrZWQgdHJ1c3RlZCBieSBjYWxsaW5nIHtAbGluayBieXBhc3NTYW5pdGl6YXRpb25UcnVzdFNjcmlwdH0uXG4gKlxuICogQHBhcmFtIHVuc2FmZVNjcmlwdCB1bnRydXN0ZWQgYHNjcmlwdGAsIHR5cGljYWxseSBmcm9tIHRoZSB1c2VyLlxuICogQHJldHVybnMgYHVybGAgc3RyaW5nIHdoaWNoIGlzIHNhZmUgdG8gYmluZCB0byB0aGUgYDxzY3JpcHQ+YCBlbGVtZW50IHN1Y2ggYXMgYDxpbWcgc3JjPmAsXG4gKiBiZWNhdXNlIG9ubHkgdHJ1c3RlZCBgc2NyaXB0c2BzIGhhdmUgYmVlbiBhbGxvd2VkIHRvIHBhc3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVNjcmlwdCh1bnNhZmVTY3JpcHQ6IGFueSk6IHN0cmluZyB7XG4gIGlmICh1bnNhZmVTY3JpcHQgaW5zdGFuY2VvZiBTdHJpbmcgJiYgKHVuc2FmZVNjcmlwdCBhcyBUcnVzdGVkU2NyaXB0U3RyaW5nKVtCUkFORF0gPT09ICdTY3JpcHQnKSB7XG4gICAgcmV0dXJuIHVuc2FmZVNjcmlwdC50b1N0cmluZygpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcigndW5zYWZlIHZhbHVlIHVzZWQgaW4gYSBzY3JpcHQgY29udGV4dCcpO1xufVxuXG4vKipcbiAqIE1hcmsgYGh0bWxgIHN0cmluZyBhcyB0cnVzdGVkLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd3JhcHMgdGhlIHRydXN0ZWQgc3RyaW5nIGluIGBTdHJpbmdgIGFuZCBicmFuZHMgaXQgaW4gYSB3YXkgd2hpY2ggbWFrZXMgaXRcbiAqIHJlY29nbml6YWJsZSB0byB7QGxpbmsgaHRtbFNhbml0aXplcn0gdG8gYmUgdHJ1c3RlZCBpbXBsaWNpdGx5LlxuICpcbiAqIEBwYXJhbSB0cnVzdGVkSHRtbCBgaHRtbGAgc3RyaW5nIHdoaWNoIG5lZWRzIHRvIGJlIGltcGxpY2l0bHkgdHJ1c3RlZC5cbiAqIEByZXR1cm5zIGEgYGh0bWxgIGBTdHJpbmdgIHdoaWNoIGhhcyBiZWVuIGJyYW5kZWQgdG8gYmUgaW1wbGljaXRseSB0cnVzdGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RIdG1sKHRydXN0ZWRIdG1sOiBzdHJpbmcpOiBUcnVzdGVkSHRtbFN0cmluZyB7XG4gIHJldHVybiBieXBhc3NTYW5pdGl6YXRpb25UcnVzdFN0cmluZyh0cnVzdGVkSHRtbCwgJ0h0bWwnKTtcbn1cbi8qKlxuICogTWFyayBgc3R5bGVgIHN0cmluZyBhcyB0cnVzdGVkLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd3JhcHMgdGhlIHRydXN0ZWQgc3RyaW5nIGluIGBTdHJpbmdgIGFuZCBicmFuZHMgaXQgaW4gYSB3YXkgd2hpY2ggbWFrZXMgaXRcbiAqIHJlY29nbml6YWJsZSB0byB7QGxpbmsgc3R5bGVTYW5pdGl6ZXJ9IHRvIGJlIHRydXN0ZWQgaW1wbGljaXRseS5cbiAqXG4gKiBAcGFyYW0gdHJ1c3RlZFN0eWxlIGBzdHlsZWAgc3RyaW5nIHdoaWNoIG5lZWRzIHRvIGJlIGltcGxpY2l0bHkgdHJ1c3RlZC5cbiAqIEByZXR1cm5zIGEgYHN0eWxlYCBgU3RyaW5nYCB3aGljaCBoYXMgYmVlbiBicmFuZGVkIHRvIGJlIGltcGxpY2l0bHkgdHJ1c3RlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0U3R5bGUodHJ1c3RlZFN0eWxlOiBzdHJpbmcpOiBUcnVzdGVkU3R5bGVTdHJpbmcge1xuICByZXR1cm4gYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTdHJpbmcodHJ1c3RlZFN0eWxlLCAnU3R5bGUnKTtcbn1cbi8qKlxuICogTWFyayBgc2NyaXB0YCBzdHJpbmcgYXMgdHJ1c3RlZC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdyYXBzIHRoZSB0cnVzdGVkIHN0cmluZyBpbiBgU3RyaW5nYCBhbmQgYnJhbmRzIGl0IGluIGEgd2F5IHdoaWNoIG1ha2VzIGl0XG4gKiByZWNvZ25pemFibGUgdG8ge0BsaW5rIHNjcmlwdFNhbml0aXplcn0gdG8gYmUgdHJ1c3RlZCBpbXBsaWNpdGx5LlxuICpcbiAqIEBwYXJhbSB0cnVzdGVkU2NyaXB0IGBzY3JpcHRgIHN0cmluZyB3aGljaCBuZWVkcyB0byBiZSBpbXBsaWNpdGx5IHRydXN0ZWQuXG4gKiBAcmV0dXJucyBhIGBzY3JpcHRgIGBTdHJpbmdgIHdoaWNoIGhhcyBiZWVuIGJyYW5kZWQgdG8gYmUgaW1wbGljaXRseSB0cnVzdGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTY3JpcHQodHJ1c3RlZFNjcmlwdDogc3RyaW5nKTogVHJ1c3RlZFNjcmlwdFN0cmluZyB7XG4gIHJldHVybiBieXBhc3NTYW5pdGl6YXRpb25UcnVzdFN0cmluZyh0cnVzdGVkU2NyaXB0LCAnU2NyaXB0Jyk7XG59XG4vKipcbiAqIE1hcmsgYHVybGAgc3RyaW5nIGFzIHRydXN0ZWQuXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3cmFwcyB0aGUgdHJ1c3RlZCBzdHJpbmcgaW4gYFN0cmluZ2AgYW5kIGJyYW5kcyBpdCBpbiBhIHdheSB3aGljaCBtYWtlcyBpdFxuICogcmVjb2duaXphYmxlIHRvIHtAbGluayB1cmxTYW5pdGl6ZXJ9IHRvIGJlIHRydXN0ZWQgaW1wbGljaXRseS5cbiAqXG4gKiBAcGFyYW0gdHJ1c3RlZFVybCBgdXJsYCBzdHJpbmcgd2hpY2ggbmVlZHMgdG8gYmUgaW1wbGljaXRseSB0cnVzdGVkLlxuICogQHJldHVybnMgYSBgdXJsYCBgU3RyaW5nYCB3aGljaCBoYXMgYmVlbiBicmFuZGVkIHRvIGJlIGltcGxpY2l0bHkgdHJ1c3RlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0VXJsKHRydXN0ZWRVcmw6IHN0cmluZyk6IFRydXN0ZWRVcmxTdHJpbmcge1xuICByZXR1cm4gYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTdHJpbmcodHJ1c3RlZFVybCwgJ1VybCcpO1xufVxuLyoqXG4gKiBNYXJrIGB1cmxgIHN0cmluZyBhcyB0cnVzdGVkLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd3JhcHMgdGhlIHRydXN0ZWQgc3RyaW5nIGluIGBTdHJpbmdgIGFuZCBicmFuZHMgaXQgaW4gYSB3YXkgd2hpY2ggbWFrZXMgaXRcbiAqIHJlY29nbml6YWJsZSB0byB7QGxpbmsgcmVzb3VyY2VVcmxTYW5pdGl6ZXJ9IHRvIGJlIHRydXN0ZWQgaW1wbGljaXRseS5cbiAqXG4gKiBAcGFyYW0gdHJ1c3RlZFJlc291cmNlVXJsIGB1cmxgIHN0cmluZyB3aGljaCBuZWVkcyB0byBiZSBpbXBsaWNpdGx5IHRydXN0ZWQuXG4gKiBAcmV0dXJucyBhIGB1cmxgIGBTdHJpbmdgIHdoaWNoIGhhcyBiZWVuIGJyYW5kZWQgdG8gYmUgaW1wbGljaXRseSB0cnVzdGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RSZXNvdXJjZVVybCh0cnVzdGVkUmVzb3VyY2VVcmw6IHN0cmluZyk6XG4gICAgVHJ1c3RlZFJlc291cmNlVXJsU3RyaW5nIHtcbiAgcmV0dXJuIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0U3RyaW5nKHRydXN0ZWRSZXNvdXJjZVVybCwgJ1Jlc291cmNlVXJsJyk7XG59XG5cblxuZnVuY3Rpb24gYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTdHJpbmcodHJ1c3RlZFN0cmluZzogc3RyaW5nLCBtb2RlOiAnSHRtbCcpOiBUcnVzdGVkSHRtbFN0cmluZztcbmZ1bmN0aW9uIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0U3RyaW5nKHRydXN0ZWRTdHJpbmc6IHN0cmluZywgbW9kZTogJ1N0eWxlJyk6IFRydXN0ZWRTdHlsZVN0cmluZztcbmZ1bmN0aW9uIGJ5cGFzc1Nhbml0aXphdGlvblRydXN0U3RyaW5nKHRydXN0ZWRTdHJpbmc6IHN0cmluZywgbW9kZTogJ1NjcmlwdCcpOiBUcnVzdGVkU2NyaXB0U3RyaW5nO1xuZnVuY3Rpb24gYnlwYXNzU2FuaXRpemF0aW9uVHJ1c3RTdHJpbmcodHJ1c3RlZFN0cmluZzogc3RyaW5nLCBtb2RlOiAnVXJsJyk6IFRydXN0ZWRVcmxTdHJpbmc7XG5mdW5jdGlvbiBieXBhc3NTYW5pdGl6YXRpb25UcnVzdFN0cmluZyhcbiAgICB0cnVzdGVkU3RyaW5nOiBzdHJpbmcsIG1vZGU6ICdSZXNvdXJjZVVybCcpOiBUcnVzdGVkUmVzb3VyY2VVcmxTdHJpbmc7XG5mdW5jdGlvbiBieXBhc3NTYW5pdGl6YXRpb25UcnVzdFN0cmluZyhcbiAgICB0cnVzdGVkU3RyaW5nOiBzdHJpbmcsXG4gICAgbW9kZTogJ0h0bWwnIHwgJ1N0eWxlJyB8ICdTY3JpcHQnIHwgJ1VybCcgfCAnUmVzb3VyY2VVcmwnKTogVHJ1c3RlZFN0cmluZyB7XG4gIGNvbnN0IHRydXN0ZWQgPSBuZXcgU3RyaW5nKHRydXN0ZWRTdHJpbmcpIGFzIFRydXN0ZWRTdHJpbmc7XG4gIHRydXN0ZWRbQlJBTkRdID0gbW9kZTtcbiAgcmV0dXJuIHRydXN0ZWQ7XG59XG4iXX0=