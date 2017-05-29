/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class EditOrdemServicoController {

        static $inject = ['$location', '$routeParams', 'ClienteService', 'OrdemServicoService', 
                            'toastr', '$timeout','$q','$mdDialog'];

     
        private $location: ILocationService;
        public $routeParams: IRouteParamsService;
        private clienteService: ClienteService;
        private ordemServicoService: OrdemServicoService;
        public toastr: Toastr;     
        public timeout: ITimeoutService;
        public $q: ng.IQService;
        public mdDialog: any;
        public ordemServico: OrdemServico;     
        public clientes: Array<Cliente>;
        public cliente: Cliente;
        public tipoCliente: string;
        public textoCliente: any;
        public materiaisAtualizados: Array<Produto>;
        public servicoItemsRemovidos: Array<ServicoItem>;
        public servicosRemovidos: Array<Servico>;
        
       
        public limitOptionsMaterialAdicionado: Array<any>;
        public optionsMaterialAdicionado: any;
        public queryMaterialAdicionado: any;
        public selectedItem : any;
        public searchText   : any;
        public selectedUserIndex: any;
        

        constructor($location: ILocationService, 
                    $routeParams: IRouteParamsService,
                    clienteService: ClienteService, 
                    ordemServicoService: OrdemServicoService,
                    toastr: Toastr,                  
                    timeout: ITimeoutService,
                    $q: ng.IQService,
                    mdDialog: any) {

            this.$location = $location;
            this.$routeParams = $routeParams;
            this.clienteService = clienteService;
            this.ordemServicoService = ordemServicoService;
            this.toastr = toastr;
            this.timeout = timeout;
            this.$q = $q;            
            this.mdDialog = mdDialog;
            this.clientes = new Array<Cliente>();          
            this.ordemServico = new OrdemServico;
            this.servicoItemsRemovidos = new Array<ServicoItem>();

             this.optionsMaterialAdicionado = {
                             rowSelection: true,
                             multiSelect: true,
                             autoSelect: false,
                             decapitate: false,
                             largeEditDialog: false,
                             boundaryLinks: true,
                             limitSelect: true,
                             pageSelect: true
            };
            this.queryMaterialAdicionado = {
                            order: 'name',
                            limit: 3,
                            page: 1
            };
           
            this.materiaisAtualizados = new Array<Produto>();
            this.servicosRemovidos = new Array<Servico>();
            this.selectedUserIndex = undefined;

            this.load();          
        }

        public selectUserIndex (index :any) {
            if (this.selectedUserIndex !== index) {
                    this.selectedUserIndex = index;
            }
            else {
                this.selectedUserIndex = undefined;
            }
        };

        public load (){
            this.loadClientes();
            if (this.$routeParams.id){
                 this.ordemServicoService.getById(this.$routeParams.id)
                 .then((data) => {
                     this.ordemServico = data;
                     this.loadTipoPessoa();
                     this.loadDateFormat();
                 })
                 .catch((response) => toastr.error("Não carregou a ordem de serviço, erro: " + response) );
             }          
        }

        public loadDateFormat() :void {
            if(this.ordemServico.servicos.length > 0) {
                this.ordemServico.servicos.filter((s)=> {
                    s.inicioServico = new Date(s.inicioServico);
                    s.fimServico = new Date(s.fimServico);
                })
            }
        }

        public loadTipoPessoa() :void {
            if(this.ordemServico.cliente.cpf)
                this.tipoCliente = 'pf';
            else
                this.tipoCliente = 'pj';

            this.selectedItem = this.ordemServico.cliente;
        }

        public loadClientes() : void {
           this.clienteService.listAll()
                .then((data) => {                 
                    this.clientes = data; 
                     return this.clientes.map((c) => {
                        c.nome = c.nome.toUpperCase();
                        return c;
                    });                              
                })
                .catch((response) => console.log("Não foi possivel carregar os clientes, erro: " + response));
        }

        public buscarPF (query) :any {
            var results = query ? this.clientes.filter((c) => {return this.filterPF(query,c)} ) : this.clientes.filter((c) => c.cpf != null);
            var deferred = this.$q.defer();
            this.timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            return deferred.promise;
        }

        public filterPF(query, clientePF) :any{
            query = angular.uppercase(query)
            var regex = /^[0-9]/g;    
            if(regex.test(query)){
                if(clientePF.cpf){
                    return (clientePF.cpf.indexOf(query) === 0);
                } else {
                    return false;
                } 
            }
            else {
                if(clientePF.cpf){
                    return (clientePF.nome.indexOf(query) === 0);
                } else {
                    return false;
                } 
            }    
        };


      public buscarPJ (query) :any {
        var results = query ? this.clientes.filter((c) => {return this.filterPJ(query,c)} ) : this.clientes.filter((c) => c.cpf == null);
        var deferred = this.$q.defer();
        this.timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      }

      public filterPJ(query, clientePJ) :any{
        query = angular.uppercase(query)
        var regex = /^[0-9]/g;
        if(regex.test(query)){
             if(clientePJ.cnpj){
                return (clientePJ.cnpj.indexOf(query) === 0);
            } else {
                return false;
            }  
        }
        else {
            if(clientePJ.cnpj)
                 return (clientePJ.nome.indexOf(query) === 0);
        }  
              
      };

      public clearSelectItem() {
          this.selectedItem = new Array<any>();
      }

      public acrescentarValorTotal(valor :number) :void{
          this.ordemServico.valorTotal = Number(this.ordemServico.valorTotal) + Number(valor);
      }

      public diminuirValorTotal(valor :number) :void{
          this.ordemServico.valorTotal = Number(this.ordemServico.valorTotal) - Number(valor);
      }

      public abrirModalServico(ev :Event) :void {
            this.mdDialog.show({
            controller: "ModalServicoController",
            templateUrl: 'app/views/ordemServico/modal-servico.html',
            targetEvent: ev,
            clickOutsideToClose: true,
            controllerAs: 'vm',
             resolve: {
                             ordemServico: () => this.ordemServico,
                             ultimoItems: () => this.materiaisAtualizados,
                             servico: ()=> null

                     }
            }).then( (response) => {
                if(response.newServico){                 
                    this.ordemServico.servicos.push(response.newServico);
                    this.acrescentarValorTotal(response.newServico.valor);
                    if(response.newServico.servicoItems.length > 0)
                        this.atualizaMaterialUsado(response.newServico.servicoItems);    
                }          
            });
      }

      public atualizaMaterialUsado(items :Array<ServicoItem>) :void {        
                items.filter((i) => {
                    var achou = false;
                    this.materiaisAtualizados.filter((m) => {
                        if(m.id == i.product.id){
                            m.quantityOnHand = i.product.quantityOnHand;                         
                            achou = true;
                        }
                    })
                    if(!achou || this.materiaisAtualizados.length == 0)
                        this.materiaisAtualizados.push(i.product);
                })         
      } 

   public editModalServico(ev :Event, servicoEdit: Servico) :void {
            var index = this.ordemServico.servicos.indexOf(servicoEdit);
            var servico = angular.copy(servicoEdit);
            this.mdDialog.show({
            controller: "ModalServicoController",
            templateUrl: 'app/views/ordemServico/modal-servico.html',
            targetEvent: ev,
            clickOutsideToClose: true,
            controllerAs: 'vm',
             resolve: {
                             ordemServico: () => null,
                             ultimoItems: () => this.materiaisAtualizados,
                             servico: ()=> angular.copy(servicoEdit)

                     }
            }).then( (response) => {
                if(response.itemsRemovidos.length > 0){
                    response.itemsRemovidos.filter((i) => {
                        this.servicoItemsRemovidos.push(i);
                    })                  
                }
                if(response.newServico){
                      this.ordemServico.servicos[index] = response.newServico;
                      //atualiza valorTotal
                      if(response.newServico.valor != servico.valor){
                            if(response.newServico.valor > servico.valor)
                                this.acrescentarValorTotal(Number(response.newServico.valor)-Number(servico.valor));
                            else
                                this.diminuirValorTotal(Number(servico.valor)-Number(response.newServico.valor));
                      }
                      //atualiza materiais e items
                      if(response.newServico.servicoItems.length > 0)
                      {
                        if(servico.servicoItems.length > 0){
                            var materiaisRemovidos = this.MateriaisRemovidos(servico.servicoItems, response.newServico.servicoItems);
                            var servicosItems = angular.copy(response.newServico.servicoItems);
                            if(materiaisRemovidos.length > 0){
                                materiaisRemovidos.filter((m) => {
                                    servicosItems.push(m);
                                })          
                            }      
                            this.atualizaMaterialUsado(servicosItems);
                      }                   
                      else {
                            this.atualizaMaterialUsado(response.newServico.servicoItems);
                      }                  
                 }
                 else if(servico.servicoItems.length > 0) {
                             servico.servicoItems.filter((s) => {
                             s.product.quantityOnHand = Number(s.product.quantityOnHand) + Number(s.quantity);
                        })
                        this.atualizaMaterialUsado(servico.servicoItems);
                 }   
               }          
            });
      }

      public MateriaisRemovidos(itemAnterior :Array<ServicoItem>, newItem: Array<ServicoItem>) :Array<ServicoItem> {
           var materiaisRemovidos = new Array<ServicoItem>();         
                itemAnterior.filter((anterior) => {
                       var achou = false;
                        newItem.filter((novo) => {
                            if(anterior.product.id == novo.product.id){
                                achou = true;
                            }
                        })
                        if(!achou){
                            anterior.product.quantityOnHand = Number(anterior.product.quantityOnHand) + Number(anterior.quantity);
                            materiaisRemovidos.push(anterior);
                        }
              })
           return materiaisRemovidos;
      }

      public RemoverMaterialUsado(items :Array<Produto>):void {
            items.filter((i) => {
                this.materiaisAtualizados.filter((m) => {
                    if(i.id == m.id){
                        if((m.quantityOnHand - i.quantityOnHand) > 0) {
                            var index = this.materiaisAtualizados.indexOf(m);
                            this.materiaisAtualizados[index].quantityOnHand = this.materiaisAtualizados[index].quantityOnHand - i.quantityOnHand;
                        }
                        else {
                            var index = this.materiaisAtualizados.indexOf(m);
                            this.materiaisAtualizados.splice(index,1);                        
                        }
                    }
                })
            })
      }


      public removeServico(index :number) {
         //populando produtos para atualizar
         if(this.ordemServico.servicos[index].servicoItems.length > 0)
             this.atualizarMaterialRemovido(this.ordemServico.servicos[index].servicoItems);

         if(this.ordemServico.servicos[index].id > 0) {
             //verificar se possui item e inclui na lista de itens removidos
             if(this.ordemServico.servicos[index].servicoItems.length > 0) {
                 this.ordemServico.servicos[index].servicoItems.filter((s) => {
                     if(s.id > 0){
                         this.servicoItemsRemovidos.push(s);
                     }
                 })
             }
             //adicionando na lista de servicos removidos
             this.servicosRemovidos.push(this.ordemServico.servicos[index]);
             this.diminuirValorTotal(this.ordemServico.servicos[index].valor);
             this.ordemServico.servicos.splice(index,1);   
             this.toastr.success("Servico removido com sucesso");      
         } 
         else 
         {   
             this.diminuirValorTotal(this.ordemServico.servicos[index].valor);       
             this.ordemServico.servicos.splice(index,1);
             this.toastr.success("Servico removido com sucesso");
         }
      }

      public atualizarMaterialRemovido(servicoItems :Array<ServicoItem>) :void {
                if(this.materiaisAtualizados.length > 0){              
                    servicoItems.filter((s) => {
                        var achou = false;
                        this.materiaisAtualizados.filter((m) => {
                            if(m.id == s.product.id){
                                s.product.quantityOnHand = Number(m.quantityOnHand) + Number(s.quantity);
                                achou = true;
                            }
                        })
                        if(!achou){
                            s.product.quantityOnHand = Number(s.product.quantityOnHand) + Number(s.quantity);
                        }
                    })
                } 
                else 
                {
                    servicoItems.filter((s) => {
                        s.product.quantityOnHand = Number(s.product.quantityOnHand) + Number(s.quantity);
                    });
                }          
                this.atualizaMaterialUsado(servicoItems);
      }

      public save() {
        if(this.selectedItem.id){
             this.ordemServico.clienteId = this.selectedItem.id; 
             this.ordemServico.materiaisAtualizados = this.materiaisAtualizados;
             this.ordemServico.servicoItemsRemovidos = this.servicoItemsRemovidos;
             this.ordemServico.servicosRemovidos = this.servicosRemovidos;
             this.ordemServicoService.edit(this.ordemServico)
             .then((data) => {
                    this.ordemServico = data;
                    this.cliente = new Cliente();
                    if(this.loadCliente()){
                         this.toastr.success("Ordem de serviço salva com sucesso!");
                         this.loadTipoPessoa();
                         this.loadDateFormat();
                         this.clearlistas();
                    }
                    else
                        this.toastr.error("Erro ao buscar dados do cliente!")
             }).catch((response) => { this.toastr.error("Erro ao salvar ordem de serviço!");})
        }
     }

     public clearlistas() :void {
         this.materiaisAtualizados = new Array<Produto>();
         this.servicoItemsRemovidos = new Array<ServicoItem>();
         this.servicosRemovidos = new Array<Servico>();
     }

     public loadCliente() :Boolean {
        this.cliente = new Cliente();
        this.clientes.filter((c) => {
            if (c.id == this.ordemServico.clienteId)
                 this.cliente = c;     
        });

        if(this.cliente)
            return true;
        else
            return false;   
    }
    
  }


    angular.module(appConfig.appName).controller('EditOrdemServicoController', EditOrdemServicoController);
}