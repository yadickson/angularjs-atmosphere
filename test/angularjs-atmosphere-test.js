(function() {
  'use strict';

  describe('Check angularJS.Atmosphere', function() {

    beforeEach(angular.mock.module('angularJS.Atmosphere'));

    var atmosphereService;

    beforeEach(inject(function(_atmosphereService_) {
      atmosphereService = _atmosphereService_;
      atmosphereService.init({});
    }));

    afterEach(function() {
      atmosphereService.close();
    });

    it('Check service atmosphere', function() {
      expect(!!atmosphereService).to.be.true;
    });

    it('should add a function to the listeners object and return an id', function() {
      var fn = sinon.spy();
      var key = atmosphereService.on('test', fn);

      atmosphereService.emit('test', 'test');

      expect(!!key).to.be.true;
      expect(fn.called).to.be.true;
    });

    it('it should remove a function from the listeners object given an id', function() {
      var fn = sinon.spy();
      var key = atmosphereService.on('test');

      atmosphereService.off(key);

      atmosphereService.emit('test', 'test');

      expect(!!key).to.be.true;
      expect(fn.called).to.be.false;
    });

    it('should call all the functions for a given event on a response', function() {
      var fn = sinon.spy();
      var fn2 = sinon.spy();

      var key = atmosphereService.on('test', fn);
      var key2 = atmosphereService.on('test', fn2);

      atmosphereService.emit('test', 'test');

      expect(!!key).to.be.true;
      expect(!!key2).to.be.true;

      expect(fn.called).to.be.true;
      expect(fn2.called).to.be.true;
    });

  });

})();
