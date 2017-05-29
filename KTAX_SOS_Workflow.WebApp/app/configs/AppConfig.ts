

var appConfig = {
    appName: "Consermaq",
    version: "0.0.1",
    auth_token: "consermaq_token",
    auth_sistema_contexto: "consermaq_user",
    testMode: false,
    defaultRoute: "/",
    rootServiceRoute: "http://localhost:4500/",
    //rootServiceRoute: "https://ktax2.kpmg.com.br/KTAX_SOS_Workflow/",
    serviceUrls: ()=> {
        return {
            autenticacao:{
                sistema: appConfig.rootServiceRoute + "api/security/token"
            },
            cliente: {
                listAll: appConfig.rootServiceRoute + "api/cliente/listAll",
                getById: appConfig.rootServiceRoute + "api/pessoafisica/getById",
                listAllPF: appConfig.rootServiceRoute + "api/cliente/listPF",
                listAllPJ: appConfig.rootServiceRoute + "api/cliente/listPJ",
                delete: appConfig.rootServiceRoute + "api/cliente/delete",
                edit:  appConfig.rootServiceRoute + "api/cliente/update",
                save: appConfig.rootServiceRoute + "api/cliente/create",
                deleteAlot: appConfig.rootServiceRoute + "api/cliente/deleteAlot"   
            },  
             produto: {
                getById: appConfig.rootServiceRoute + "api/product/getById",
                listAll: appConfig.rootServiceRoute + "api/products/listAll",
                deleteProduto: appConfig.rootServiceRoute + "api/product/delete",
                editProduto:  appConfig.rootServiceRoute + "api/product/update",
                saveProduto: appConfig.rootServiceRoute + "api/product/create",
                deleteAlotProduto: appConfig.rootServiceRoute + "api/product/deleteAlot"   
            },  
            ordemServico: {
                listAll: appConfig.rootServiceRoute + "api/ordemServico/listAll",
                listAllCanceled: appConfig.rootServiceRoute + "api/ordemServico/listAllCanceled",
                getById: appConfig.rootServiceRoute + "api/ordemServico/getById",
                delete: appConfig.rootServiceRoute + "api/ordemServico/delete",
                edit:  appConfig.rootServiceRoute + "api/ordemServico/update",
                save: appConfig.rootServiceRoute + "api/ordemServico/create",
                deleteAlot: appConfig.rootServiceRoute + "api/ordemServico/deleteAlot",
                finalizar: appConfig.rootServiceRoute + "api/ordemServico/finalizar",
                cancelar: appConfig.rootServiceRoute + "api/ordemServico/cancelar",
                ativarOrdemServico: appConfig.rootServiceRoute + "api/ordemServico/ativarOrdemServico",
                retornarPendente: appConfig.rootServiceRoute + "api/ordemServico/retornarPendente",
                buscarPorData: appConfig.rootServiceRoute + "api/ordemServico/buscarPorData",
            },  
            servico: {
                listAll: appConfig.rootServiceRoute + "api/servico/listAll",
                getById: appConfig.rootServiceRoute + "api/servico/getById",
                delete: appConfig.rootServiceRoute + "api/servico/delete",
                edit:  appConfig.rootServiceRoute + "api/servico/update",
                save: appConfig.rootServiceRoute + "api/servico/create",
                deleteAlot: appConfig.rootServiceRoute + "api/servico/deleteAlot"  
            },  
            usuario: {
                listAll: appConfig.rootServiceRoute + "api/user/listAll",
                getById: appConfig.rootServiceRoute + "api/user/getById",
                edit:  appConfig.rootServiceRoute + "api/user/update",
                save: appConfig.rootServiceRoute + "api/user/create",
                bloquearAlot: appConfig.rootServiceRoute + "api/user/bloquearAlot"  
            }                                                        
        };
    }
};