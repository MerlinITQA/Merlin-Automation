//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu

function C17364_Reservations_Date_Time_Capacity()
{
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
  var groupNm=defaultGroupName;
 
  var keyWordNm ="Reservations";
  var packageNm ="Minimum Payment Required Reservation 2";
  var subPakNm ="Individual";
  var qtyT = 1;
  var paymentTypeForReservation = "Cash";
  var dateD =CommonCalender.getTodaysDate();  
  try {
    Log.AppendFolder("C17364_Reservations_Date_Time_Capacity");
      selectGroupFromMainMenu(groupNm);
      clickBuyTicketsButton();
      addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);
      finilizeOrder();
      aqUtils.Delay(3000);
      clickConvertToReservation();
      aqUtils.Delay(4000);  
      var expectedSettlemtnttotal = orderDetailsTotal.Caption;
      var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
      paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");  
      Button.clickOnButton(CashButton);
      paymentTypeBal = parseInt(paymentTypeBal);
      WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
      Button.clickOnButton(applyButton);
      if(paymentTypeForReservation == "Cash" && applycashrespopupCashPaymentOKButton.Exists){
          Button.clickOnButton(applycashrespopupCashPaymentOKButton);
      }
      Log.Message("Complete the order");
      WrapperFunction.settlementCompleteOrder();
      verifyOrderDetailsStoreOrderId(expectedSettlemtnttotal);  
  
    selectReservationRecordToAddReservation(groupNm);
    aqUtils.Delay(5000); 
//    selectQuantity(qtyT);
//    Keyword_Listgroup.MouseWheel(-1,0);
//    Keyword_Listgroup.MouseWheel(-1,0);
//    Keyword_Listgroup.MouseWheel(-1,0);
//    Keyword_Listgroup.MouseWheel(-1,0);
//    Keyword_Listgroup.Refresh();
//    Keyword_Listgroup.Refresh();
//    aqUtils.Delay(2000);     
     
     WrapperFunction.selectKeyword(keyWordNm);
      selectQuantity(qtyT+1);
      selectPackage("Minimum Payment Required Reservation 3",subPakNm);
      aqUtils.Delay(2000);
      if(datetimeformSubWindow.Exists){   
        selectDateFromSubWindow(dateD); //mm-dd-yyyy  
        selectNextButtonFromSubWindow(); }   
        
    finilizeOrder();  
    aqUtils.Delay(3000);     
    var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
    paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");  
    Button.clickOnButton(CashButton);
    paymentTypeBal = parseInt(paymentTypeBal);
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
    Button.clickOnButton(applyButton);
    if(paymentTypeForReservation == "Cash" && applycashrespopupCashPaymentOKButton.Exists){
          Button.clickOnButton(applycashrespopupCashPaymentOKButton);
    }
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(5000); 
    selectGroupFromMainMenuWithReservationRecord(groupNm);
    aqUtils.Delay(3000); 
    var settlementTotal =orderDetailsTotal.Caption; 
    paymentTypeBal= aqString.Replace(settlementTotal,"$","");  
    Button.clickOnButton(CashButton);
    paymentTypeBal = parseInt(paymentTypeBal);
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
    Button.clickOnButton(applyButton);
    if(paymentTypeForReservation == "Cash" && applycashrespopupCashPaymentOKButton.Exists){
          Button.clickOnButton(applycashrespopupCashPaymentOKButton);
    }
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(2000);
    validateTicket("Don't Validate");
    Log.Message("Don't Validate the order"); 
    verifyTotalOnConfirmationPage(settlementTotal);    
    } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally { 
		    Log.PopLogFolder();
	    }    
  AppLoginLogout.logout();  
}