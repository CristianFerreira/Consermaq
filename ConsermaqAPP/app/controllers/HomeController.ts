// /// <reference path="../configs/_all.ts" />
// module Consermaq {
//     export class HomeController {

//         static $inject = ['PostService','CommentService','toastr', '$routeParams', '$location', '$sce', '$mdDialog'];

//         private postService: PostService;
//         private commentService: CommentService;
//         public toastr: Toastr;
//         public $routeParams: IRouteParamsService;
//         private $location: ILocationService;
//         public $sce: any;
//         public $mdDialog: any;
//         public selected: Array<any>;
//         public limitOptions: Array<any>;
//         public options: any;
//         public query: any;
//         public showCheck: any;
//         public promise: any;
//         public filterShow: boolean;
//         public filterSearch: string;
//         public trustedHtml: any;

//         public paging: any;
//         public currentPage: any;

//         public posts: Array<Post>;
//         public post: Post;

//         constructor(postService: PostService, commentService: CommentService, toastr: Toastr, $routeParams: IRouteParamsService, 
//                     $location: ILocationService, $sce: any, $mdDialog: any) {
//             this.postService = postService;
//             this.commentService = commentService;
//             this.toastr = toastr;
//             this.$routeParams = $routeParams;
//             this.$location = $location;
//             this.$sce = $sce;
//             this.$mdDialog = $mdDialog;
//             this.selected = [];
//             this.limitOptions = [5, 10, 15];
//             this.options = {
//                 rowSelection: true,
//                 multiSelect: true,
//                 autoSelect: true,
//                 decapitate: false,
//                 largeEditDialog: false,
//                 boundaryLinks: true,
//                 limitSelect: true,
//                 pageSelect: true
//             };
//             this.query = {
//                 order: 'name',
//                 limit: 5,
//                 page: 1
//             };
//             this.showCheck = {};

//             this.currentPage = 0;
//             this.paging = {
//                 total: 100,
//                 current: 1
//             };
//             this.loadPosts();
//         }


//         public loadPosts(): void {
//             if (this.$routeParams.id)
//                 this.loadPostById();

//             if (this.$routeParams.categoria)
//                 this.loadByCategoryName();

//             if (this.$routeParams.city)
//                 this.loadByCityName();
                

//             if (!this.$routeParams.id && !this.$routeParams.categoria && !this.$routeParams.city)
//                 this.listAllPost();
//         }

//         public listAllPost(): void {
//             this.posts = new Array<Post>();           
//             this.postService.listAll()
//                 .then((data) => { this.posts = data, this.insertIconPost()})
//                 .catch((response) => console.log("Não carregou as postagens, erro: " + response));        
//         }

//         public loadByCategoryName(): void {
//             this.posts = new Array<Post>();
//             this.postService.getByCategoria(this.$routeParams.categoria)
//                 .then((data) => { this.posts = data, this.insertIconPost() })
//                 .catch((response) => console.log("Não carregou as postagens pela categoria, erro: " + response));
//         }

//          public loadByCityName(): void {
//             this.posts = new Array<Post>();
//             this.postService.getByCity(this.$routeParams.city)
//                 .then((data) => { this.posts = data, this.insertIconPost() })
//                 .catch((response) => console.log("Não carregou as postagens pela categoria, erro: " + response));
//         }

//         public loadPostById(): void {
//             this.post = new Post();
//             this.postService.getById(this.$routeParams.id)
//                 .then((data) => { this.post = data, this.insertIconPost()})
//                 .catch((response) => console.log("Não carregou a postagem por id, erro: " + response));

//         }


//         public insertIconPost(): void {
//             if (this.posts) {
//                 this.posts.forEach(p => {
//                     switch (p.category.name) {
//                         case 'Viagem':
//                             p.icon = 'flight';
//                             break;
//                         case 'Musicas':
//                             p.icon = 'headset';
//                             break;
//                         default:
//                             break;
//                     }
//                 });
//             }
//             else if (this.post) {
//                 switch (this.post.category.name) {
//                     case 'Viagem':
//                         this.post.icon = 'flight';
//                         break;
//                     case 'Musicas':
//                         this.post.icon = 'headset';
//                         break;
//                     default:
//                         break;
//                 }
//             }
//         }

//         public editPost(id: number): void {
//             this.$location.path("postagem/edit/" + id);
//         }

//          public deletePost(id: number) :void {
//              this.postService.deletePost(id)
//              .then((data) => { this.$location.path("/"), this.toastr.success("Postagem excluida com sucesso!") })
//              .catch((response) => console.log("Não foi possivel excluir a postagem, erro: " + response));
//         }

//         public listCategory(categoryName: string): void {
//             this.$location.path("postagens/" + categoryName);
//         }

//         public postById(id: number): void {
//             this.$location.path("postagem/" + id);
//         }

//         public login(): void {
//             this.$location.path("/login");
//         }

//         public loadPages(): any {
//             console.log('Current page is : ' + this.paging.current);
//             this.currentPage = this.paging.current;

//         };

//         public removeFilter(): void {
//             this.filterShow = false;
//             this.filterSearch = '';
//         };

//         public toggleLimitOptions(): any {
//             this.limitOptions = this.limitOptions ? undefined : [5, 10, 15];
//         };

//         public confirmarExclusao(ev: any, id: number) :void {                                    
//           this.$mdDialog.show({
//             controller: "ModalDeletePostController",
//             templateUrl: 'app/views/modal-post-delete.html',
//             targetEvent: ev,
//             clickOutsideToClose: true,
//             controllerAs: 'vm',
//             resolve: {
//                              id: ()=> id
//                      }
//         }).then( (response) => {
//             if(response)
//                 this.deletePost(id);
         
//         });
//      } 			                
//         }

//         // public listCommentsById(id :number): void {
//         //     this.comments = new Array<Comment>();
//         //     this.commentService.getById(id)
//         //     .then((data) => {
//         //         this.comments = data;
//         //     })
//         //     .catch((response) => {
//         //         this.toastr.error('Comentarios não foram listados!');
//         //     })   
//         // }


//         // public saveComment() :void {
//         //     this.comment.postId = this.post.id;
//         //     this.commentService.saveComment(this.comment)
//         //     .then((data) => {                                  
//         //             this.toastr.success("Comentario adicionado com sucesso!");                          
//         //     })
//         //     .catch((response) => {
//         //             this.toastr.error('Comentario não pode ser adicionado!');
//         //     })   
//         // }


    

//     angular.module(appConfig.appName).controller('HomeController', HomeController).config(function($mdThemingProvider) {
//          $mdThemingProvider.theme('panelComment', 'default')
//              .backgroundPalette('grey');

//          $mdThemingProvider.theme('formComment', 'default')
//              .primaryPalette('pink')
//     });
    
// }

