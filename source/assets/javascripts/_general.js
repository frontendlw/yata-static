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
    openModal();
    bindCloseModal();
    bindCloseModalEsc();
    removePage();
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
      placeholder: 'ui-sortable-placeholder',
      handle: '.cs-ico-drag',
      helper: 'clone',
      start: function(ev, ui){
        ui.item.show();
        ui.placeholder.append('<span />');
      }
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


    $('.test-title').each(function(){
      $(this).on('keyup', function(){

        var url = $(this).val().replace(/( )/g, '-').toLowerCase();

        $(this).closest('.cs-sidebar-new-page').find('.test-url').val(url);
      });
      
    });

  }

  function clearFields(){
    $('#url-page, #title-page').val("");
  }

  function loadingPage(){

    // $('.cssload-loader').before('<div class="cs-modal-overlay"></div>');
    // $('.image-fake').addClass('hide');
    $('.cssload-loader').addClass('show');
    setTimeout(function(){
      $('.cssload-loader').removeClass('show');
    },3000)
  }




  function confirmNewPage(){
    $('#confirm-add-page').on('click', function(){
      $('.image-fake').addClass('hide');
      $('#add-page').trigger('click');
      loadingPage();
      clearFields();
      setTimeout(function(){
        $('.image-empty').addClass('show');
      },3100)
    });
  }

  function cancelNewPage(){
    $('#cancel-add-page').on('click', function(){
      // clearFields();
    });
  }

  function openEditPage(){
    $('.cs-ico-config').on('click', function(e){
      createTitlePage();
      $('input[name="cs-sidebar-new-page"]').removeAttr('checked');
      var target = $(this).data('target');
      $(target).click();
      if($(target).is(':checked')){
        positionArrow(this);
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

  function openModal(){
    $('[data-module="modal"]').on('click', function(){
      $('input[name="cs-sidebar-new-page"]').removeAttr('checked');
      $('.cs-modal-overlay').remove();
      var target = $(this).attr('data-target');
      $('html').addClass('cs-open-modal');
      $('#' + target).before('<div class="cs-modal-overlay"></div>');
      $('#' + target).addClass('opened');
    });
  }

  function bindCloseModal(){
    $('[data-close="modal"]').on('click', function(){
      closeModal(this);
    });
  }

  function closeModal(el){
    $('html').removeClass('cs-open-modal');
    $(el).closest('.cs-modal').removeClass('opened');
    $('.cs-modal-overlay').remove();
  }


  function bindCloseModalEsc() {
    $(document).on('keyup', function (e) {
      if(e.keyCode === 27){
        closeModal('[data-close="modal"]');
      }
    });

  }

  function removePage(){
    $('.cs-btn-confirm').on('click', function(){
      $('.cs-page').find('img').hide();
      closeModal(this);
      loadingPage();
    });
  }

  return {
    init: init
  };

}());


$(document).ready(function(){
  'use strict';
  yata.general.init();
});
