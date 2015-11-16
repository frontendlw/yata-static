var yata = yata || {};
yata.general = (function() {
  'use strict';

  function init() {
    dragDropMenu();
    toggleLabelPopover();
    linkPreventDefault();
  }


  function toggleLabelPopover(){
    $('#ember590 label').on('click', function(){
      var target = $(this).attr('for');
      if( target == 'cs-sidebar-new-page'){
        $('#cs-sidebar-new-link').removeAttr('checked');
      } else{
        $('#cs-sidebar-new-page').removeAttr('checked');
      }
    });
  }

  function dragDropMenu(){
    $( '#sortable' ).sortable({
      cancel: '.ui-state-disabled',
      items: 'li:not(.ui-state-disabled)',
      placeholder: 'ui-state-highlight',
      handle: '.cs-ico-drag',
    });
    $( '#sortable li' ).disableSelection();
  }


  function linkPreventDefault(){
      $("a").on("click", function(e){
        if($(this).attr("href") === "" || $(this).attr("href") === "#"){
          e.preventDefault();
        }
      })
    },

  return {
    init: init
  };

}());


$(document).ready(function(){
  'use strict';
  yata.general.init();
});
