

/// <reference path="../../configs/_all.ts" />
module Consermaq {
    export class LoginModel {
        public nomeUsuario: string;
        public senha: string;

        constructor(nomeUsuario?: string, senha?: string) {
            this.nomeUsuario = nomeUsuario;
            this.senha = senha;
        }
    }
} 