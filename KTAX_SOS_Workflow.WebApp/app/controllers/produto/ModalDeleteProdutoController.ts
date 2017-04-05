/// <reference path="../../configs/_all.ts" />
module Consermaq {
    export class ModalDeleteProdutoController {

        static $inject = ['ProdutoService', 'toastr', '$mdDialog', 'produtos'];

        public produtoService: ProdutoService;
        public toastr: Toastr;
        public mdDialog: any;
        public produtos: Array<Produto>;

        constructor(produtoService: ProdutoService, toastr: Toastr, mdDialog: any, produtos: Array<Produto>) {
            this.produtoService = produtoService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.produtos = produtos;
        }

        public delete() :void {   
             this.produtoService.deleteProdutoAlot(this.produtos)
                .then((data) => {  
                    if(data.length > 1)
                        this.toastr.success("Produtos excluidos com sucesso!"); 
                    else    
                        this.toastr.success("Produto excluido com sucesso!");
             
                    this.mdDialog.hide({produtos: data});                                       
                })
                .catch((response) => {
                    this.toastr.error('Produto não pode ser excluido!');
                })      
        }

        public cancel(): void {
            this.mdDialog.cancel();
        }
    }

    angular.module(appConfig.appName).controller('ModalDeleteProdutoController', ModalDeleteProdutoController);
}