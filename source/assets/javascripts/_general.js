var yata = yata || {};
yata.general = (function() {
  'use strict';

  function init() {
    dragDropMenu();
    toggleLabelPopover();
    linkPreventDefault();
    createTitlePage();
    confirmNewPage();
    cancelNewPage();
    openEditPage();
    showBoxPages();
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
    $('a').on('click', function(e){
      if($(this).attr('href') === '' || $(this).attr('href') === '#'){
        e.preventDefault();
      }
    })
  }

  function createTitlePage(){
    var $field = $('#title-page');

    $field.on('keyup', function(){
      $('#url-page').val($(this).val());
    });

  }

  function clearFields(){
    $('#url-page, #title-page').val("");
  }

  function loadingPage(){
    $('.image-fake').addClass('hide');
    $('.cssload-loader').addClass('show');
    setTimeout(function(){
      $('.cssload-loader').removeClass('show');
      $('.image-empty').addClass('show');
    },3000)
  }




  function confirmNewPage(){
    $('#confirm-add-page').on('click', function(){
      $('#add-page').trigger('click');
      loadingPage();
      clearFields();
    });
  }

  function cancelNewPage(){
    $('#cancel-add-page').on('click', function(){
      clearFields();
    });
  }

  function openEditPage(){
    $('.cs-ico-config').on('click', function(e){
      $('#cs-sidebar-edit-page').click();
      if($('#cs-sidebar-edit-page').is(':checked')){
        positionArrow(this);
      }
      if($('#cs-sidebar-new-page, #cs-sidebar-new-link').is(':checked')){
        $('#cs-sidebar-new-page, #cs-sidebar-new-link').removeAttr('checked');
      }
    });
  }


  function positionArrow(elem){
    var posY = $(elem).offset().top - 50;
    $('.cs-sidebar-new-page .cs-sidebar-arrow').css({ top: posY });
  }

  function showBoxPages(){
    $('.cs-sidebar-nav-pages > label').on('click', function(){
      positionArrow(this);
      if($('#cs-sidebar-edit-page').is(':checked')){
        $('#cs-sidebar-edit-page').removeAttr('checked');
      }
    })
  }

  return {
    init: init
  };

}());


$(document).ready(function(){
  'use strict';
  yata.general.init();
});
