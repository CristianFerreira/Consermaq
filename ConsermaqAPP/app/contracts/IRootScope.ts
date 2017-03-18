/// <reference path="../configs/_all.ts" />

module Travel_World {
    export interface IRootScope extends ng.IRootScopeService {
        header: any;
        token: string;
        sistemaContexo: SistemaContexto;
    }
}