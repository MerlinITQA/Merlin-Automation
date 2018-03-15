//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
function C43120_Correct_amount_Apply_Balance_button()
{
try{
    Log.AppendFolder("C43120_Correct_amount_Apply_Balance_button");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var groupNm=defaultGroupName;
    var paymentTypeForReservation = "Cash";
    var keyWordNm ="Retail";
    var packageNm ="Photo Package";
    var subPakNm ="Retail";
    var qtyT = 2;
    var dateD =CommonCalender.getTomorrowsDate();  
    aqUtils.Delay(2000);
   
    WrapperFunction.selectKeywordName(keyWordNm);  
    selectPackage(packageNm,subPakNm); 
    aqUtils.Delay(2000);
    if(datetimeformSubWindow.Exists && datetimeformSubWindow.VisibleOnScreen){
      selectDateFromSubWindow(dateD); //mm-dd-yyyy         
      selectNextButtonFromSubWindow();
      aqUtils.Delay(2000);     
        if(selectablebuttonClosebutton.Exists && selectablebuttonClosebutton.VisibleOnScreen){   
        Button.clickOnButton(selectablebuttonClosebutton);
       }
      } 
     var sSubTotal = subTotalOnOrderScreen.Caption;
     var sCartAdjustments =cartadjustmentsOnOrderScreen.Caption;
     var sTax =taxOnOrderScreen.Caption;
     var sFees =feesOnOrderScreen.Caption;
     var sTotal =(totalOnOrderScreen.Caption.split(':')[1]).trim();
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
    Button.clickOnButton(applyBalance);
     aqUtils.Delay(2000);
    var applyedAmt = paymentListFirstItem.PaymentListItem("payItem").HGroup(0).Label("amtLabel").Caption;
    if(compareStringObj(applyedAmt,sTotal)){
      Log.Message("Correct amount is applyed.");
    }else{
      merlinLogError("Wrong amount is is applyed.");
    }  
    WrapperFunction.settlementCompleteOrder();
    Log.Message("Don't Validate the order");
    aqUtils.Delay(2000);
    validateTicket("Don't Validate");      
    aqUtils.Delay(3000);        
    verifyTotalOnConfirmationPage(applyedAmt); 
    
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
      AppLoginLogout.logout(); 
	    Log.PopLogFolder(); 
    }   
     
}