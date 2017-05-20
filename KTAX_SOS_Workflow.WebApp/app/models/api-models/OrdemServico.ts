/// <reference path="../../configs/_all.ts" />
module Consermaq {
    export class OrdemServico {    
        public id: number;
        public servicoSolicitado: string;
        public dataInicial: Date;
        public dataEncerramento: Date;
        public status: any;
        public valorTotal: number;
        public clienteId: number;
        public cliente: Cliente;
        
        public servicos: Array<Servico>;
        public materiaisAtualizados: Array<Produto>;
        public servicoItemsRemovidos: Array<ServicoItem>;
        public servicosRemovidos: Array<Servico>;

        constructor() {       
        }
    }
}

