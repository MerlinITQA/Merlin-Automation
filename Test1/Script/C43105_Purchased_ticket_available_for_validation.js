//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PassholderDetails
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT SelectDirectory
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu

function C43105_Purchased_ticket_available_for_validation()
{
try{
    Log.AppendFolder("C43105_Purchased_ticket_available_for_validation");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var groupNm=defaultGroupName;
    var paymentTypeForReservation = "Cash";
    var keyWordNm ="Reservations";
    var packageNm ="Minimum Payment Required Reservation 1";
    var packageNm1 ="Minimum Payment Required Reservation 2";
    var subPakNm ="Individual";
    var qtyT = 1;
    var dateD =CommonCalender.getTodaysDate();  
    
    selectGroupFromMainMenu(groupNm);
    clickBuyTicketsButton();
    addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);
       aqUtils.Delay(3000);
    var temp =totalOnOrderScreen.Caption;
    var firstOrderTotal = parseInt((temp.split('$')[1]).trim());
  //  Button.clickOnButton(selectablebuttonClosebutton);
    
    addNewTicket(keyWordNm,packageNm1,subPakNm,qtyT,dateD);
       aqUtils.Delay(3000);
    temp =totalOnOrderScreen.Caption;
    var secondOrderTotal = parseInt((temp.split('$')[1]).trim()) - firstOrderTotal;
    finilizeOrder();
    aqUtils.Delay(3000);
    clickConvertToReservation();
    aqUtils.Delay(4000);  
    verifyPrefixGreenColorReservation(packageNm);  
    var expectedSettlemtnttotal = orderDetailsTotal.Caption;
    var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
    paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");  
    selectPaymentTypeAddRequiredFields(paymentTypeForReservation);
    paymentTypeBal = parseInt(paymentTypeBal);
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
    Button.clickOnButton(applyButton);
    if(paymentTypeForReservation == "Cash" && applycashrespopupCashPaymentOKButton.Exists){
      Button.clickOnButton(applycashrespopupCashPaymentOKButton);
    }
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(5000);   
    //aqObject.CheckProperty(orderDetailsTotal,"Caption", cmpEqual, expectedSettlemtnttotal);  
	verifyTotalOnConfirmationPageReservation(expectedSettlemtnttotal);
    var orderId = cnf_orderID.Caption;
    if (orderId == null){
      merlinLogError("Order id is not present");
    } 
    var reservationOrderID= (orderId.split('#')[1]).trim();
    ReservationOrderInfo.prototype.ResID = reservationOrderID;
    Log.Message("Reservation id is set:",reservationOrderID);    
    selectGroupFromMainMenu(groupNm);
    selectReservationRecord(groupUpdateDataGridReservation);
    Button.clickOnButton(checkboxReservationOrder);
    clickOnCancelSelectedTickets();
    WrapperFunction.setTextValue(cancelSelectedInputText,"1");
    Button.clickOnButton(cancelSelectedOK);
	  aqUtils.Delay(3000);  
    //examine the reservation details displayed on the ‘Settlement screen’.
    clickLoadReservation();
    aqUtils.Delay(5000); 
    clickConvertToPurchase();
    temp =orderDetailsTotal.Caption;
    var settlementTotal = parseInt((temp.split('$')[1]).trim());
    if(secondOrderTotal == settlementTotal){
      Log.Message("Order details are correct on settlement page");
    }
    else{
      merlinLogError("Order details are not correct on settlement page");
    }
    aqUtils.Delay(3000); 
    var settlementTotal =orderDetailsTotal.Caption; 
    paymentTypeBal= aqString.Replace(settlementTotal,"$","");  
    Button.clickOnButton(CashButton);
   
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
     AppLoginLogout.logout();  
        } catch (e) {
  	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
      }
      finally { 
  	    Log.PopLogFolder();
      }  
}