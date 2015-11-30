var yata = yata || {};
yata.general = (function() {
  'use strict';

  function init() {
    dragDropMenu();
    toggleLabelPopover();
    linkPreventDefault();
    createTitlePage();
    confirmNewPage();
    confirmEditPage();
    openEditPage();
    showBoxPages();
    openModal();
    bindCloseModal();
    bindCloseModalEsc();
    removePage();
    buttonDelete();
    bindClear();
    menu();
    dropListPages();
  }


  function toggleLabelPopover(){
    $('#ember590 label').on('click', function(){
      $('input[name="cs-sidebar-new-page"]').removeAttr('checked');
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

  function clearFields(el){
    $(el).closest('.cs-sidebar-new-page').find('.test-title').val("")
    $(el).closest('.cs-sidebar-new-page').find('.test-url').val("")
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
      $('input[name="cs-sidebar-new-page"]').removeAttr('checked');
      var el = this;
      $('.test-page').addClass('hide');
      // $('#add-page').trigger('click');
      loadingPage();
      setTimeout(function(){
        $('.image-empty').addClass('show');
        $('#page-event').removeClass('hide');
        $('#option-eventos').removeClass('hide');
        clearFields(el);
      },3100)
    });
  }

  function confirmEditPage(){
    $('.confirm-edit-page').on('click', function(){
      var menu = $(this).closest('.cs-sidebar-new-page').find('.test-title').val();
      var id = $(this).closest('.cs-sidebar-new-page').prev().attr('id')

      var text = $('.cs-list-pages [data-target="#' + id + ']').parents('li');
      $('[data-target="#' + id + '"]').closest('li').find('.cs-pages-link .menu').text(menu)

      $('.test-page').addClass('hide');
      loadingPage();


      if( id == 'cs-sidebar-edit-page-4'){
        setTimeout(function(){
          $('#page-fale-conosco').removeClass('hide');
        },3100)
      }else{
        setTimeout(function(){
          $('[data-target="#' + id + '"]').closest('li').find('.cs-pages-link').click();
        },3100)

      }


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
    $(el).closest('.cs-modal').removeClass('opened').removeAttr('data-id');
    $('.cs-modal-overlay').remove();

  }


  function bindCloseModalEsc() {
    $(document).on('keyup', function (e) {
      if(e.keyCode === 27){
        closeModal('[data-close="modal"]');
      }
    });

  }

  function bindClear(){
    $('[data-event="clear"]').on('click', function(){
      clearFields(this);
    });
  }

  function removePage(){
    $('.cs-btn-confirm').on('click', function(){

      var id = $('#modal-remove-page').attr('data-id');
      $('.cs-page').find('img').hide();
      closeModal(this);
      loadingPage();

      setTimeout(function(){
        $('[data-target="' + id + '"]').closest('li').hide();
        $('.image-fake').removeClass('hide').find('img').show();
      },3100);

    });
  }

  function buttonDelete(){
    $('.cs-btn-danger').on('click', function(){
      var id = $(this).closest('.cs-sidebar-new-page').prev().attr('id')
      $('#modal-remove-page').attr('data-id', '#' + id);
    });
  }


  function menu(){
    $('.cs-pages-link').on('click', function(e){
      e.preventDefault();
      var ref = $(this).attr('href');
      $('.test-page').addClass('hide');
      $(ref).removeClass('hide')
    });
  }

  function dropListPages(){
    $('#drop-pages').on('change',function(){
      var ref = $(this).val();
      $('.test-page').addClass('hide');
      $(ref).removeClass('hide')
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
