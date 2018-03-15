//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT ConvertReservationsToPurchase
//USEUNIT VerifyCheckProperty

function m()
{
  
  try {
    Log.AppendFolder("m");
     InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
    var keyWordNm ="Taxes and Fees";
    var packageNm = "2 site Combi (with $2 fee)";
    var subPakNm="Adult";
    var dateD = CommonCalender.getTodaysDate();     
    OrderInfo.prototype.OrderID = 0;
    WrapperFunction.selectKeywordName(keyWordNm);  
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(2000);     
    if(datetimeformSubWindow.Exists){
     selectDateFromSubWindow(dateD);    
      selectNextButtonFromSubWindow();    
       aqUtils.Delay(2000);        
       Button.clickOnButton(selectablebuttonClosebutton);
      }
     var fFees =feesOnOrderScreen.Caption;    
     var aFees= (fFees.split('$')[1]).trim();       
     if( aFees != 0){
        Log.Message("The processing fee has been added to the correct packages.")
     }
     else{
        merlinLogError("The processing fee has NOT been added to the correct packages.")
     } 
    
     var sSubTotal = subTotalOnOrderScreen.Caption;
     var sCartAdjustments =cartadjustmentsOnOrderScreen.Caption;
     var sTax =taxOnOrderScreen.Caption;
     var sFees =feesOnOrderScreen.Caption;
     var sTotal =(totalOnOrderScreen.Caption.split(':')[1]).trim();
    /* 
     sTax= (sTax.split('$')[1]).trim();       
     if( sTax != 0){
        Log.Message("The processing tax has been added.")
     }
     else{
        merlinLogError("The processing tax has NOT been added.")
     }  
    */
     finilizeOrder();
     aqUtils.Delay(2000);  
     
     var settlementSubTotal = orderDetailsSubTotal.Caption;
     var settlementTotal =orderDetailsTotal.Caption; 
     var settlementCartAdjustments =orderDetailsCartAdjustment.Caption;
     var settlementTax =orderDetailsTax.Caption;
     var settlementFees =orderDetailsFees.Caption;  
     if(compareStringObj(settlementSubTotal,sSubTotal)
       && compareStringObj(settlementCartAdjustments,sCartAdjustments)
       && compareStringObj(settlementTax,sTax)
       && compareStringObj(settlementFees,sFees)
       && compareStringObj(settlementTotal,sTotal)
     ){
        Log.Message("Order details are matching on settlement page.");     
     }else{
        merlinLogError("Order details are not matching on settlement page.");
      }  
       
    var expectedSettlemtnttotal = orderDetailsTotal.Caption;
    var applyAmount= (expectedSettlemtnttotal.split('$')[1]).trim(); 
    CashButton.Click();       
     if(applyAmount != 0){
      Log.Message("Apply amount");
      WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
      Button.clickOnButton(applyButton); 
      }
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(2000);
    validateTicket("Don't Validate");
    Log.Message("Don't Validate the order");  
    verifyTotalOnConfirmationPage(expectedSettlemtnttotal);
    var orderId = cnf_orderID1.Caption;
    if (orderId == null){
      merlinLogError("Order id is not present");
    }  
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally {  
      AppLoginLogout.logout(); 
	    Log.PopLogFolder();
    }      
  
}
