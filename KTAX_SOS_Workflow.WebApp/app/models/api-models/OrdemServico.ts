/// <reference path="../../configs/_all.ts" />
module Consermaq {
    export class OrdemServico {    
        public id: number;
        public servicoSolicitado: string;
        public dataInicial: Date;
        public dataEncerramento: Date;
        public Status: any;
        public clienteId: number;
        public Cliente: Cliente;
        
        public servicos: Array<Servico>;

        constructor() {              
        }
    }
}

