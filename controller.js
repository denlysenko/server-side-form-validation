


'use strict';

/**
 * @ngdoc function
 * @name formApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the formApp
 */
angular.module('core')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  	$scope.dataType = {};
  	$scope.dataType.attributeList = [];

    $scope.add = function() {
    	$scope.dataType.attributeList.push({});
    };

    $scope.submit = function() {
    	$http.post('/test', $scope.dataType)
    	.success(function(){})
    	.error(function(response) {
        $scope.serverErrors = {};
    		for(var field in response) {
          if(Array.isArray(response[field])) {
            response[field].forEach(function(subfield, index) {
              Object.keys(subfield).forEach(function(name) {
                $scope.form['attrForm_' + index][name].$setValidity('serverError', false);
                $scope.form['attrForm_' + index][name].$setDirty();
                $scope.serverErrors['attrForm_' + index + '_' + name] = subfield[name];
              });
            });
          } else {
            $scope.form[field].$setValidity('serverError', false);
            $scope.form[field].$setDirty();
            $scope.serverErrors[field] = response[field];
          }
    		}
    	});
    };
  }]);

