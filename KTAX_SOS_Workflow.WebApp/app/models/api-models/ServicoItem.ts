/// <reference path="../../configs/_all.ts" />
module Consermaq {
    export class ServicoItem {    
        public id: number;
        public quantity: number;
        public productId: number;
        public product: Produto;
        public servicoId: number;
        public servico: Servico;

        constructor() {              
        }
    }
}

