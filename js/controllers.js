'use strict';

/* Controllers */

var productControllers = angular.module('productControllers', ['ui.bootstrap']);

productControllers.controller('ExpensesListCtrl', ['$scope', '$uibModal', '$http',
  function($scope, $uibModal, $http) {
      $scope.getAll = function () {
          $http.get("read_products.php").success(function (response) {
              $scope.names = response.records;
          });
      };
      $http.get("read_categories.php").success(function (response) {
        $scope.categories = response.options;
      });

      $scope.open = function (items) {
          var modalInstance = $uibModal.open({
              templateUrl: 'myModalContent.html',
              controller: ModalInstanceCtrl,
              resolve: {
                items: function () {
                  return items;
                },
                  expense: function () {
                      return "";
                  }
              },
              http: $http,
              scope: $scope
          });
          modalInstance.result.then(function (selectedItem) {
              $scope.selected = selectedItem;
          });
      };

      $scope.predicate = 'name';
      $scope.reverse = false;
      $scope.order = function(predicate) {
          $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
          $scope.predicate = predicate;
      };

      $scope.editExpense = function (id, categories) {
          $http.post("read_one.php", {'id_exp' : id}).success(function (response) {
              $scope.expense = response.records;

              var modalInstance = $uibModal.open({
                  templateUrl: 'updateModal.html',
                  controller: ModalInstanceCtrl,
                  resolve: {
                      items: function () {
                          return categories;
                      },
                      expense: function () {
                          return $scope.expense;
                      }
                  },
                  http: $http,
                  scope: $scope
              });
              modalInstance.result.then(function (selectedItem) {
                  $scope.selected = selectedItem;
              });
          });


      };

      $scope.deleteExpense = function (id) {
          // fields in key-value pairs
          $http.post('delete_expense.php', {
                  'id_exp' : id
              }
          ).success(function (data, status, headers, config) {
              console.log(data);
              // tell the user new product was created
              //Materialize.toast(data, 4000);

              // clear modal content
              //$scope.clearForm();

              // refresh the list
              $scope.getAll();
          });
          //$uibModalInstance.close();
      };
  }]);



productControllers.controller('MenuCtrl', ['$scope', '$uibModal', '$http',
  function($scope) {

      $scope.angledSearch = {
        show : true,
        terms : ''
      };
      // $scope.brand = "<span class='glyphicon glyphicon-user'></span> Home";
      //$scope.brand = "<i class='material-icons md-light left home-icon'>euro_symbol</i>";
      $scope.brand = "<span class='brand'>Expensify</span>";
      $scope.inverse = true;
      $scope.activemenu = "home";
      $scope.menus = [
          {
              title : "Dropdown Menu",
              className : "home",
              menu : [
                  {
                      title : "Menu Item One",
                      action : "#/item.one"
                  },
                  {
                      title : "Menu Item Two",
                      action : "#/item.two"
                  },
                  {
                      divider: true
                  },
                  {
                      title : "Menu Item Three",
                      action : "#/item.three"
                  }
              ]
          },
          {
              title : "HA",
              className : "ha",
              action : "#/list/ha"
          },
          {
              title : "About",
              className : "about",
              action : "#/list/details"
          }
      ]; // end menus

    $scope.item = '';
    $scope.searchDisplay = 'Visible';
    $scope.searchfn = function(){
        alert('Attempting search on: "' + $scope.search.terms + '"');
    }; 
    
    $scope.navfn = function(action){
        switch(action){
            case '#/list/ha':
              $scope.activemenu = "ha";
              break;
            case '#/list/details':
              $scope.activemenu = "about";
              break;
            default:
              $scope.activemenu = "home";
              break;
        }; // end switch
        window.location.href = action;
    }; // end navfn
  }]);

/**
 * Angled Navbar Directive
 *
 * @requires: ngSanitize, Bootstrap 3 (jQuery & Bootstrap's JS - responseive features require the inclusion of the Bootstrap JS)
 **/
productControllers.directive('angledNavbar',function(){
  return {
    restrict : 'AE',
    scope : {
      brand : '=',
      menus : '=',
      affixed : '=',
      search : '=',
      searchfn : '&',
      navfn : '&',
      inverse : '=',
      activemenu : '='
    },
    templateUrl : 'tmpls/nav/navbar.html',
    controller : function($scope,$element,$attrs){
      //=== Scope/Attributes Defaults ===//
      
      $scope.defaults = {
        brand : '<span class="glyphicon glyphicon-certificate"></span>',
        menus : [],
        search : {
          show : false
        },
        home : '#/list',
        activemenu : 'home'
      }; // end defaults
      
      // if no parent function was passed to directive for navfn, then create one to emit an event
      if(angular.isUndefined($attrs.navfn)){
        $scope.navfn = function(action){
          if(angular.isObject(action))
            $scope.$emit('nav.menu',action);  
          else
            $scope.$emit('nav.menu',{'action' : action});
        }; // end navfn
      }
      
      // if no parent function was passed to directive for searchfn, then create one to emit a search event
      if(angular.isUndefined($attrs.searchfn)){
        $scope.searchfn = function(){
          $scope.$emit('nav.search.execute');
        }; // end searchfn
      }
      
      //=== Observers & Listeners ===//
      
      $scope.$watch('affixed',function(val,old){
        var b = angular.element('body');
        // affixed top
        if(angular.equals(val,'top') && !b.hasClass('navbar-affixed-top')){
          if(b.hasClass('navbar-affixed-bottom'))
            b.removeClass('navbar-affixed-bottom');
          b.addClass('navbar-affixed-top');
        //affixed bottom
        }else if(angular.equals(val,'bottom') && !b.hasClass('navbar-affixed-bottom')){
          if(b.hasClass('navbar-affixed-top'))
            b.removeClass('navbar-affixed-top');
          b.addClass('navbar-affixed-bottom');
        // not affixed
        }else{
          if(b.hasClass('navbar-affixed-top'))
            b.removeClass('navbar-affixed-top');
          if(b.hasClass('navbar-affixed-bottom'))
            b.removeClass('navbar-affixed-bottom');
        }
      }); // end watch(affixed)
      
      //=== Methods ===//
      
      // $scope.noop = function(){
      //   angular.noop();
      // }; // end noop

      $scope.home = function(){
        $scope.navfn({'action' : $scope.defaults.home});
      }; // end noop
      
      $scope.navAction = function(action){
        $scope.navfn({'action' : action});
      }; // end navAction
      
      /**
       * Have Branding
       * Checks to see if the "brand" attribute was passed, if not use the default
       * @result  string
       */
      $scope.haveBranding = function(){
        return (angular.isDefined($attrs.brand)) ? $scope.brand : $scope.defaults.brand;
      }; 
      
      /**
       * Has Menus
       * Checks to see if there were menus passed in for the navbar.
       * @result  boolean
       */
      $scope.hasMenus = function(){
        return (angular.isDefined($attrs.menus));
      };
      
      /**
       * Has Dropdown Menu
       * Check to see if navbar item should have a dropdown menu
       * @param  object  menu
       * @result  boolean
       */
      $scope.hasDropdownMenu = function(menu){
        return (angular.isDefined(menu.menu) && angular.isArray(menu.menu));
      }; // end hasDropdownMenu
      
      /**
       * Is Divider
       * Check to see if dropdown menu item is to be a menu divider.
       * @param  object  item
       * @result  boolean
       */
      $scope.isDivider = function(item){
        return (angular.isDefined(item.divider) && angular.equals(item.divider,true));
      }; // end isDivider

      /**
        * makeLowerCase
        */
      $scope.makeLowerCase = function(string){
         return angular.lowercase(string);
      };
    }
  };
}) // end navbar

.run(function($templateCache){
  $templateCache.put('tmpls/nav/navbar.html',
    '<nav class="navbar" ng-class="{\'navbar-inverse\': inverse,\'navbar-default\': !inverse,\'navbar-fixed-top\': affixed == \'top\',\'navbar-fixed-bottom\': affixed == \'bottom\'}" role="navigation"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu"><span class="sr-only">Toggle Navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a class="navbar-brand" ng-click="home()" ng-bind-html="haveBranding()"></a></div><div class="collapse navbar-collapse {{activemenu}}" id="navbar-menu"><ul class="nav navbar-nav" ng-click="$event.preventDefault()" ng-if="hasMenus()"><li ng-repeat="menu in menus" ng-class="{true: \'dropdown\'}[hasDropdownMenu(menu)]"><a ng-if="!hasDropdownMenu(menu)" class="{{menu.className}}" ng-click="navAction(menu.action)">{{menu.title}}</a><a ng-if="hasDropdownMenu(menu)" class="dropdown-toggle {{menu.className}}" data-toggle="dropdown">{{menu.title}} <b class="caret"></b></a><ul ng-if="hasDropdownMenu(menu)" class="dropdown-menu"><li ng-repeat="item in menu.menu" ng-class="{true: \'divider\'}[isDivider(item)]"><a ng-if="!isDivider(item)" ng-click="navAction(item.action)">{{item.title}}</a></li></ul></li></ul><form ng-if="search.show" class="navbar-form navbar-right" role="search"><div class="form-group"><input type="text" class="form-control" placeholder="Search" ng-model="search.terms"><button class="btn btn-default" type="button" ng-click="searchfn()"><span class="glyphicon glyphicon-search"></span></button></div></form></div></div></nav>');
});


// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $uibModalInstance, items, $http, expense) {

  $scope.items = items;
    $scope.expense = expense;
  //$scope.selected = {
  //    option: $scope.items[1].id
  //};

    if (expense == "") {
        $scope.category = { name: "Sipo", id: 1 };
    } else {
        $scope.category = { name: expense.cat_name, id: expense.id_cat };
    }




  $scope.createExpense = function () {
      // fields in key-value pairs
      $http.post('create_expense.php', {
            'name' : $scope.name,
            'description' : $scope.description,
            'category_id' : $scope.category.id,
            'created' : $scope.created
          }
      ).success(function (data, status, headers, config) {
        console.log(data);
        // tell the user new product was created
        //Materialize.toast(data, 4000);

        // clear modal content
        //$scope.clearForm();

        // refresh the list
        $scope.getAll();
      });
      $uibModalInstance.close($scope.selected.option);
      //$uibModalInstance.close();
  };

  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };

    $scope.updateExpense = function () {
        // fields in key-value pairs
        $http.post('create_expense.php', {
                'name' : $scope.name,
                'description' : $scope.description,
                'category_id' : $scope.category.id,
            }
        ).success(function (data, status, headers, config) {
            console.log(data);
            // tell the user new product was created
            //Materialize.toast(data, 4000);

            // clear modal content
            //$scope.clearForm();

            // refresh the list
            $scope.getAll();
        });
        $uibModalInstance.close($scope.selected.option);
        //$uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};



productControllers.controller('ProductDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('products/' + $routeParams.phoneId + '.json').success(function(data) {
      $scope.phone = data;
    });
  }]);

productControllers.controller('SendMailCtrl', ['$scope', '$http', '$timeout',
    function($scope, $http, $timeout) {
        // create a blank object to hold our form information
        // $scope will allow this to pass between controller and view
        $scope.formData = {};

        // process the form
        $scope.contactMeForm = function () {
            $http({
                method: 'POST',
                url: 'objects/mail.php',
                data: $.param($scope.formData),  // pass in data as strings
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
                .success(function (data) {
                    console.log(data.message);

                    if (data.success) {
                        $scope.successMessage = data.message;
                        $timeout(function () {
                            $scope.successMessage = false;
                        }, 3000);

                    }
                    else {
                        $scope.errorEmail = data.errors.userEmail;
                    }
                });

        };
    }]);