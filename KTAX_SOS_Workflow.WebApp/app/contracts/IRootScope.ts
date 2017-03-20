/// <reference path="../configs/_all.ts" />

module Consermaq {
    export interface IRootScope extends ng.IRootScopeService {
        header: any;
        token: string;
        sistemaContexo: SistemaContexto;
    }
}