
/// <reference path="../../configs/_all.ts" />


module Travel_World {

    export interface  IAppService {
        
        getById(id: number): any;
        listAll(): any;
        handlerResponded(response: any, params?: any): any;
    }
}