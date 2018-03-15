//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT ConvertReservationsToPurchase
//USEUNIT VerifyCheckProperty

function C16030_Settlement_Screen_VAT_Display()
{
 
  try {
    Log.AppendFolder("C16030_Settlement_Screen_VAT_Display");
     InitializationEnviornment.initiliaze();
     AppLoginLogout.login();
    var keyWordNm ="Daily Tickets";
    var packageNm = "Package with fees and tax";
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
    aqUtils.Delay(2000);     
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
    
//     cartdetailsCartfeedetails.Click(1,1,0);
//     cartAdjustment = cartdetailsdatagroupAdjlist.ListItem("[object Object]").HGroup(0).Label("amountLabel").Caption;
//     cartTax = cartdetailsdatagroupTaxlist.ListItem("[object Object]").HGroup(0).Label("amountLabel").Caption;
//     cartTotalTax = cartdetailsdatagroupTaxlist.ListItem("[object Object]", 1).HGroup(0).Label("amountLabel").Caption;
//     cartProcessingFee = cartdetailsdatagroupFeelist.ListItem("[object Object]").HGroup(0).Label("amountLabel").Caption;
//     cartFeeTotal = cartdetailsdatagroupFeelist.ListItem("[object Object]", 1).HGroup(0).Label("amountLabel").Caption;
//     VerifyCheckProperty.compareStringObj(sCartAdjustments,cartAdjustment);
//     VerifyCheckProperty.compareStringObj(sTax,cartTax);
//     VerifyCheckProperty.compareStringObj(sFees,cartFeeTotal);
//     aqUtils.Delay(1000);
//     cartdetailsClosebutton.Click();
     
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
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
   AppLoginLogout.logout(); 
}
