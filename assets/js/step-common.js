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
                      //  $btnNext.css('visibility','hidden');
                       $btnNext.hide();
                       $btnRedirect.show();

                     }else{
                      //  $btnPrev.css('visibility','visible');
                      //  $btnNext.css('visibility','visible');
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
                      //  $btnPrev.css('visibility','hidden');
                      $btnPrev.hide();
                      //  $btnNext.css('visibility','visible');
                      $btnNext.show();
                     }else{
                      //  $btnPrev.css('visibility','visible');
                      $btnPrev.show();
                      //  $btnNext.css('visibility','visible');
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
                    //  $btnPrev.css('visibility','hidden');
                    $btnPrev.hide();
                    //  $btnNext.css('visibility','hidden');
                    $btnNext.hide();
                   }else{
                    //  $btnPrev.css('visibility','hidden');
                    $btnPrev.hide();
                    //  $btnNext.css('visibility','visible');
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

               var $eClaims = $form.find('.rt-template-add-new-elaims');
               if($eClaims.length > 0){
                 renderFunctionseClaims($eClaims);
               }

           }

        }

        loadModal();

    });

})( jQuery );