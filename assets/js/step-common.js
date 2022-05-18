(function( $ ){

$( document ).ready(function() {

        var next_current = 0;
        var prev_current = 0;

        function loadModal($ele){

         //Form Claims

         var $form = $('.wrap-template').find("form");

           if($form.length > 0){

               var $btnNext = $form.find('.st-next');
               
               var $btnPrev =  $form.find('.st-prev');

               var $btnCancel = $form.find('.st-cancel');

               var $btnSubmit = $form.find('.btn-submit-form');

               var $btnRedirect = $form.find('.cta-button.redirect');
               $btnRedirect.hide();

               var $totalStep = $form.find('.bonds-step').length;
               var num_next =   $btnNext.data('num');
               var num_prev =   $btnPrev.data('num');
               next_current = num_next;
               prev_current = num_prev;

               const updateStep = function($btn){

                 if($btn != undefined){
                    
                   if($btn == 'next'){

                     next_current++;
                     prev_current++;
                     
                     //Next
                     if(next_current >= $totalStep ){
                       $btnNext.hide();
                       $btnPrev.hide();
                       $btnRedirect.show();

                       $btnCancel.show();
                       $btnSubmit.show();

                     }else{
                      $btnPrev.show();
                      $btnNext.show();
                     }

                     $form.find('.bonds-step').hide();
                     $form.find('.bonds-step-' + next_current).show();

                   }

                   if($btn == 'prev'){

                     //Prev
                     next_current--;
                     prev_current--;

                     if(prev_current <= 0 ){
                      $btnPrev.hide();
                      $btnNext.show();
                     }else{
                      $btnPrev.show();
                      $btnNext.show();
                     }

                     $form.find('.bonds-step').hide();
                     $form.find('.bonds-step-' + next_current).show();

                   }


                   $btnNext.data('num',next_current);
                   $btnPrev.data('num',prev_current);

                 }else{
                   if($totalStep == 0) return;
                   if($totalStep == 1) {
                    $btnPrev.hide();
                    $btnNext.hide();
                   }else{
                    $btnPrev.hide();
                    $btnNext.show();
                   }
                 }
               }

               //Load function
               updateStep();

               $btnNext.on('click',function(){
                 updateStep('next');
               });

               $btnPrev.on('click',function(){
                 updateStep('prev');
               });

               var $eClaims = $form.find('.bonds-template-add-new-booking');
               if($eClaims.length > 0){
                 renderFunctionseClaims($eClaims);
               }

           }

        }

        const renderFunctionseClaims = function($eClaims){
            var $fields = $eClaims.find('.bonds-fields-bookings');
            var $addNew = $eClaims.find('.bonds-add-another-leg');
            // var $clearForm = $eClaims.find('.rt-clear-form');
            var $newline = $fields.find('.bonds-item-booking[data-field="0"]').html();
            var $countLine = 1;

            if ($countLine == 1) {
              $eClaims.find('.service-level').remove();
            }

            const htmlNewLine = function (numLine){
              return '<div class="bonds-item-booking new-line" data-field="'+numLine+'">'+$newline.replaceAll('[0]', '['+numLine+']')+'</div>';
            }

            const renderFuncSelects = function(){
              $('.custom-select-wrap').each(function () {
                  // Cache the number of options
                  var $this = $(this);

                  var isNewLine = $this.closest('.bonds-item-booking');

                  var $select = $this.find('select');

                  if(isNewLine.hasClass('new-line') && !$this.hasClass('added')){
                    var $custom_select = $this.find('.custom-select') // Show the first select option in the styled div
                    $this.addClass('added');

                    // Insert an unordered list after the styled div and also cache the list
                    let $list = $this.find('.options');

                    // Cache the list items
                    let $listItems = $list.children('li');

                    // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
                    $custom_select.click(function (e) {
                       e.stopPropagation();
                       if(!$(this).hasClass('active')){
                         $('div.custom-select.active').each(function () {
                             $(this).removeClass('active').next('ul.options').hide();
                         });
                       }
                       $(this).toggleClass('active').next('ul.options').toggle();
                    });
                    // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
                    // Updates the select element to have the value of the equivalent option
                    $listItems.click(function (e) {
                       e.stopPropagation();
                       $custom_select.text($(this).text()).removeClass('active');
                       $select.val($(this).attr('rel')).change();
                       $list.children('li').removeClass('selected');
                       $(this).addClass('selected');
                       $list.hide();
                       /* alert($this.val()); Uncomment this for demonstration! */
                    });
                    // Hides the unordered list when clicking outside of it
                    $(document).click(function () {
                       $custom_select.removeClass('active');
                       $list.hide();
                    });
                  }
              });
            }

            const renderFuncTextArea = function() {
              $('.limit_line').each(function () {
                  // Cache the number of options
                  var $this = $(this);
                  var isNewLine = $this.closest('.bonds-item-booking');

                  if( isNewLine.hasClass('new-line') ){

                    $(this).keyup( function() {

                      var text = $(this).val().replace("\n", ""),
                          $count_rows = $(this).val().split("\n").length,
                          $val_character = $(this).val();
                          

                      if (text.length > 20) {

                          var chunks = text.match(/.{1,20}/g);

                          if (chunks.length > 20) { 
                              chunks.splice(20, chunks.length - 1);
                          }

                          $(this).val( chunks.join("\n") );
                      }

                      if( $val_character == '' ){
                          $(this).siblings('.text-status').find('span').text(0);
                      }else{
                          $(this).siblings('.text-status').find('span').text( $count_rows );
                      }
                      
                    });
                  }

              });
            }

            //Add new line
            $addNew.on('click',function(){
                var $htmlNewLine = htmlNewLine($countLine);
                $fields.append($htmlNewLine);
                $countLine++;
                renderFuncSelects();
                renderFuncTextArea();
            });

            //Clear form
            // $clearForm.on('click',function(){
            //     let text = "Are you sure to want 'CLEAR FORM'!";
            //     if (confirm(text) == true) {
            //       var $htmlNewLine = htmlNewLine(0);
            //       $fields.empty();
            //       $fields.append($htmlNewLine);
            //       $countLine = 1;
            //       renderFuncSelects();
            //       if(next_current == 4){
            //         setTimeout(function(){
            //           updateDataTableClaim($eClaims);
            //         },100);
            //       }
            //     }
            // });

        }

        loadModal();

    });

})( jQuery );