
/// <reference path="../configs/_all.ts" />


module Travel_World {

    export class CountryService extends AppServiceBase implements IAppService{

        public getById(id: number): any {
            return super.getByIdFromUrl(appConfig.serviceUrls().country.listAll, id);
        }

        public listAll(): any {
            return super.listAllFromUrl(appConfig.serviceUrls().country.listAll);
        }

        public deleteCountry(id: number): any{
              return super.removeByUrl(appConfig.serviceUrls().country.deleteCountry, id);
        }

        public deleteCountryAlot(countries :Array<Country>): any{
              return super.postFromUrl(appConfig.serviceUrls().country.deleteAlotCountry, countries);
        }

        public editCountry(country: Country): any{    
              return super.postFromUrl(appConfig.serviceUrls().country.editCountry, country);
         }
        

         public saveCountry(country: Country): any{
          
              return super.postFromUrl(appConfig.serviceUrls().country.saveCountry, country);
         }

    }

    angular.module(appConfig.appName).service("CountryService", CountryService);
}