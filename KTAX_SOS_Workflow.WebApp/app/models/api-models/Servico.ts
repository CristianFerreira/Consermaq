/// <reference path="../../configs/_all.ts" />
module Consermaq {
    export class Servico {    
        public id: number;
        public status: any;
        public inicioServico: Date;
        public fimServico: Date;
        public servicoEfetuado: string;
        public ocorrencia: string;
        public causa: string;
        public valor: number;
        public ordemServicoId: number;
        public ordemServico: OrdemServico;
        public userId: number;
        public user: User;

        public servicoItems: Array<ServicoItem>;

        constructor() {              
        }
    }
}

