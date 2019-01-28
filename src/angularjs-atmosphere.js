(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name angularJS.Atmosphere.service:atmosphereService
   * @description Angular JS Atmosphere Wrapper
   */
  angular.module('angularJS.Atmosphere', [])
    .service('atmosphereService', [function() {

      var listeners = {};
      var listenerIndex = {};
      var connection;

      return {
        init: init,
        close: close,
        on: on,
        off: off,
        emit: emit,
        request: request
      };

      function init(requestObj) {
        if (!connection) {
          var request = requestObj;
          request.onMessage = handleResponse;
          connection = $.atmosphere.subscribe(request);
        }
      }

      function close() {
        if (connection) {
          $.atmosphere.unsubscribeUrl(connection.getUrl());
          connection = undefined;
        }
      }

      function on(type, callbackFn) {

        var id = Math.random();

        if (!listeners.hasOwnProperty(type)) {
          listeners[type] = [];
        }
        listenerIndex[id] = type;
        listeners[type].push({
          id: id,
          fn: callbackFn
        });

        return id;
      }

      function off(id) {
        var type = listenerIndex[id] || '';
        var typeListeners = listeners[type] || [];
        var removed = false;

        for (var i = 0; i < typeListeners.length; i++) {
          if (typeListeners[i].id === id) {
            typeListeners.splice(i, 1);
            delete listenerIndex[id];

            removed = true;
            break;
          }
        }

        return removed;
      }

      function emit(type, data) {
        connection.push(angular.toJson({
          type: type,
          data: data
        }));
      }

      function handleResponse(response) {
        var data = response.responseBody;

        if (typeof data === 'string') {
          data = angular.fromJson(data);
        }

        if (listeners.hasOwnProperty(data.type)) {
          angular.forEach(listeners[data.type], function(listener) {
            listener.fn.call(this, data);
          });
        }
      }

      function request() {
        return $.atmosphere.AtmosphereRequest();
      }

    }]);

})();
