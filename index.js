'use strict';



let DATA = [];

function addEntry(newBasePrice, newTaxRate,newTipPercentage) {
  DATA.push({id:cuid(),newBasePrice, newTaxRate,newTipPercentage});
}

function resetData(){
    console.log('resetData ran ');
    $('#reset-data').on('click',function(event){        
        DATA=[];
        renderCalculator();
    });
};

function renderCalculator(){
    console.log('testing: ',DATA);
};



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
        addEntry(newBasePrice, newTaxRate,newTipPercentage);
        console.log(DATA);
    });
    renderCalculator();

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
  resetData();
  renderCalculator();
}

$(waitStaff_calculator);