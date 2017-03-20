
/// <reference path="../../configs/_all.ts" />


module Consermaq {

    export class AppServiceBase{

        static $inject = ['$rootScope', '$http'];

        public rootScope: IRootScope;
        public httpService: IHttpService;

        constructor($rootScope: IRootScope, $http: IHttpService) {
            this.rootScope = $rootScope;
            this.httpService = $http;
        }

        public handlerResponded(response: any, params?: any): any {
            response.data.requestParams = params;
            return response.data;
        }

        public getByIdFromUrl(url: string, id: number): any {
            var result: ng.IPromise<any> = this.httpService.get(url + '/' + id, this.rootScope.header)
                .then((response: any): ng.IPromise<any> => this.handlerResponded(response, id));
            return result;
        }

        public listAllFromUrl(url: string): any {
            var result: ng.IPromise<any> = this.httpService.get(url, this.rootScope.header)
                .then((response: any): ng.IPromise<any> => this.handlerResponded(response));
            return result;
        }

        public listAllByParamFromUrl(url: string, param: any): any {
            var result: ng.IPromise<any> = this.httpService.get(url + "/" + param, this.rootScope.header)
                .then((response: any): ng.IPromise<any> => this.handlerResponded(response));
            return result;
        }

        public createByUrl(url: string, obj: any): any {
            var result: ng.IPromise<any> = this.httpService.put(url, obj, this.rootScope.header)
                .then((response: any): ng.IPromise<any> => this.handlerResponded(response));
            return result;
        }

        public updateByUrl(url: string, obj: any): any {
            var result: ng.IPromise<any> = this.httpService.post(url, obj, this.rootScope.header)
                .then((response: any): ng.IPromise<any> => this.handlerResponded(response));
            return result;
        }

        public removeByUrl(url: string, id: number): any {
            var result: ng.IPromise<any> = this.httpService.delete(url + "/" + id, this.rootScope.header)
                .then((response: any): ng.IPromise<any> => this.handlerResponded(response));
            return result;
        }

        public getFromUrl(url: string, params?: any): any {
            var result: ng.IPromise<any> = this.httpService.get(url + (params ? params : ""), this.rootScope.header)
                .then((response: any): ng.IPromise<any> => this.handlerResponded(response, (params ? params : "")));
            return result;
        }

         public postFromUrl(url: string, obj: any, header?: any): any {
            if(!header)
                header = this.rootScope.header;

            var result: ng.IPromise<any> = this.httpService.post(url, obj, header)
                .then((response: any): ng.IPromise<any> => this.handlerResponded(response));
            return result;
        }
    }
}