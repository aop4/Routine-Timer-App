"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_insomnia_1 = require("nativescript-insomnia");
var core_1 = require("@angular/core");
var KeepAwakeService = /** @class */ (function () {
    function KeepAwakeService() {
    }
    KeepAwakeService.prototype.keepScreenOn = function () {
        nativescript_insomnia_1.keepAwake();
    };
    KeepAwakeService.prototype.letScreenTurnOff = function () {
        nativescript_insomnia_1.allowSleepAgain();
    };
    KeepAwakeService = __decorate([
        core_1.Injectable()
    ], KeepAwakeService);
    return KeepAwakeService;
}());
exports.KeepAwakeService = KeepAwakeService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2VlcGF3YWtlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJrZWVwYXdha2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUFtRTtBQUNuRSxzQ0FBMkM7QUFHM0M7SUFBQTtJQU9BLENBQUM7SUFORyx1Q0FBWSxHQUFaO1FBQ0ksaUNBQVMsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDRCwyQ0FBZ0IsR0FBaEI7UUFDSSx1Q0FBZSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQU5RLGdCQUFnQjtRQUQ1QixpQkFBVSxFQUFFO09BQ0EsZ0JBQWdCLENBTzVCO0lBQUQsdUJBQUM7Q0FBQSxBQVBELElBT0M7QUFQWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBrZWVwQXdha2UsIGFsbG93U2xlZXBBZ2FpbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtaW5zb21uaWFcIjtcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgS2VlcEF3YWtlU2VydmljZSB7XG4gICAga2VlcFNjcmVlbk9uKCkge1xuICAgICAgICBrZWVwQXdha2UoKTtcbiAgICB9XG4gICAgbGV0U2NyZWVuVHVybk9mZigpIHtcbiAgICAgICAgYWxsb3dTbGVlcEFnYWluKCk7XG4gICAgfVxufVxuIl19