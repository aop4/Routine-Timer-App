"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/* This class is merely used as a way to pass arbitrary data from one route to another,
without the use of a router. */
var DataRetriever = /** @class */ (function () {
    function DataRetriever() {
        this.modified = false;
        this.alreadySetBackPressed = false;
    }
    DataRetriever = __decorate([
        core_1.Injectable()
    ], DataRetriever);
    return DataRetriever;
}());
exports.DataRetriever = DataRetriever;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzcy1kYXRhLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXNzLWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNDQUEyQztBQUUzQzsrQkFDK0I7QUFFL0I7SUFEQTtRQUtJLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsMEJBQXFCLEdBQVksS0FBSyxDQUFDO0lBRTNDLENBQUM7SUFQWSxhQUFhO1FBRHpCLGlCQUFVLEVBQUU7T0FDQSxhQUFhLENBT3pCO0lBQUQsb0JBQUM7Q0FBQSxBQVBELElBT0M7QUFQWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrL3Rhc2subW9kZWxcIjtcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcblxyXG4vKiBUaGlzIGNsYXNzIGlzIG1lcmVseSB1c2VkIGFzIGEgd2F5IHRvIHBhc3MgYXJiaXRyYXJ5IGRhdGEgZnJvbSBvbmUgcm91dGUgdG8gYW5vdGhlcixcclxud2l0aG91dCB0aGUgdXNlIG9mIGEgcm91dGVyLiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEYXRhUmV0cmlldmVyIHtcclxuXHJcbiAgICBkYXRhOiBhbnk7XHJcbiAgICBpZGVudGlmaWVyOiBzdHJpbmc7XHJcbiAgICBtb2RpZmllZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgYWxyZWFkeVNldEJhY2tQcmVzc2VkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG59XHJcbiJdfQ==