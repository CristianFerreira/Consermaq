/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class UsuarioController {

        static $inject = ['$location', 'UsuarioService', 'toastr', '$mdDialog', '$timeout','$rootScope'];
        
        private $location: ILocationService;
        private usuarioService: UsuarioService;
        public usuarios: Array<User>;
        public toastr: Toastr;
        public mdDialog: any;
        public timeout: ITimeoutService;
        private $rootScope: IRootScope;
        public selected: Array<any>;
        public limitOptions: Array<any>;
        public options: any;
        public query: any;
        public showCheck: any;
        public promise: any;
        public filterShow: boolean;
        public filterSearch: string;
        public isAdmin: Boolean;

        constructor($location: ILocationService, 
                    usuarioService: UsuarioService, 
                    toastr: Toastr,
                    mdDialog: any,
                    timeout: ITimeoutService,
                    $rootScope: IRootScope) {

            this.$location = $location;
            this.usuarioService = usuarioService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.timeout = timeout;
            this.$rootScope = $rootScope;
            this.usuarios = new Array<User>();
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
            this.showCheck = {};
            this.isAdmin = this.$rootScope.sistemaContexo.usuarioLogado.isAdmin;

            this.loadUsuarios();
        }

        public loadUsuarios() : void {
           this.usuarioService.listAll()
                .then((data) => {                 
                    this.usuarios = data;                               
                })
                .catch((response) => this.toastr.error("Não foi possivel carregar os Usuários, erro: " + response.error));
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


     public modalCreateUsuario (ev: any) : void {
         this.mdDialog.show({
            controller: "ModalUsuarioController",
            templateUrl: 'app/views/usuario/modal-usuario.html',
            targetEvent: ev,
            clickOutsideToClose: true,
            controllerAs: 'vm',
            resolve: {
                             usuario: () => null
                     }
        }).then( (response) => {
            if(response){
                this.usuarios.push(response.NewUsuario);
                this.selected = new Array<any>();        
                this.loadStuff();
            }
        });
     } 

     public modalEditUsuario (ev: any, usuario: User) : void {
        var index = this.usuarios.indexOf(usuario);  
         this.mdDialog.show({
            controller: "ModalUsuarioController",
            templateUrl: 'app/views/usuario/modal-usuario.html',
            targetEvent: ev,
            clickOutsideToClose: true,
            controllerAs: 'vm',
            resolve: {
                             usuario: ()=> angular.copy(usuario)
                     }
        }).then(response => {
                if(response){
                    this.usuarios[index] = response.UpdateUsuario;
                    this.selected = new Array<any>();        
                    this.loadStuff();
                }
            });
     } 
  }

  angular.module(appConfig.appName).controller('UsuarioController', UsuarioController);
}