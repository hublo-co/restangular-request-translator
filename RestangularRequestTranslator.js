'use strict';

(function () {
  // String operations
  function underscoreToCamelCase(string) {
    return string.replace(/(\_[a-z])/g, function ($1) {
      return $1.toUpperCase().replace('_','');
    });
  }

  function camelCaseToUnderscore(string) {
    return string.replace(/([A-Z])/g, function ($1) {
      return "_" + $1.toLowerCase();
    });
  }

  // Recursively map keys of given object
  function recursiveKeyTransformation(o, fn) {
    if (angular.isArray(o)) {
      angular.forEach(o, function (item, i) {
        o[i] = recursiveKeyTransformation(item, fn);
      });
    } else if (angular.isObject(o)) {
      angular.forEach(o, function (item, key) {
        var newKey = fn(key);

        o[newKey] = recursiveKeyTransformation(item, fn);
        if (newKey != key) {
          delete o[key];
        }
      });

      return o;
    }

    return o;
  }

  var RestangularRequestTranslator = {
    camelCaseToUnderscore: function (element, operation, route, url, headers, params, httpConfig) {
      element = recursiveKeyTransformation(element, camelCaseToUnderscore);

      return {
        element: element,
      };
    },
    underscoreToCamelCase: function (data, operation, what, url, response, deferred) {
      data = recursiveKeyTransformation(data, underscoreToCamelCase);

      return data;
    },
    plug: function (RestangularProvider) {
      // Switch all camelCase to camel_case in requests
      RestangularProvider.addFullRequestInterceptor(RestangularRequestTranslator.camelCaseToUnderscore);

      // Do the opposite in responses
      RestangularProvider.addResponseInterceptor(RestangularRequestTranslator.underscoreToCamelCase);
    }
  };

  angular.module('hublo/restangular-request-translator', [])
    .constant('RestangularRequestTranslator', RestangularRequestTranslator);
})();

