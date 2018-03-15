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

function C15952_Res_Loading_Res_with_cancelled_tickets()
{
try{
    Log.AppendFolder("C15952_Res_Loading_Res_with_cancelled_tickets");
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
   //  aqUtils.Delay(3000);
    // Button.clickOnButton(selectablebuttonClosebutton);
    var temp =totalOnOrderScreen.Caption;
    var firstOrderTotal = parseInt((temp.split('$')[1]).trim());
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
    aqUtils.Delay(2000);   
    selectReservationRecord(groupUpdateDataGridReservation);
     aqUtils.Delay(3000);  
    Button.clickOnButton(checkboxReservationOrder);
    clickOnCancelSelectedTickets();
    WrapperFunction.setTextValue(cancelSelectedInputText,"1");
    Button.clickOnButton(cancelSelectedOK);
	  aqUtils.Delay(3000);  
    //examine the reservation details displayed on the ‘Settlement screen’.
    clickLoadReservation();
    aqUtils.Delay(3000);
    temp =orderDetailsTotal.Caption;
    var settlementTotal = parseInt((temp.split('$')[1]).trim());
    reservationWndConvertToPurchaseButton.Click();
    aqUtils.Delay(3000);
    if(secondOrderTotal == settlementTotal){
      Log.Message("Order details are correct on settlement page");
    }
    else{
      merlinLogError("Order details are not correct on settlement page");
    }
      CashButton.Click();      
      Log.Message("Apply remaining amount");
      WrapperFunction.setTextValue(PayamountTextBox,settlementTotal);
      Button.clickOnButton(applyButton); 
      Log.Message("Complete the order");
      WrapperFunction.settlementCompleteOrder();
      Log.Message("Don't Validate the order");
      aqUtils.Delay(2000);
      validateTicket("Don't Validate"); 
      verifyTotalOnConfirmationPage(settlementTotal);
      
      var orderId = cnf_orderID1.Caption;
      if (orderId == null){
        merlinLogError("Order id is not present");
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