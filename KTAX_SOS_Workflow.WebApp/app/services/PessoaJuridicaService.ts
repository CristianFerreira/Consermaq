
/// <reference path="../configs/_all.ts" />


module Consermaq {

    export class PessoaJuridicaService extends AppServiceBase implements IAppService{

        public getById(id: number): any {

            return super.getByIdFromUrl(appConfig.serviceUrls().pessoajuridica.getById, id);
        }

        public listAll(): any {

            return super.listAllFromUrl(appConfig.serviceUrls().pessoajuridica.listAll);
        }

        public deletePessoaJuridica(id: number): any{

              return super.removeByUrl(appConfig.serviceUrls().pessoajuridica.deletePessoaJuridica, id);
        }

        public deletePessoaJuridicaAlot(pessoasjuridicas :Array<PessoaJuridica>): any{

              return super.postFromUrl(appConfig.serviceUrls().pessoajuridica.deleteAlotPessoaJuridica, pessoasjuridicas);
        }

        public editPessoaJuridica(pessoajuridica: PessoaJuridica): any{
          
              return super.updateByUrl(appConfig.serviceUrls().pessoajuridica.editPessoaJuridica, pessoajuridica);
         }
        

         public savePessoaJuridica(pessoajuridica: PessoaJuridica): any{
          
              return super.postFromUrl(appConfig.serviceUrls().pessoajuridica.savePessoaJuridica, pessoajuridica);
         }
    }

    angular.module(appConfig.appName).service("PessoaJuridicaService", PessoaJuridicaService);
}