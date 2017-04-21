
/// <reference path="../configs/_all.ts" />


module Consermaq {

    export class ServicoService extends AppServiceBase implements IAppService{

        public getById(id: number): any {
            return super.getByIdFromUrl(appConfig.serviceUrls().servico.getById, id);
        }

        public listAll(): any {
            return super.listAllFromUrl(appConfig.serviceUrls().servico.listAll);
        }

        public delete(id: number): any{
              return super.removeByUrl(appConfig.serviceUrls().servico.delete, id);
        }

        public deleteAlot(servicos :Array<Servico>): any{
              return super.postFromUrl(appConfig.serviceUrls().servico.deleteAlot, servicos);
        }

        public edit(servico: Servico): any{         
              return super.updateByUrl(appConfig.serviceUrls().servico.edit, servico);
         }
        

         public save(servico: Servico): any{     
              return super.postFromUrl(appConfig.serviceUrls().servico.save, servico);
         }
    }

    angular.module(appConfig.appName).service("ServicoService", ServicoService);
}