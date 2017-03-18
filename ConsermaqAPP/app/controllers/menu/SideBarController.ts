/// <reference path="../../configs/_all.ts" />

module Travel_World {
    export class SideBarController {

        static $inject = ['$mdDialog','CityService','PostService','$location','$mdMenu'];

      
        public $mdDialog: any;
        private cityService: CityService;
        private postService: PostService;
        private $location: ILocationService;
        public $mdMenu: any;
        public currentNavItem: string;
        public originatorEv: any;
        public cities: Array<City>;
        public posts: Array<Post>;

        constructor($mdDialog: any, cityService: CityService, postService: PostService, $location: ILocationService,$mdMenu: any) {        
                this.$mdDialog = $mdDialog;
                this.cityService = cityService;
                this.postService = postService;
                this.$location = $location;
                this.$mdMenu = $mdMenu;
                this.cities = new Array<City>();
                this.posts = new Array<Post>();
                this.loadCity();
                this.loadPost();
                this.setPage();
        }

         public loadCity() : void {
           this.cityService.listAll()
                .then((data) => {                 
                    this.cities = data;                         
                })
                .catch((response) => console.log("Não carregou as cidades para o menu, erro: " + response));
        }

        public loadPost() : void {
           this.postService.listAll()
                .then((data) => {                 
                    this.posts = data; 
                    if(this.posts)
                       this.filterUniqueCityInPost();                         
                })
                .catch((response) => console.log("Não carregou as postagens para o menu, erro: " + response));
        }

        public filterCities(ListIdCity :Array<number>) :void{
            var citiesFilter = new Array<City>();
            ListIdCity.forEach(p => {
                this.cities.filter((c) => {       
                   if(p == c.id)
                        citiesFilter.push(c);
                })
            });

            this.cities = citiesFilter;
        }

        public filterUniqueCityInPost() :void {
            var ListIdCity = new Array<number>();
            var existeId = false;
            var cont = 0;
            this.posts.forEach(p => {
                if(cont == 0){
                    ListIdCity.push(p.cityId);
                    cont++;
                } else{
                    ListIdCity.forEach(c => {
                        if(c == p.cityId)
                            existeId = true;
                    });
                    if(!existeId)
                        ListIdCity.push(p.cityId);
                    else
                        existeId = false;
                }
            });

            this.filterCities(ListIdCity);
        }

        public setPage() :void {
            
            this.currentNavItem = 'page1';
            console.log("executou" + this.currentNavItem);
        }

        public openMenu($mdOpenMenu: any, ev: any) :void{
            this.originatorEv = ev;
            $mdOpenMenu(ev);
        };

        public getClass(path :any): any{
             return (this.$location.path().substr(0, path.length) === path) ? 'active' : '';
        }

        public closeMenu($mdMenu: any, ev: any) :void{
            this.originatorEv = ev;
            $mdMenu.hide();
        };


        public listCity(cityName: string): void {
            this.$location.path("/postagens/cidade/" + cityName);
        }

        public home() :void {
            this.$location.path("/");
        }

        public categorias() : void {
            this.$location.path("/categorias");
        }

        public continentes() : void {
            this.$location.path("/continentes");
        }

        public paises() : void {
            this.$location.path("/paises");
        }

        public cidades() : void {
            this.$location.path("/cidades");
        }

        public postagem() : void {
            this.$location.path("/postagem");
        }

        public logout(): void{
            this.$location.path("/logout");
        }
       
    }

    angular.module(appConfig.appName).controller('SideBarController', SideBarController).config(function($mdThemingProvider) {
               $mdThemingProvider.theme('customTheme') 
                  .primaryPalette('grey')
                  .accentPalette('orange')
                  .warnPalette('red');
               });

   
}