/// <reference path="../../configs/_all.ts" />
module Consermaq {
    export class Cliente {  
        public id: number;
        public nome: string;
        public rua: string;
        public numero: string;
        public bairro: string;
        public observacao: string;
        public cep: string;
        public celular: string;
        public telefone: string;
  
        public cpf: string;
        public cnpj: string;

        public ordemServicos: Array<OrdemServico>;

        constructor() {        
        }
    }
}
