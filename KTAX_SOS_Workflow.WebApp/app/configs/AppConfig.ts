

var appConfig = {
    appName: "Consermaq",
    version: "0.0.1",
    auth_token: "consermaq_token",
    auth_sistema_contexto: "consermaq_user",
    testMode: false,
    defaultRoute: "/",
    rootServiceRoute: "http://localhost:4100/",
    //rootServiceRoute: "https://ktax2.kpmg.com.br/KTAX_SOS_Workflow/",
    serviceUrls: ()=> {
        return {
            autenticacao:{
                sistema: appConfig.rootServiceRoute + "api/security/token"
            },
            pessoafisica: {
                getById: appConfig.rootServiceRoute + "api/pessoafisica/getById",
                listAll: appConfig.rootServiceRoute + "api/pessoafisica/listAll",
                deletePessoaFisica: appConfig.rootServiceRoute + "api/pessoafisica/delete",
                editPessoaFisica:  appConfig.rootServiceRoute + "api/pessoafisica/update",
                savePessoaFisica: appConfig.rootServiceRoute + "api/pessoafisica/create",
                deleteAlotPessoaFisica: appConfig.rootServiceRoute + "api/pessoafisica/deleteAlot"   
            }, 
            pessoajuridica: {
                getById: appConfig.rootServiceRoute + "api/pessoajuridica/getById",
                listAll: appConfig.rootServiceRoute + "api/pessoajuridica/listAll",
                deletePessoaJuridica: appConfig.rootServiceRoute + "api/pessoajuridica/delete",
                editPessoaJuridica:  appConfig.rootServiceRoute + "api/pessoajuridica/update",
                savePessoaJuridica: appConfig.rootServiceRoute + "api/pessoajuridica/create",
                deleteAlotPessoaJuridica: appConfig.rootServiceRoute + "api/pessoajuridica/deleteAlot"   
            },                                
        };
    }
};