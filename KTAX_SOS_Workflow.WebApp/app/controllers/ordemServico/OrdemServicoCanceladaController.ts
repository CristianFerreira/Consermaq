/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class OrdemServicoCanceladaController {

        static $inject = ['$location', 'OrdemServicoService', 'toastr', '$mdDialog', '$timeout','$q','$mdToast'];

        private $location: ILocationService;
        private ordemServicoService: OrdemServicoService;
        public toastr: Toastr;
        public mdDialog: any;
        public timeout: ITimeoutService;
        public $q: ng.IQService;
        public $mdToast: any;
        public selected: Array<any>;
        public limitOptions: Array<any>;
        public options: any;
        public query: any;
        public promise: any;
        public filterShow: boolean;
        public filterSearch: string;
        public ordemServicos: Array<OrdemServico>;
        public ordemServicosTotal: Array<OrdemServico>;

        //filtros table
        public tiposClientes: any;      
        public tipoClienteFiltro: any;
        public tipoData: any;
        public dataMinCalendarioInicio: Date;
        public dataMaxCalendarioInicio: Date;
        public dataInicialFiltro: Date;
        public dataFinalFiltro: Date;

        constructor($location: ILocationService, 
                    ordemServicoService: OrdemServicoService, 
                    toastr: Toastr,
                    mdDialog: any,
                    timeout: ITimeoutService,
                    $q: ng.IQService,
                    $mdToast: any) {

            this.$location = $location;
            this.ordemServicoService = ordemServicoService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.timeout = timeout;
            this.$q = $q;
            this.$mdToast = $mdToast;
            this.selected =  [];
            this.limitOptions = [5, 10, 15];
            this.options = {
                             rowSelection: true,
                             multiSelect: true,
                             autoSelect: false,
                             decapitate: false,
                             largeEditDialog: false,
                             boundaryLinks: true,
                             limitSelect: true,
                             pageSelect: true
            };
            this.query = {
                            order: 'name',
                            limit: 10,
                            page: 1
            };
            this.ordemServicos = new Array<OrdemServico>();
            this.ordemServicosTotal =  new Array<OrdemServico>();
            this.tiposClientes = [{id:1, nome:'Pessoa Física'}, {id:2, nome:'Pessoa Jurídica'}];
            this.tipoData = [{id:1, nome:'Abertura'}, {id:2, nome:'Encerramento'}]

            this.dataMinCalendarioInicio = new Date();
            this.dataMinCalendarioInicio.setDate(- 60);
            this.dataMaxCalendarioInicio = new Date();
            
            this.loadOrdemServicos();
        }


        public loadOrdemServicos() : void {
           this.ordemServicoService.listAllCanceled()
                .then((data) => {                 
                    this.ordemServicos = data;
                    this.ordemServicosTotal = data;                             
                })
                .catch((response) => console.log("Não foi possivel carregar as ordem de servicos, erro: " + response));
        }

        
        public removeFilter () : void {
            this.filterShow = false;
            this.filterSearch = '';
        };
        

       public toggleLimitOptions () : any {
             this.limitOptions = this.limitOptions ? undefined : [5, 10, 15];
        };

       public loadStuff () : any {
            this.promise = this.timeout(function () {
            // loading
            }, 2000);
       }

        public abrirModalAtivarOrdemServico(ev :any, ordemServico :OrdemServico) :void{
            this.mdDialog.show({
                controller  : 'AtivarOrdemServicoController',
                templateUrl : 'app/views/ordemServico/modal/ativar-ordemServico-modal.html',
                targetEvent: ev,
                clickOutsideToClose: true,
                controllerAs: 'vm',
                resolve: {
                                ordemServico: ()=> ordemServico
                         }
            }).then( (response) => {
                if(response.ordemServicoAtivada){
                    var index = this.ordemServicos.map(function(os) {
                            return os.id;
                    }).indexOf(response.ordemServicoAtivada.id);
                    if(index != -1)
                        this.ordemServicos.splice(index,1);
                 }
            });
        } 

        public abrirModalVisualizar(ev: any, ordemServico :OrdemServico) :void {
            this.ordemServicoService.getById(ordemServico.id)
                .then((data) => {
                    var ordemServicoVisualizacao = data;
                    this.mdDialog.show({
                    controller  : 'VisualizarController',
                    templateUrl : 'app/views/ordemServico/modal/visualizar-modal.html',
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    controllerAs: 'vm',
                    resolve: {
                                    ordemServico: ()=> ordemServicoVisualizacao
                            }
                });
            })
            .catch(() => {this.toastr.error("Erro ao abrir modal visualização")});   
        }

        public possuiFiltro() :boolean {
            return (this.dataInicialFiltro != null && this.dataInicialFiltro != undefined)
                   || (this.tipoClienteFiltro != null && this.tipoClienteFiltro != undefined
                   && this.tipoClienteFiltro != 'Nenhum');
        }

        public clearFiltro() :void{
            this.dataInicialFiltro = null;
            this.dataFinalFiltro = null;
            this.tipoClienteFiltro = 'Nenhum';
            this.filterTable();
        }

        public filterTable() :void{
            if(this.tipoClienteFiltro && this.tipoClienteFiltro != 'Nenhum'){
                this.ordemServicos = this.modificarTableTipoCliente(this.ordemServicos);
                if(this.dataInicialFiltro)
                    this.ordemServicos = this.modificarTableTipoData(this.ordemServicos);    
            }
            else if(this.dataInicialFiltro)
                this.ordemServicos = this.modificarTableTipoData(this.ordemServicosTotal);
            else
                this.ordemServicos = this.ordemServicosTotal;
        }

        public modificarTableTipoCliente(ordemServicos :Array<OrdemServico>) :Array<OrdemServico> {
            var novaOrdemServicos = new Array<OrdemServico>();
            novaOrdemServicos = ordemServicos.filter((os) => {
                    if(this.tipoClienteFiltro == 1)
                        return os.cliente.cpf != null && os.cliente.cnpj == null
                    else
                       return os.cliente.cpf == null && os.cliente.cnpj != null            
            });
            return novaOrdemServicos;
        }

        public modificarTableTipoData(ordemServicos :Array<OrdemServico>) :Array<OrdemServico> {
            var novaOrdemServicos = new Array<OrdemServico>();
            novaOrdemServicos = ordemServicos.filter((os) => {
                 if(this.dataFinalFiltro)
                            return (new Date(os.dataInicial) >= this.dataInicialFiltro) && ((new Date(os.dataInicial).getDate() >= this.dataFinalFiltro.getDate()) 
                                    && (new Date(os.dataInicial).getMonth() < this.dataFinalFiltro.getMonth()) || (new Date(os.dataInicial).getDate() <= this.dataFinalFiltro.getDate()) 
                                    && (new Date(os.dataInicial).getMonth() <= this.dataFinalFiltro.getMonth()));
                else
                            return new Date(os.dataInicial) >= this.dataInicialFiltro;
            });
            return novaOrdemServicos;
        }
  }
 
    angular.module(appConfig.appName).controller('OrdemServicoCanceladaController', OrdemServicoCanceladaController);

     
}