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
        console.log(newBasePrice,newTaxRate*0.01,newTipPercentage*0.01);
        addEntry(Number(newBasePrice), Number(newTaxRate)*0.01,Number(newTipPercentage)*0.01);
        console.log(DATA);
        handleCustomerCharge();
    });
    renderCalculator();
    

    // handle meal details entry
    

}

function calculateSubtotal(basePrice,taxRate){
    console.log('calculate subtotal');
    return basePrice+(basePrice*taxRate);
}

function calculateTip(basePrice,TipPercentage){
    return basePrice*TipPercentage;
}

function calculateTotal(subtotal,tip){
    return subtotal+tip;
}

function updateCustomerCharges(subtotal,tip,total){
    $('#subtotal-update').text(subtotal);
    $('#tip-update').text(tip);
    $('#total-update').text(total);
}

function handleCustomerCharge(){
    console.log('Display customer cahrges');
    console.log('return last item of Data',DATA[DATA.length-1]);
    const basePrice = DATA[DATA.length-1]['newBasePrice'];
    const taxRate = DATA[DATA.length-1]['newTaxRate'];
    const tipPercentage = DATA[DATA.length-1]['newTipPercentage'];
    console.log('testing for calculation',basePrice,taxRate,tipPercentage);
    const subtotal = calculateSubtotal(basePrice,taxRate);
    const tip = calculateTip(basePrice,tipPercentage);
    const total = subtotal+tip;
    console.log('calcuated result',subtotal,tip,total);
    updateCustomerCharges(subtotal,tip,total);
    handleMyEarningInfo();
}


function tipTotal(){
    console.log('tipTotal ran');
}

function mealCount(){
    console.log('mealCount ran');
}

function averageTipPerMeal(){
    console.log('averageTipPerMeal ran');
}

function handleMyEarningInfo(){
    console.log('display invidual earning info');
    let tipTotal = 0;
    let mealCount = 0;
    
    for(let item of DATA){
        tipTotal+= (item['newBasePrice']*item['newTaxRate']);
        mealCount += 1;
    }
    let averageTipPerMeal = tipTotal/mealCount;
    $('#tip-total-update').text(tipTotal);
    $('#meal-count-update').text(mealCount);
    $('#average-tip-per-meal').text(averageTipPerMeal);
}


function waitStaff_calculator(){
  handleEnterMealDetails();
  handleCustomerCharge();
  handleMyEarningInfo();
  resetData();
  renderCalculator();
}

$(waitStaff_calculator);