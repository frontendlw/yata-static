var mediakit = (function() {
  'use strict';

  // Used to run scripts when the HTML is ready
  function fastInit() {
    console.log('fast Init')
  }

  // Used to run scripts that just when all things are ready
  function init() {
    console.log('initializer functions')
    loadModules();
    mediakit.general.init();
  }

  function loadModules() {
    var modules = getModules();
    for (var i in modules) {
      mediakit[modules[i]].init();
      console.info("MediaKit: module [" + modules[i] + "] successfully initialized.");
    }
  }

  function getModules() {
    var modules = [];
    $("[data-mk-module]").each(function () {
      var module = $(this).data("mk-module");
      if ( modules.indexOf(module) === -1 ) {
        modules.push(module);
      }
    });
    return modules;
  }

  return {
    init: init,
    fastInit: fastInit
  };

}());

var mk = mediakit;

$(window).load(function() {
  'use strict';
  mk.init();
});

$(document).ready(function(){
  'use strict';
  mk.fastInit();
});
var mediakit = mediakit || {};
mediakit.general = (function() {
  'use strict';

  function init() {
    console.log('start JS');
  }

  return {
    init: init,
  };

}());


