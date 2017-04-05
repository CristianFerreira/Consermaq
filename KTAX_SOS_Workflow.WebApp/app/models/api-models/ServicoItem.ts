/// <reference path="../../configs/_all.ts" />
module Consermaq {
    export class ServicoItem {    
        public id: number;
        public quantity: number;
        public status: any;
        public productId: number;
        public product: Produto;
        public ServicoId: number;
        public Servico: Servico;

        constructor() {              
        }
    }
}

