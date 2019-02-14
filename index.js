'use strict';



let DATA = [];

// add new entry to DATA
function addEntry(newBasePrice, newTaxRate,newTipPercentage) {
  DATA.push({id:cuid(),newBasePrice, newTaxRate,newTipPercentage});
}

// If reset button is clicked, empty DATA array, and reset all the values 
// on Customer Charges and My Earnings Info
function resetData(){
  console.log('resetData ran ');
  $('#reset-data').on('click',function(event){        
    DATA=[];
    $('#subtotal-update').text(0);
    $('#tip-update').text(0);
    $('#total-update').text(0);
    $('#tip-total-update').text(0);
    $('#meal-count-update').text(0);
    $('#average-tip-per-meal').text(0);
  });
}

// for test purpose, it logs DATA 
function logArrayItems(){
  console.log('testing: ',DATA);
}



// handle new entry values of Meal details
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
    // testing log
    console.log(newBasePrice,newTaxRate*0.01,newTipPercentage*0.01);
    // convert entry from string to number and add to Array.
    addEntry(Number(newBasePrice), Number(newTaxRate)*0.01,Number(newTipPercentage)*0.01);
    // testing log
    console.log(DATA);
    handleCustomerCharge();
  });
  // log array to confirm it is working,only for testing
  logArrayItems();
    

  // handle meal details entry
    

}
// calculate subtotal 
function calculateSubtotal(basePrice,taxRate){
  console.log('calculate subtotal');
  return basePrice+(basePrice*taxRate);
}

// calculate tip
function calculateTip(basePrice,TipPercentage){
  return basePrice*TipPercentage;
}

// calculate total
function calculateTotal(subtotal,tip){
  return subtotal+tip;
}

// update Customer Charges values
function updateCustomerCharges(subtotal,tip,total){
  $('#subtotal-update').text(subtotal);
  $('#tip-update').text(tip);
  $('#total-update').text(total);
}

// handle customer charge box details
function handleCustomerCharge(){
  // testing log
  console.log('Display customer cahrges');
  console.log('return last item of Data',DATA[DATA.length-1]);
  // prevent if the initial list is empty would throw an error
  if(DATA.length!==0){
    const basePrice = DATA[DATA.length-1]['newBasePrice'];
    const taxRate = DATA[DATA.length-1]['newTaxRate'];
    const tipPercentage = DATA[DATA.length-1]['newTipPercentage'];
    // testing log    
    console.log('testing for calculation',basePrice,taxRate,tipPercentage);
    // call calculation functions and assign to new variables subtotal, tip.
    const subtotal = calculateSubtotal(basePrice,taxRate);
    const tip = calculateTip(basePrice,tipPercentage);
    // calculate subtotal
    const total = subtotal+tip;
    // testing log
    console.log('calcuated result',subtotal,tip,total);
    // call updateCustomerCharges function to update values displayed within Customer Charges box
    updateCustomerCharges(subtotal,tip,total);
    // call handleMyEarningInfo to update My Earnings Info box.
    handleMyEarningInfo();}
}



function handleMyEarningInfo(){
  console.log('display invidual earning info');
  let tipTotal = 0;
  let mealCount = 0;
  // iterate through to claculate tipTotal and mealCount.
  for(let item of DATA){
    tipTotal+= (item['newBasePrice']*item['newTaxRate']);
    mealCount += 1;
  }
  let averageTipPerMeal = tipTotal/mealCount;
  // not a good bug patch, but when page is refreshed, DATA is empty, therefore
  // when this function runs, it will return averageTipPerMeal as NaN. So, the `if`
  // is to set averageTipPerMeal equals 0 if its value is NaN.
  if (isNaN(averageTipPerMeal)){
    $('#average-tip-per-meal').text(0);    
    // else, update all values as normal
  }else{
    $('#tip-total-update').text(tipTotal);
    $('#meal-count-update').text(mealCount);
    $('#average-tip-per-meal').text(averageTipPerMeal);
  }
}

// main function to call all major handlers 
function waitStaff_calculator(){
  handleEnterMealDetails();
  handleCustomerCharge();
  handleMyEarningInfo();
  resetData();
  logArrayItems();
}

$(waitStaff_calculator);