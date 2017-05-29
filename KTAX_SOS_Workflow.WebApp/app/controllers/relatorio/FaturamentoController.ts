/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class FaturamentoController {

        static $inject = ['$location', 'OrdemServicoService', 'toastr', '$mdDialog', 
                            '$timeout', '$rootScope', '$filter'];

        private $location: ILocationService;
        private ordemServicoService: OrdemServicoService;
        public toastr: Toastr;
        public mdDialog: any;
        public timeout: ITimeoutService;
        private $rootScope: IRootScope;
        public filter: angular.IFilterService;
        public ordemServico: Array<OrdemServico>;
        public gridOptions: any;
        public dataMaxCalendarioInicio: Date;
        public dataInicialFiltro: Date;
        public dataFinalFiltro: Date;

        public valor: number;


        constructor($location: ILocationService,
            ordemServicoService: OrdemServicoService,
            toastr: Toastr,
            mdDialog: any,
            timeout: ITimeoutService,
            $rootScope: IRootScope,
            filter: angular.IFilterService) {

            this.$location = $location;
            this.ordemServicoService = ordemServicoService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.timeout = timeout;
            this.$rootScope = $rootScope;
            this.filter = filter;
            this.ordemServico = new Array<OrdemServico>();

            this.dataMaxCalendarioInicio = new Date();
        }

        

        public buscarOrdemServico() :void {
            if(this.dataInicialFiltro){
                this.ordemServicoService.buscarPorData(this.dataInicialFiltro, this.dataFinalFiltro)
                .then((data) => {
                    if(data.length > 0){
                         this.valor = 0;
                        this.valorOrdemServicos(data);
                        this.ordemServico = data;
                        this.toastr.success("Ordem de serviços encontradas");
                    }
                    else
                        this.toastr.info("Não foi encontrado nenhuma ordem de serviço");
                   
                })
                .catch((response) => {
                    this.toastr.error("Não foi encontrado nenhuma ordem de serviço");
                })
            }
        }

        public valorOrdemServicos(ordemServicos :Array<OrdemServico>): void{
            ordemServicos.filter((o) =>{
                this.valor = this.valor + o.valorTotal;
            })
        }
    }

    angular.module(appConfig.appName).controller('FaturamentoController', FaturamentoController);
}