var yata = yata || {};
yata.general = (function() {
  'use strict';

  function init() {
    $( '#sortable' ).sortable({
      cancel: '.ui-state-disabled',
      items: 'li:not(.ui-state-disabled)',
      placeholder: 'ui-state-highlight',
      handle: '.cs-ico-drag',
    });
    $( '#sortable li' ).disableSelection();
  }

  return {
    init: init,
  };

}());


$(document).ready(function(){
  'use strict';
  yata.general.init();
});
