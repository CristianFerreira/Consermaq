/// <reference path="../../configs/_all.ts" />
module Consermaq {
    export class ModalProdutoController {

        static $inject = ['ProdutoService', 'toastr', '$mdDialog', 'produto'];

        public produtoService: ProdutoService;
        public toastr: Toastr;
        public mdDialog: any;
        public produto: Produto;

        constructor(produtoService: ProdutoService, toastr: Toastr, mdDialog: any, produto: Produto) {
            this.produtoService = produtoService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.produto = produto;
        }

        public saveProduto() :void {
            if(!this.produto.id){
                 this.produtoService.saveProduto(this.produto)
                .then((data) => {                 
                    this.mdDialog.hide({NewProduto: data}); 
                    this.toastr.success("Produto cadastrado com sucesso!");                          
                })
                .catch((response) => {
                    this.toastr.error('Cliente não pode ser cadastrado!');
                }) 
            }else{
                this.produtoService.editProduto(this.produto)
                .then((data) => {                 
                    this.mdDialog.hide({UpdateProduto: data}); 
                    this.toastr.success("Produto editado com sucesso!");                          
                })
                .catch((response) => {
                    this.toastr.error('Produto não pode ser editado!');
                })  
            }                 
        }

        public cancel(): void {
            this.mdDialog.cancel();
        }
    }

    angular.module(appConfig.appName).controller('ModalProdutoController', ModalProdutoController);
}