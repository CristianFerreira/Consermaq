
/// <reference path="../configs/_all.ts" />


module Consermaq {

    export class OrdemServicoService extends AppServiceBase implements IAppService{

        public getById(id: number): any {
            return super.getByIdFromUrl(appConfig.serviceUrls().ordemServico.getById, id);
        }

        public listAll(): any {
            return super.listAllFromUrl(appConfig.serviceUrls().ordemServico.listAll);
        }

        public listAllCanceled(): any {
            return super.listAllFromUrl(appConfig.serviceUrls().ordemServico.listAllCanceled);
        }

        public delete(id: number): any{
              return super.removeByUrl(appConfig.serviceUrls().ordemServico.delete, id);
        }

        public deleteAlot(produtos :Array<Produto>): any{
              return super.postFromUrl(appConfig.serviceUrls().ordemServico.deleteAlot, produtos);
        }

        public edit(ordemServico: OrdemServico): any{         
              return super.updateByUrl(appConfig.serviceUrls().ordemServico.edit, ordemServico);
         }
        

         public save(ordemServico: OrdemServico): any{     
              return super.postFromUrl(appConfig.serviceUrls().ordemServico.save, ordemServico);
         }

         public finalizar(ordemServico: OrdemServico): any{     
              return super.postFromUrl(appConfig.serviceUrls().ordemServico.finalizar, ordemServico);
         }

         public cancelar(ordemServico: OrdemServico): any{     
              return super.postFromUrl(appConfig.serviceUrls().ordemServico.cancelar, ordemServico);
         }

         public ativarOrdemServico(ordemServico: OrdemServico): any{     
              return super.postFromUrl(appConfig.serviceUrls().ordemServico.ativarOrdemServico, ordemServico);
         }
        
         public retornarPendente(ordemServico: OrdemServico): any{     
              return super.postFromUrl(appConfig.serviceUrls().ordemServico.retornarPendente, ordemServico);
         }

         public buscarPorData(dataInicial :Date, dataFinal :Date) :any{
              return super.postFromUrl(appConfig.serviceUrls().ordemServico.buscarPorData, {dataInicial: dataInicial, dataEncerramento: dataFinal})
         }
    }

    angular.module(appConfig.appName).service("OrdemServicoService", OrdemServicoService);
}