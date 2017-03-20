

var appConfig = {
    appName: "consermaq",
    version: "0.0.1",
    auth_token: "consermaq_token",
    auth_sistema_contexto: "consermaq_user",
    testMode: false,
    defaultRoute: "/",
    rootServiceRoute: "http://localhost:51240/",
    serviceUrls: ()=> {
        return {
            autenticacao:{
                sistema: appConfig.rootServiceRoute + "api/security/token"
            },
                   
          
        };
    }
};