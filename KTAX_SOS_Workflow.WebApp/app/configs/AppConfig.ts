

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
            
        };
    }
};