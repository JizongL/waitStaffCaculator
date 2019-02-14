'use strict';



let DATA = [];

function addEntry(events, squirrel) {
  DATA.push({events, squirrel});
}






function handleEnterMealDetails(){
    console.log('submit meal details to DATA');
    $('#js-enter-meal-details-form').submit(function(event){
        event.preventDefault();
        const newBasePrice = $('.js-base-meal-price-entry').val();
        $('.js-base-meal-price-entry').val('');
        const newTaxRate = $('.js-tax-rate-entry').val();
        $('.js-tax-rate-entry').val('');
        const newTipPercentage = $('.js-tip-percentage').val();
        $('.js-tip-percentage').val('');
        console.log(newBasePrice,newTaxRate,newTipPercentage);
        
    });


    // handle meal details entry
    

}

function handleCustomerCharge(){
    console.log('Display customer cahrges');
}

function handleMyEarningInfo(){
    console.log('display invidual earning info');
}


function waitStaff_calculator(){
  handleEnterMealDetails();
  handleCustomerCharge();
  handleMyEarningInfo();
}

$(waitStaff_calculator);