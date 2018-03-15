//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectDirectory
//USEUNIT SelectGroupFromMainMenu

function C43140_Res_Comp_package_with_Value()
{  
try{
    Log.AppendFolder("C43140_Res_Comp_package_with_Value");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();

 
    var groupNm=defaultGroupName;
    var keyWordNm ="Reservations";
    var packageNm ="No Payment Required Reservation 1 - $25 comp";
    var subPakNm ="Individual";
    var qtyT = 1;
    var dateD =CommonCalender.getTodaysDate();
    selectGroupFinilizeOrderForReservation(groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD);
    aqUtils.Delay(4000);  
   
    var expectedSettlemtnttotal = orderDetailsTotal.Caption;
  //  var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
  //  paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");
  //  ReservationOrderInfo.prototype.ResTotal = paymentTypeBal;
  //  applyAmount(oVariation,paymentTypeBal); 
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    verifyOrderDetailsStoreOrderId(expectedSettlemtnttotal); 
   
    aqUtils.Delay(5000); 
    selectGroupFromMainMenuWithReservationRecord(groupNm);
    aqUtils.Delay(7000); 
    var settlementTotal =orderDetailsTotal.Caption; 
    paymentTypeBal= aqString.Replace(settlementTotal,"$","");  
    Button.clickOnButton(CashButton);
    paymentTypeBal = parseInt(paymentTypeBal);
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
    Button.clickOnButton(applyButton); 
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(2000);
    validateTicket("Don't Validate");
    Log.Message("Don't Validate the order"); 
    verifyTotalOnConfirmationPage(settlementTotal);    
    AppLoginLogout.logout();
  } catch (e) {
		merlinLogError("Oops! There's some glitch in the script: " + e.message);	 
  	return;
	}
	finally {
		Log.PopLogFolder();
	}  
}