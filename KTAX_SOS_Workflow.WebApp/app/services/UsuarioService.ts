
/// <reference path="../configs/_all.ts" />


module Consermaq {

    export class UsuarioService extends AppServiceBase implements IAppService{

        public getById(id: number): any {

            return super.getByIdFromUrl(appConfig.serviceUrls().usuario.getById, id);
        }

        public listAll(): any {
            return super.listAllFromUrl(appConfig.serviceUrls().usuario.listAll);
        }

        public bloquearAlot(usuarios :Array<User>): any{

              return super.postFromUrl(appConfig.serviceUrls().usuario.bloquearAlot, usuarios);
        }

        public edit(usuario: User): any{ 
              return super.updateByUrl(appConfig.serviceUrls().usuario.edit, usuario);
         }
        

         public save(usuario: User): any{
              return super.postFromUrl(appConfig.serviceUrls().usuario.save, usuario);
         }
    }

    angular.module(appConfig.appName).service("UsuarioService", UsuarioService);
}