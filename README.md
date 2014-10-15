Restangular request translator
==============================

A little lib for Restangular that translates underscored object keys from the backend into camelCased objects for the front to consume and vice versa.

Usage
-----

```bash

$ bower install restangular-request-translator

```

Import the `RestangularRequestTranslator.js` file in your app.

```javascript

angular.module('my-app', [
  'restangular',
  'hublo/restangular-request-translator'
]);

angular.module('my-app')
  .config(['RestangularProvider', 'RestangularRequestTranslator', function (RestangularProvider, RestangularRequestTranslator) {
    RestangularRequestTranslator.plug(RestangularProvider);
  }]);

```

Example
-------

```javascript

Restangular.all('neighbors').post({
  givenName: "Peter",
  brother: {
    givenName: "Jack"
  }
});

```

Will translate to the following payload to the backend:

```json
{
  "neighbor": {
    "given_name": "Peter",
    "brother": {
      "given_name": "Jack"
    }
  }
}
```

Conversely, with a response like this, you will be able to write:

```javascript
neighbor.brother.givenName
```

to access its property without manually managing the conversion from underscore to camelCase.
