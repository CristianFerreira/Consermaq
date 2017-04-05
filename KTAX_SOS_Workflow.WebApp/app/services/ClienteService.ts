
/// <reference path="../configs/_all.ts" />


module Consermaq {

    export class ClienteService extends AppServiceBase implements IAppService{

        public getById(id: number): any {

            return super.getByIdFromUrl(appConfig.serviceUrls().cliente.getById, id);
        }

        public listAll(): any {
            return super.listAllFromUrl(appConfig.serviceUrls().cliente.listAll);
        }

        public listAllPF(): any {
            return super.listAllFromUrl(appConfig.serviceUrls().cliente.listAllPF);
        }

         public listAllPJ(): any {
            return super.listAllFromUrl(appConfig.serviceUrls().cliente.listAllPJ);
        }

        public delete(id: number): any{

              return super.removeByUrl(appConfig.serviceUrls().cliente.delete, id);
        }

        public deleteAlot(clientes :Array<Cliente>): any{

              return super.postFromUrl(appConfig.serviceUrls().cliente.deleteAlot, clientes);
        }

        public edit(cliente: Cliente): any{
          
              return super.updateByUrl(appConfig.serviceUrls().cliente.edit, cliente);
         }
        

         public save(cliente: Cliente): any{
          
              return super.postFromUrl(appConfig.serviceUrls().cliente.save, cliente);
         }
    }

    angular.module(appConfig.appName).service("ClienteService", ClienteService);
}