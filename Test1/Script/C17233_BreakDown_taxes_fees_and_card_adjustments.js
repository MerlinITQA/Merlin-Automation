//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT ConvertReservationsToPurchase
//USEUNIT VerifyCheckProperty

function C17233_BreakDown_taxes_fees_and_card_adjustments()
{
  
  try {
    Log.AppendFolder("C17233_BreakDown_taxes_fees_and_card_adjustments");
   InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var keyWordNm ="Daily Tickets";
    var packageNm = "Package with dual tax";
    var subPakNm="Adult";
    var dateD = CommonCalender.getTodaysDate();
    OrderInfo.prototype.OrderID = 0;
    WrapperFunction.selectKeywordName(keyWordNm);
//    allPackages.MouseWheel(-1);
//    allPackages.MouseWheel(-1); 
    
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(2000);     
    if(datetimeformSubWindow.Exists){
     selectDateFromSubWindow(dateD);    
      selectNextButtonFromSubWindow();   
    }   
    aqUtils.Delay(3000); 
     var fFees =feesOnOrderScreen.Caption;    
     var aFees= (fFees.split('$')[1]).trim();       
     if( aFees != 0){
        Log.Message("The processing fee has been added to the correct packages.")
     }
     else{
        merlinLogError("The processing fee has NOY been added to the correct packages.")
     } 
     var sSubTotal = subTotalOnOrderScreen.Caption;
     var sCartAdjustments =cartadjustmentsOnOrderScreen.Caption;
     var sTax =taxOnOrderScreen.Caption;
     var sFees =feesOnOrderScreen.Caption;
     var sTotal =(totalOnOrderScreen.Caption.split(':')[1]).trim();
       
    // verifyCartDetailsFunctionality(sSubTotal,sCartAdjustments,sTax,sFees,sTotal);
    // Removed this step as new functionanlity is implemented
    aqUtils.Delay(2000);  
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
  // verifyCartDetailsFunctionality(sSubTotal,sCartAdjustments,sTax,sFees,sTotal);
   AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
   
}
 
 