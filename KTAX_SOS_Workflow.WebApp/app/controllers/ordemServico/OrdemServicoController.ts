/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class OrdemServicoController {

        static $inject = ['$location', 'OrdemServicoService', 'toastr', '$mdDialog',
                          '$timeout','$q','$mdToast', '$rootScope'];

     
        private $location: ILocationService;
        private ordemServicoService: OrdemServicoService;
        public toastr: Toastr;
        public mdDialog: any;
        public timeout: ITimeoutService;
        public $q: ng.IQService;
        public $mdToast: any;
        private $rootScope: IRootScope;
        public selected: Array<any>;
        public limitOptions: Array<any>;
        public options: any;
        public query: any;
        public promise: any;
        public filterShow: boolean;
        public filterSearch: string;
        public ordemServicos: Array<OrdemServico>;
        public ordemServicosTotal: Array<OrdemServico>;
        public isAdmin: Boolean;

        //filtros table
        public status :any;
        public tiposClientes: any;      
        public statusFiltro: Array<number>;
        public tipoClienteFiltro: any;
        public tipoData: any;
        public filtrarData: string;
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
                    $mdToast: any,
                    $rootScope: IRootScope) {

            this.$location = $location;
            this.ordemServicoService = ordemServicoService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.timeout = timeout;
            this.$q = $q;
            this.$mdToast = $mdToast;
            this.$rootScope = $rootScope;
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
                            limit: 5,
                            page: 1
            };
            this.ordemServicos = new Array<OrdemServico>();
            this.ordemServicosTotal =  new Array<OrdemServico>();
            this.isAdmin = this.$rootScope.sistemaContexo.usuarioLogado.isAdmin;

            this.statusFiltro = new Array<number>();
            this.status = [{id:1, nome:'Aberto'}, {id:2, nome:'Pendente'}, {id:3, nome:'Finalizado'}];
            this.tiposClientes = [{id:1, nome:'Pessoa Física'}, {id:2, nome:'Pessoa Jurídica'}];
            this.tipoData = [{id:1, nome:'Abertura'}, {id:2, nome:'Encerramento'}]

            this.dataMinCalendarioInicio = new Date();
            this.dataMinCalendarioInicio.setDate(- 60);
            this.dataMaxCalendarioInicio = new Date();
            
            this.loadOrdemServicos();
        }


        public loadOrdemServicos() : void {
           this.ordemServicoService.listAll()
                .then((data) => {                 
                    this.ordemServicos = data;
                    this.ordemServicosTotal = data;                             
                })
                .catch((response) => console.log("Não foi possivel carregar os Produtos, erro: " + response));
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

       public editOrdemServico(id :number) : void {
          this.$location.path("ordemServico/" + id);
       } 

        public modalCreateOrdemServico (ev: any) : void {
                this.mdDialog.show({
                    controller: "ModalOrdemServicoController",
                    templateUrl: 'app/views/ordemServico/modal-novaOrdemServico.html',
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    controllerAs: 'vm',
                }).then( (response) => {
                    if(response.newOrdemServico){
                        this.ordemServicos.push(response.newOrdemServico);
                        this.selected = new Array<any>();        
                    }
                        
                });
        }

        public abrirModalCancelar(ev :any, ordemServico :OrdemServico) :void{
            this.mdDialog.show({
                controller  : 'CancelarController',
                templateUrl : 'app/views/ordemServico/modal/cancelar-modal.html',
                targetEvent: ev,
                clickOutsideToClose: true,
                controllerAs: 'vm',
                resolve: {
                                ordemServico: ()=> ordemServico
                         }
            }).then( (response) => {
                if(response.ordemServicoCancelada){
                    var index = this.ordemServicos.map(function(os) {
                            return os.id;
                    }).indexOf(response.ordemServicoCancelada.id);
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

        public finalizar(ordemServico :OrdemServico) :void{
            this.ordemServicoService.finalizar(ordemServico)
            .then((data) => {
                var index = this.ordemServicos.indexOf(ordemServico);
                if(index != -1){
                    data.cliente = ordemServico.cliente;
                    data.servicos = ordemServico.servicos;
                    this.ordemServicos[index] = data;
                    this.toastr.success("Ordem de Serviço: "+ordemServico.id,"Finalizada com sucesso!")
                }
            })
            .catch((response) => {this.toastr.error("Erro ao finalizar ordem de serviço: "+response)})
        }

        
        public retornarPendente(ordemServico :OrdemServico) : void {
            this.ordemServicoService.retornarPendente(ordemServico)
            .then((data) => {
                var index = this.ordemServicos.indexOf(ordemServico);
                if(index != -1){
                    data.cliente = ordemServico.cliente;
                    data.servicos = ordemServico.servicos;
                    this.ordemServicos[index] = data;
                    this.toastr.success("Ordem de Serviço: "+ordemServico.id,"Retornado para pendente com sucesso!")
                }
            })
            .catch((response) => {this.toastr.error("Erro ao retornar a ordem de serviço para pendente: "+response)})
        }

        public possuiFiltro() :boolean {
            return (this.filtrarData != 'Nenhuma') && (this.dataInicialFiltro != null && this.dataInicialFiltro != undefined)
                   || (this.statusFiltro.length > 0) || (this.tipoClienteFiltro != null && this.tipoClienteFiltro != undefined
                   && this.tipoClienteFiltro != 'Nenhum');
        }

        public clearFiltro() :void{
            this.filtrarData == 'Nenhuma';
            this.dataInicialFiltro = null;
            this.dataFinalFiltro = null;
            this.statusFiltro = new Array<number>();
            this.tipoClienteFiltro = 'Nenhum';
            this.filterTable();
        }

        public filterTable() :void{
            if(this.filtrarData == 'Nenhuma'){
                this.dataInicialFiltro = null;
                this.dataFinalFiltro = null
            }

            if(this.statusFiltro.length > 0){
                this.ordemServicos = this.modificarTableStatus();
                if(this.tipoClienteFiltro && this.tipoClienteFiltro != 'Nenhum')
                    this.ordemServicos = this.modificarTableTipoCliente(this.ordemServicos);

                if(this.dataInicialFiltro)
                    this.ordemServicos = this.modificarTableTipoData(this.ordemServicos);    
            }
            else if(this.tipoClienteFiltro && this.tipoClienteFiltro != 'Nenhum'){
                this.ordemServicos = this.modificarTableTipoCliente(this.ordemServicosTotal);
                if(this.dataInicialFiltro)
                    this.ordemServicos = this.modificarTableTipoData(this.ordemServicos);
            }
            else if(this.dataInicialFiltro)
                this.ordemServicos = this.modificarTableTipoData(this.ordemServicosTotal);
            else
                this.ordemServicos = this.ordemServicosTotal;
        }

        public modificarTableStatus() :Array<OrdemServico> {
            var ordemServico = new Array<OrdemServico>();
            this.ordemServicosTotal.filter((os) => {
                return this.statusFiltro.filter((s) => {
                    if(os.status == s)
                        ordemServico.push(os);
                })               
            });
            return ordemServico;
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
                    if(this.filtrarData == 'Abertura'){
                        if(this.dataFinalFiltro)
                            return (new Date(os.dataInicial) >= this.dataInicialFiltro) && ((new Date(os.dataInicial).getDate() >= this.dataFinalFiltro.getDate()) 
                                    && (new Date(os.dataInicial).getMonth() < this.dataFinalFiltro.getMonth()) || (new Date(os.dataInicial).getDate() <= this.dataFinalFiltro.getDate()) 
                                    && (new Date(os.dataInicial).getMonth() <= this.dataFinalFiltro.getMonth()));
                        else
                            return new Date(os.dataInicial) >= this.dataInicialFiltro;
                    }else {
                        if(this.dataFinalFiltro)
                            return (new Date(os.dataEncerramento) >= this.dataInicialFiltro) && (new Date(os.dataEncerramento).getDate() <= this.dataFinalFiltro.getDate())
                                    && (new Date(os.dataEncerramento).getMonth() <= this.dataFinalFiltro.getMonth());
                        else
                            return new Date(os.dataEncerramento) >= this.dataInicialFiltro;
                    }
            });
            return novaOrdemServicos;
        }

  }
 
    angular.module(appConfig.appName).controller('OrdemServicoController', OrdemServicoController);

     
}