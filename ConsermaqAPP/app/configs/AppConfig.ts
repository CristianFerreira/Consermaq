

var appConfig = {
    appName: "travel_World",
    version: "0.0.1",
    auth_token: "travel_world_token",
    auth_sistema_contexto: "travel_world_user",
    testMode: false,
    defaultRoute: "/",
    rootServiceRoute: "http://localhost:51240/",
    serviceUrls: ()=> {
        return {
            autenticacao:{
                sistema: appConfig.rootServiceRoute + "api/security/token"
            },
            category: {
                listAll: appConfig.rootServiceRoute + "api/categories",
                executaControleAndamentoTarefa: appConfig.rootServiceRoute + "api/workflow/ExecutaControleAndamentoTarefa",
                executaControleAndamentoTarefas: appConfig.rootServiceRoute + "api/workflow/ExecutaControleAndamentoTarefas",
                deleteCategory: appConfig.rootServiceRoute + "api/categories",
                deleteAlotCategories: appConfig.rootServiceRoute + "api/categories/deleteAlot",
                editCategory:  appConfig.rootServiceRoute + "api/categories/update",
                saveCategory: appConfig.rootServiceRoute + "api/categories/create"        
            },
            city: {
                listAll: appConfig.rootServiceRoute + "api/cities",
                deleteCity: appConfig.rootServiceRoute + "api/",
                editCity:  appConfig.rootServiceRoute + "api/cities/update",
                saveCity: appConfig.rootServiceRoute + "api/cities/create",
                deleteAlotCity: appConfig.rootServiceRoute + "api/cities/deleteAlot"   
            },
             continent: {
                listAll: appConfig.rootServiceRoute + "api/continent/listAll",
                deleteContinent: appConfig.rootServiceRoute + "api/continent/delete",
                editContinent:  appConfig.rootServiceRoute + "api/continent/update",
                saveContinent: appConfig.rootServiceRoute + "api/continent/create",
                deleteAlotContinent: appConfig.rootServiceRoute + "api/continent/deleteAlot"    
            },
              country: {
                listAll: appConfig.rootServiceRoute + "api/countries/listAll",
                deleteCountry: appConfig.rootServiceRoute + "api/countries/delete",
                editCountry:  appConfig.rootServiceRoute + "api/countries/update",
                saveCountry: appConfig.rootServiceRoute + "api/countries/create",
                deleteAlotCountry: appConfig.rootServiceRoute + "api/countries/deleteAlot"    
            },
              post: {
                listAll: appConfig.rootServiceRoute + "api/post/listAll",
                getById: appConfig.rootServiceRoute + "api/post/",
                getByCategoria:  appConfig.rootServiceRoute + "api/get/categoria/",
                getByCity:  appConfig.rootServiceRoute + "api/get/cidade/",
                deletePost: appConfig.rootServiceRoute + "api/post/delete",
                editPost:  appConfig.rootServiceRoute + "api/post/update",
                savePost: appConfig.rootServiceRoute + "api/post/create",
                deleteAlotPost: appConfig.rootServiceRoute + "api/post/deleteAlot"
             },
              comment: {
                listAll: appConfig.rootServiceRoute + "api/comment/listAll",
                getById: appConfig.rootServiceRoute + "api/comment/",
                deleteComment: appConfig.rootServiceRoute + "api/comment/delete",
                editComment:  appConfig.rootServiceRoute + "api/comment/update",
                saveComment: appConfig.rootServiceRoute + "api/comment/create",
                deleteAlotComment: appConfig.rootServiceRoute + "api/comment/deleteAlot"    
            }
        };
    }
};