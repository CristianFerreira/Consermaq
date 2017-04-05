
/// <reference path="../configs/_all.ts" />


module Consermaq {

    export class ProdutoService extends AppServiceBase implements IAppService{

        public getById(id: number): any {
            return super.getByIdFromUrl(appConfig.serviceUrls().produto.getById, id);
        }

        public listAll(): any {
            return super.listAllFromUrl(appConfig.serviceUrls().produto.listAll);
        }

        public deleteProduto(id: number): any{
              return super.removeByUrl(appConfig.serviceUrls().produto.deleteProduto, id);
        }

        public deleteProdutoAlot(produtos :Array<Produto>): any{
              return super.postFromUrl(appConfig.serviceUrls().produto.deleteAlotProduto, produtos);
        }

        public editProduto(produto: Produto): any{         
              return super.updateByUrl(appConfig.serviceUrls().produto.editProduto, produto);
         }
        

         public saveProduto(produto: Produto): any{     
              return super.postFromUrl(appConfig.serviceUrls().produto.saveProduto, produto);
         }
    }

    angular.module(appConfig.appName).service("ProdutoService", ProdutoService);
}