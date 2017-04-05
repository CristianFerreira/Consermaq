
/// <reference path="../configs/_all.ts" />


module Consermaq {

    export class OrdemServicoService extends AppServiceBase implements IAppService{

        public getById(id: number): any {
            return super.getByIdFromUrl(appConfig.serviceUrls().ordemServico.getById, id);
        }

        public listAll(): any {
            return super.listAllFromUrl(appConfig.serviceUrls().ordemServico.listAll);
        }

        public delete(id: number): any{
              return super.removeByUrl(appConfig.serviceUrls().ordemServico.delete, id);
        }

        public deleteAlot(produtos :Array<Produto>): any{
              return super.postFromUrl(appConfig.serviceUrls().ordemServico.deleteAlot, produtos);
        }

        public edit(produto: Produto): any{         
              return super.updateByUrl(appConfig.serviceUrls().ordemServico.edit, produto);
         }
        

         public save(ordemServico: OrdemServico): any{     
              return super.postFromUrl(appConfig.serviceUrls().ordemServico.save, ordemServico);
         }
    }

    angular.module(appConfig.appName).service("OrdemServicoService", OrdemServicoService);
}