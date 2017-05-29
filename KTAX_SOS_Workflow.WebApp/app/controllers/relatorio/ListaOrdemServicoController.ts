/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class ListaOrdemServicoController {

        static $inject = ['$location', 'OrdemServicoService', 'toastr', '$mdDialog', 
                            '$timeout', '$rootScope', '$filter'];

        private $location: ILocationService;
        private ordemServicoService: OrdemServicoService;
        public toastr: Toastr;
        public mdDialog: any;
        public timeout: ITimeoutService;
        private $rootScope: IRootScope;
        public filter: angular.IFilterService;
        public ordemServico: Array<OrdemServico>;
        public gridOptions: any;
        


        constructor($location: ILocationService,
            ordemServicoService: OrdemServicoService,
            toastr: Toastr,
            mdDialog: any,
            timeout: ITimeoutService,
            $rootScope: IRootScope,
            filter: angular.IFilterService) {

            this.$location = $location;
            this.ordemServicoService = ordemServicoService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.timeout = timeout;
            this.$rootScope = $rootScope;
            this.filter = filter;
            this.ordemServico = new Array<OrdemServico>();

            this.buildGrid();
        }

        public buildGrid(): void {
            this.gridOptions = {
                data: new Array<OrdemServico>(),
                enableFiltering: true,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                enableGridMenu: true,
                columnDefs: [
                    {
                        field: 'id',
                        enableHiding: false,
                        displayName: "N° Ordem Serviço",
                        width: 150,
                        enableCellEdit: false,
                        // cellTemplate: "app/views/workflow/templates/list-workflow/idTarefa-grid.html"
                    },
                    {
                        field: 'servicoSolicitado',
                        enableHiding: false,
                        enableCellEdit: false,
                        displayName: "Solicitação",
                        // cellTemplate: "app/views/workflow/templates/list-workflow/strTituloChamado-grid.html"
                    },
                    {
                        field: 'status',
                        enableHiding: false,
                        displayName: "Status",
                        width: 150,
                        enableCellEdit: false,
                        cellTemplate: "app/views/relatorio/template/ListaOrdemServico/status.html"
                    },
                    {
                        field: 'dataInicial',
                        enableHiding: false,
                        displayName: "Abertura",
                        width: 220,
                        enableCellEdit: false,
                        cellTemplate: "app/views/relatorio/template/ListaOrdemServico/dataInicial.html"
                    },
                    {
                        field: 'dataEncerramento',
                        enableHiding: false,
                        displayName: "Encerramento",
                        width: 220,
                        enableCellEdit: false,
                        cellTemplate: "app/views/relatorio/template/ListaOrdemServico/dataEncerramento.html"
                    },
                    {
                        field: 'cliente.nome',
                        enableHiding: false,
                        displayName: "Cliente",
                        enableCellEdit: false,
                        // headerCellTemplate: '<div class="ui-grid-top-panel" style="text-align: center;padding-top:5px;">Horas (Est/Rea/Falt)</div>',

                    },
                    {
                        field: 'valorTotal',
                        enableHiding: false,
                        displayName: "Valor",
                        width: 150,
                        enableCellEdit: false,
                        // headerCellTemplate: '<div class="ui-grid-top-panel" style="text-align: center;padding-top:5px;">Horas (Est/Rea/Falt)</div>',
                        cellTemplate: "app/views/relatorio/template/ListaOrdemServico/valor.html"
                    }
                ],
                exporterCsvFilename: 'OrdemServico.csv',
                exporterPdfDefaultStyle: { fontSize: 9 },
                exporterPdfTableStyle: { margin: [0, 0, 0, 0] },
                exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
                exporterPdfHeader: {  columns: [{ text: 'Ordem de Serviços', style: 'headerStyle', alignment: 'center' }] },
                exporterPdfFooter:  function(currentPage, pageCount) {
                    return { text: currentPage.toString() + ' de ' + pageCount.toString(), style: 'footerStyle' };

                },
                exporterPdfCustomFormatter: function (docDefinition) {
                    docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                    docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                    return docDefinition;
                },
                exporterPdfOrientation: 'portrait',
                exporterPdfPageSize: 'LETTER',
                exporterPdfMaxGridWidth: 470,
                exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
                exporterFieldCallback: function (grid, row, col, value) {
                    if (col.name == 'status') {
                        value = value == 1 ? "Aberto" : value == 2 ? "Pendente" : "Finalizado"
                        return value; 
                    }
                    if (col.name == 'dataInicial') {
                        value = grid.appScope.$parent.vm.filter('date')(value, 'dd/MM/yyyy');
                        
                        return value; 
                    }
                     if (col.name == 'dataEncerramento') {
                        value = grid.appScope.$parent.vm.filter('date')(value, 'dd/MM/yyyy');
                        return value; 
                    }
                     return value; 
                    
                },
                toggleRow: function (rowNum) {
                    this.gridApi.treeBase.toggleRowTreeState(this.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
                },
                toggleExpandNoChildren: function () {
                    this.gridOptions.showTreeExpandNoChildren = !this.gridOptions.showTreeExpandNoChildren;
                    this.gridApi.grid.refresh();
                },
                onRegisterApi: function (gridApi) {
                    this.gridApi = gridApi;
                },
                toggleRowSelection: function () {
                    this.gridApi.selection.clearSelectedRows();
                }
            };

            this.loadOrdemServico();
        }

        public loadOrdemServico(): void {
            this.ordemServicoService.listAll()
                .then((data) => {
                    this.ordemServico = data;
                    this.gridOptions.data = this.ordemServico;
                })
                .catch((response) => {
                    this.toastr.error("Erro ao carregar dados da grid");
                })
        }
    }

    angular.module(appConfig.appName).controller('ListaOrdemServicoController', ListaOrdemServicoController);
}