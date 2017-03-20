
// /// <reference path="../configs/_all.ts" />


// module Consermaq {

//     export class WorkflowService extends AppServiceBase implements IAppService{

//         public getById(id: number): any {
//             return super.getByIdFromUrl(appConfig.serviceUrls().workflow.listAll, id);
//         }

//         public listAll(): any {
//             return super.listAllFromUrl(appConfig.serviceUrls().workflow.listAll);
//         }

//         public executaControleAndamentoTarefa(workflow: Workflow): any{
//             return super.postFromUrl(appConfig.serviceUrls().workflow.executaControleAndamentoTarefa, workflow);
//         }

//         public executaControleAndamentoTarefas(workflows: Array<Workflow>): any{
//             return super.postFromUrl(appConfig.serviceUrls().workflow.executaControleAndamentoTarefas, workflows);
//         }

//         public verificarConfiguracao(workflow: Workflow): any{   
        
//             return super.postFromUrl(appConfig.serviceUrls().workflow.verificarConfiguracao, workflow);
            
//         }

//          public verificarDadosSelect(workflows: Array<Workflow>): any{   
        
//             return super.postFromUrl(appConfig.serviceUrls().workflow.verificarDadosSelect, workflows);
            
//         }

//         public atualizarUsuarioTarefa(workflows: Workflow): any{   
        
//             return super.postFromUrl(appConfig.serviceUrls().workflow.atualizarUsuarioTarefa, workflows);
            
//         }

//         public salvarConfiguracao(configuracao: WorkflowConfiguracao): any{
          
//              return super.postFromUrl(appConfig.serviceUrls().workflow.salvarConfiguracao, configuracao);
//         }

//     }

//     angular.module(appConfig.appName).service("WorkflowService", WorkflowService);
// }