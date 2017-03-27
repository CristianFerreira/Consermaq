
/// <reference path="../configs/_all.ts" />


module Consermaq {

    export class PessoaFisicaService extends AppServiceBase implements IAppService{

        public getById(id: number): any {

            return super.getByIdFromUrl(appConfig.serviceUrls().pessoafisica.getById, id);
        }

        public listAll(): any {

            return super.listAllFromUrl(appConfig.serviceUrls().pessoafisica.listAll);
        }

        public deletePessoaFisica(id: number): any{

              return super.removeByUrl(appConfig.serviceUrls().pessoafisica.deletePessoaFisica, id);
        }

        public deletePessoaFisicaAlot(pessoasfisicas :Array<PessoaFisica>): any{

              return super.postFromUrl(appConfig.serviceUrls().pessoafisica.deleteAlotPessoaFisica, pessoasfisicas);
        }

        public editPessoaFisica(pessoafisica: PessoaFisica): any{
          
              return super.updateByUrl(appConfig.serviceUrls().pessoafisica.editPessoaFisica, pessoafisica);
         }
        

         public savePessoaFisica(pessoafisica: PessoaFisica): any{
          
              return super.postFromUrl(appConfig.serviceUrls().pessoafisica.savePessoaFisica, pessoafisica);
         }
    }

    angular.module(appConfig.appName).service("PessoaFisicaService", PessoaFisicaService);
}