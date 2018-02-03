app.controller('homeCtrl',function($scope,$state,$rootScope,$timeout,$mdDialog,$sce,$interval,$stateParams) {
    
        /**
         * NIVELPROFISSIONAL = 1 -> ADMIN
         * NIVELPROFISSIONAL = 2 -> MEDICO
         */
    
        /*****************************VARIABLES && $SCOPE DECLARATION*********************/
        $scope.flagStatus=false;
        $scope.status="inativos";
        $scope.nomeUtilizador = '';
        $scope.pessoas = [];
        $scope.trustedHtml=null;
        $scope.html='';
        if($rootScope.cache!==undefined)
            delete $rootScope.cache;
        /*****************************VARIABLES && $SCOPE DECLARATION*********************/
    
        $scope.dispositivos = function(id){
          sessionStorage.setItem("ID",id);
          $state.go("dispositivos");
        };
    
        $scope.criarFichaDiurno = function (id,tipoFicha) {
            sessionStorage.setItem("ID",id);
            sessionStorage.setItem("tipoFicha",tipoFicha);
            $state.go("tabs.eventosSig");
        };
    
        $scope.openMenu = function($mdMenu, ev) {
            originatorEv = ev;
            $mdMenu.open(ev);
        };
    
        $scope.imprimir = function (){
            var myWindow = window.open("");
            myWindow.document.write($scope.html);
            myWindow.print();
        };
    
        $scope.openQrl = function(ev){
            var opQR = $mdDialog.show({
                templateUrl: '../modals/qrlogin/qrLogin.html',
                controller: 'qrLoginCtrl',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
    
        }
        
        /**
         * flagStatus==false? Mostra apenas ativos
         * flagStatus==true? Mostra todos
         */
        $scope.mostrarStatus = function () {
            if($scope.flagStatus==false){
                $scope.flagStatus = true;
                $scope.status="ativos";
            }
            else {
                $scope.flagStatus = false;
                $scope.status="inativos";
            }
        };
    
        /**
         * Requisita ao server todos os profissionais ativos e nao ativos
         * Tem como retorno lista de profissionais
         */
        // $scope.getProfissional = function () {
        //     $rootScope.reqWithToken('/getProfissionais', sessionStorage.getItem("token"), 'GET', function (success) {
        //         for (var i = 0; i < success.length; i++) {
        //             $scope.pessoas.push({
        //                 nome: success[i].Nome,
        //                 sobrenome: success[i].Sobrenome,
        //                 id: success[i].ID,
        //                 Ativo: success[i].Ativo,
        //                 qrkey: success[i].QRKey
        //             });
        //         }
        //     }, function (err) {
        //         console.log(err);
        //     });
        // };
    
        /**
         * Requisita ao server todos os pacientes
         * Tem como retorno lista de pacientes
         */
        // $scope.getPacientes = function () {
        //     $rootScope.reqWithToken('/getPacientes', sessionStorage.getItem("token"), 'GET', function (success) {
        //         console.log(success);
        //         for (var i = 0; i < success.length; i++) {
        //             $scope.pessoas.push({
        //                 nome: success[i].Nome,
        //                 sobrenome: success[i].Sobrenome,
        //                 id: success[i].ID,
        //                 internado: success[i].Internado,
        //                 nomeMedico: success[i].NomeMedico,
        //                 sobrenomeMedico: success[i].SobrenomeMedico
        //             });
        //         }
        //     }, function (err) {
        //         console.log(err);
        //     });
        // };
        /*
         Função para reuso do gerador de QRCODE (usar nas duas possibilidades, QR EXISTE E QR NÃO EXISTE
         Também é responsável por gerar a imagem do QR-CODE
         */
        $scope.qrSave = function (data) {
            $rootScope.reqWithToken('/gerarQr', data, 'POST', function (success) {
                //Atualiza o array #pessoa
                var i=0;
                while($scope.pessoas[i].id!=success.ID)
                    i++;
                $scope.pessoas[i].qrkey = success.QRKey;
                $scope.html = success.IMG;
                $scope.trustedHtml = $sce.trustAsHtml($scope.html);
    
            }, function (err) {
                console.log("Erro de roteamento");
            });
    
        };
    
        $scope.gerarQrCode = function (ev, id, qrval) {
            var data = {
                id: id
            };
            //Reativar if e else no caso da janela de confirmação passar a funcionar
            if (qrval == null) {
                $scope.qrSave(data);
            }
            else {
                // Criando a janela de confirmação
                var confirm = $mdDialog.confirm()
                    .title('Gerar novo QR-CODE?')
                    .textContent('Você deseja realmente gerar um novo qr-code para esta pessoa? Com essa ação, todos os qr-code gerados anteriormente serão invalidados!')
                    .targetEvent(ev)
                    .ok('Gerar novo')
                    .cancel('Cancelar');
    
                $mdDialog.show(confirm).then(function () {
                        $scope.qrSave(data);
                    },
                    function () { //Clicou o botão recusar
                        $scope.status = 'Nada foi realizado';
                    });
            }
        };
    
        /**
         * Caso nivelProfissional seja ADMIM, requisita ao server lista de PROFISSIONAIS
         */
        if ($scope.nivelProfissional == 1) {
            $scope.getProfissional();
        }
    
        /**
         * Caso nivelProfissional seja MEDICO, requisita ao server lista de PACIENTES
         */
        if($scope.nivelProfissional==2){
            $scope.flagStatus=true;
            $scope.getPacientes();
        }
    
        /**
         * Direciona para pagina de Pessoa para usuario inserir dados
         */
        $scope.adicionarNovo = function () {
            if ($scope.nivelProfissional == 1) {//Redireciona para pagina de cadastro de PROFISSIONAL
                $state.go("pessoa", {
                    acao: "novo"
                });
            }
        };
    
        $scope.visualizarPaciente = function (id) {
            sessionStorage.setItem("ID",id);
            $state.go("visualizarPaciente");
        };
    
        /**
         * Recebe o ID do profissional como parametro.
         * Envia para o servidor esse ID. Irá setar como false o campo Ativo do Profissional
         * @param id
         * @return sucesso ou falha
         */
        $scope.desativarProfissional = function (id) {
            var data = {id: id},i=0;
            $rootScope.reqWithToken('/desativarProfissional', data, 'PUT', function (success) {
                while($scope.pessoas[i].id!=id)
                    i++;
                $scope.pessoas[i].Ativo=0;
            }, function (err) {
                console.log(err);
            });
        };
    
        /**
         * Recebe ID do usuario como parametro e direciona para pagina de Pessoa, para editar dados
         * @param id
         */
        $scope.editar = function (id) {
            sessionStorage.setItem("ID", id);
            $state.go("pessoa", {
                acao: "editar"
            });
        };
    
        $scope.reativarProfissional = function (id) {
            var data = {id: id},i=0;
            $rootScope.reqWithToken('/reativarProfissional', data, 'PUT', function (success) {
                while($scope.pessoas[i].id!=id)
                    i++;
                $scope.pessoas[i].Ativo=1;
            }, function (err) {
                console.log(err);
            });
        };
    
        /**
         * Abre modal para confirmacao de desativar profissional
         * @param id
         * @param ev
         */
        $scope.showDesativar = function(id,ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm(id)
                .title('Desativaćao de Usuário.')
                .textContent('Este usuário será desativado e não fará mais parte do sistema, sendo necessário sua reativação posteriormente. Deseja continuar mesmo assim?')
                .targetEvent(ev)
                .ok('Desativar.')
                .cancel('Não.');
    
            $mdDialog.show(confirm).then(function() {
                $scope.desativarProfissional(id);
            });
        };
    
        $scope.showReativar = function(id,ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm(id)
                .title('Reativaćao de Usuário.')
                .textContent('Este usuário será reativado e terá acesso ao sistema novamente. Deseja realizar essa ação?')
                .targetEvent(ev)
                .ok('Sim.')
                .cancel('Não.');
    
            $mdDialog.show(confirm).then(function() {
                $scope.reativarProfissional(id);
            });
        };
    });