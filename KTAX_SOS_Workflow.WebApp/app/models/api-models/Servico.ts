/// <reference path="../../configs/_all.ts" />
module Consermaq {
    export class Servico {    
        public id: number;
        public date: Date;
        public status: any;
        public ordemServicoId: number;
        public ordemServico: OrdemServico;
        public UserId: number;
        public user: User;

        public servicoItems: Array<ServicoItem>;

        constructor() {              
        }
    }
}

