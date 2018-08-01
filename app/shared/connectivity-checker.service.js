"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var ConnectivityCheckService = /** @class */ (function () {
    function ConnectivityCheckService(http) {
        this.http = http;
    }
    /* Returns a promise that resolves if the user has an internet
    connection and rejects if they do not. Assumes http://google.com
    is a valid URL and that the google servers are currently up. */
    ConnectivityCheckService.prototype.checkConnection = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get("http://google.com", {})
                .subscribe(function (resp) { return resolve(); }, function (err) { return reject(); });
        });
    };
    ConnectivityCheckService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ConnectivityCheckService);
    return ConnectivityCheckService;
}());
exports.ConnectivityCheckService = ConnectivityCheckService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGl2aXR5LWNoZWNrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbm5lY3Rpdml0eS1jaGVja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBcUM7QUFDckMsc0NBQTJDO0FBRzNDO0lBRUMsa0NBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBQUcsQ0FBQztJQUVsQzs7bUVBRStEO0lBQy9ELGtEQUFlLEdBQWY7UUFBQSxpQkFNQztRQUxBLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQzdCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQztpQkFDcEMsU0FBUyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsT0FBTyxFQUFFLEVBQVQsQ0FBUyxFQUNsQixVQUFDLEdBQUcsSUFBSyxPQUFBLE1BQU0sRUFBRSxFQUFSLENBQVEsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWJXLHdCQUF3QjtRQURwQyxpQkFBVSxFQUFFO3lDQUdjLFdBQUk7T0FGbEIsd0JBQXdCLENBZXBDO0lBQUQsK0JBQUM7Q0FBQSxBQWZELElBZUM7QUFmWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29ubmVjdGl2aXR5Q2hlY2tTZXJ2aWNlIHtcblx0XG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkge31cblx0XG5cdC8qIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgaWYgdGhlIHVzZXIgaGFzIGFuIGludGVybmV0XG5cdGNvbm5lY3Rpb24gYW5kIHJlamVjdHMgaWYgdGhleSBkbyBub3QuIEFzc3VtZXMgaHR0cDovL2dvb2dsZS5jb21cblx0aXMgYSB2YWxpZCBVUkwgYW5kIHRoYXQgdGhlIGdvb2dsZSBzZXJ2ZXJzIGFyZSBjdXJyZW50bHkgdXAuICovXG5cdGNoZWNrQ29ubmVjdGlvbigpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgXHRcdHRoaXMuaHR0cC5nZXQoXCJodHRwOi8vZ29vZ2xlLmNvbVwiLCB7fSlcbiAgICAgIFx0XHRcdC5zdWJzY3JpYmUoKHJlc3ApID0+IHJlc29sdmUoKSxcbiAgICAgICAgICAgICAgICBcdFx0ICAgKGVycikgPT4gcmVqZWN0KCkpO1xuICAgIFx0fSk7XG5cdH1cblx0XG59XG5cbiJdfQ==