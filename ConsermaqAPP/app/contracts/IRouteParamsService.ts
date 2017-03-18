/// <reference path="../configs/_all.ts" />

module Travel_World {
    export interface IRouteParamsService extends angular.route.IRouteParamsService {
        id: number;
        categoria: string;
        city: string;
    }
} 