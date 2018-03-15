//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectQuantityFromHeader

function C15891_Settlement_Screen_verify_currency()
{ 
try {
    Log.AppendFolder("C15891_Settlement_Screen_verify_currency");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var keyWordNm ="Daily Admission";
    var packageNm = "Date/Time";
    var subPakNm="Adult";
    WrapperFunction.selectKeywordName(keyWordNm);
	SelectQuantityFromHeader.selectQuantity(2);
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(3000);       
  //   if(datetimeformSubWindow.Exists){
      selectDateFromSubWindow(dateD); //mm-dd-yyyy  
      selectNextButtonFromSubWindow();
   // }
     var sSubTotal = subTotalOnOrderScreen.Caption;
     var sCartAdjustments =cartadjustmentsOnOrderScreen.Caption;
     var sTax =taxOnOrderScreen.Caption;
     var sFees =feesOnOrderScreen.Caption;
     var sTotal = totalOnOrderScreen.Caption;
    if(sSubTotal.includes("$") && sCartAdjustments.includes("$") && sTax.includes("$") && sFees.includes("$") && sTotal.includes("$")){
      Log.Message("The type of currency is displayed as $.")
    }else{
      merlinLogError("The type of currency is not displayed as $. on window")
    }
    finilizeOrder();
    aqUtils.Delay(2000);
     var settlementSubTotal = orderDetailsSubTotal.Caption;
     var settlementTotal =orderDetailsTotal.Caption; 
     var settlementCartAdjustments =orderDetailsCartAdjustment.Caption;
     var settlementTax =orderDetailsTax.Caption;
     var settlementFees =orderDetailsFees.Caption;  
      if(settlementSubTotal.includes("$") && settlementTotal.includes("$") 
      && settlementCartAdjustments.includes("$") && settlementTax.includes("$") 
      && settlementFees.includes("$")){
      Log.Message("The type of currency is displayed as $ on settlement page.")
    }else{
      merlinLogError("The type of currency is not displayed as $ on settlement page.")
    }
   AppLoginLogout.logout();   
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder(); 
    }
}