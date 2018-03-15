//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT SelectDirectory
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu

function C43067_Verify_that_notes_added_to_an_Order_Memo()
{
try {
    Log.AppendFolder("C43067_Verify_that_notes_added_to_an_Order_Memo");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var groupNm=defaultGroupName;
    var paymentTypeForReservation = "Cash";
    var keyWordNm ="Reservations";
    var packageNm ="Minimum Payment Required Reservation 1"; 
    var subPakNm ="Individual";
    var textForMemoField = "Memo Test";
    var qtyT = 1;
    var dateD =CommonCalender.getTodaysDate();  
    
    selectGroupFromMainMenu(groupNm);
    clickBuyTicketsButton();
    addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);
    finilizeOrder();
     aqUtils.Delay(3000);
    var temp =orderDetailsTotal.Caption;
    var firstOrderTotal = parseInt((temp.split('$')[1]).trim()); 
    
    aqUtils.Delay(3000);
    clickConvertToReservation();
    aqUtils.Delay(4000);
    
      WrapperFunction.setTextValue(textareaOrdermemo,textForMemoField);
      aqUtils.Delay(1000);
      ReservationOrderInfo.prototype.ResTotal = 0;
      ReservationOrderInfo.prototype.ResID = 0;
      var expectedSettlemtnttotal = orderDetailsTotal.Caption;
      var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
      paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");
      ReservationOrderInfo.prototype.ResTotal = paymentTypeBal;
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        // aqUtils.Delay(2000);
        Button.clickOnButton(applycashrespopupCashPaymentOKButton);
      Log.Message("Complete the order");
      WrapperFunction.settlementCompleteOrder();
      //aqObject.CheckProperty(orderDetailsTotal,"Caption", cmpEqual, expectedSettlemtnttotal);  
	  verifyTotalOnConfirmationPageReservation(expectedSettlemtnttotal);
      var orderId = cnf_orderID.Caption;
      if (orderId == null){
        merlinLogError("Order id is not present");
      } 
      var reservationOrderID= (orderId.split('#')[1]).trim();
      ReservationOrderInfo.prototype.ResID = reservationOrderID;
      Log.Message("Reservation id is set:"+reservationOrderID);  
      selectGroupFromMainMenuWithReservationRecord(groupNm);
      aqUtils.Delay(2000);
      var memoText = textareaOrdermemo.Caption;
      VerifyCheckProperty.compareStringObj(memoText,textForMemoField);      
      WrapperFunction.setTextValue(textareaOrdermemo,textForMemoField);
      //clickConvertToPurchase();           
      var paymentTypeTotal=orderDetailsTotal.Caption;     
      Button.clickOnButton(CashButton);
      var paymentTypeBal= PaymentType_BalanceLabel.Caption;
      paymentTypeBal= aqString.Replace(paymentTypeBal,"Balance: $","");          
      if(paymentTypeBal != 0){
         Log.Message("Apply remaining amount");
         WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
         Button.clickOnButton(applyButton);
      }
      Log.Message("Complete the order");
      WrapperFunction.settlementCompleteOrder();
      aqUtils.Delay(2000);
      validateTicket("Don't Validate"); 
      verifyTotalOnConfirmationPage(ReservationOrderInfo.prototype.ResTotal);
      OrderInfo.prototype.OrderID = ReservationOrderInfo.prototype.ResID;
      selectGroupFromMainMenuWithOrderedRecord(groupNm);
      aqUtils.Delay(2000);
      memoText = reservationWndmemoText.Caption;
       var temp = textForMemoField + textForMemoField; // added extra data at line 60
      aqUtils.Delay(1000);
      VerifyCheckProperty.compareStringObj(memoText,temp);
      aqUtils.Delay(1000);
      Button.clickOnButton(resOrderInfoClosebutton);
         
     AppLoginLogout.logout();  
      } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally {
	    Log.PopLogFolder();
    } 
}