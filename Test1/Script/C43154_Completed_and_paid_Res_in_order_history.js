//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder

function C43154_Completed_and_paid_Res_in_order_history()
{
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    try {
      Log.AppendFolder("C43154_Completed_and_paid_Res_in_order_history");
      var groupNm=defaultGroupName;
      var keyWordNm ="Reservations";
      var packageNm ="Minimum Payment Required Reservation 2";
      var subPakNm ="Individual";
      var qtyT = 1;
      var dateD =CommonCalender.getTodaysDate();
      selectGroupFinilizeOrderForReservation(groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD);
      aqUtils.Delay(4000);    
      var expectedSettlemtnttotal = orderDetailsTotal.Caption;
      ReservationOrderInfo.prototype.ResTotal = expectedSettlemtnttotal;
       total =aqString.Replace(expectedSettlemtnttotal,"$","");
      var minPay=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
      minPay= aqString.Replace(minPay,"$","");
      Button.clickOnButton(CashButton);
      WrapperFunction.setTextValue(PayamountTextBox,minPay);  
      Button.clickOnButton(applyButton);
      aqUtils.Delay(500);
      Button.clickOnButton(applycashrespopupCashPaymentOKButton); 
      Log.Message("Complete the order");
      WrapperFunction.settlementCompleteOrder();
      aqUtils.Delay(3000);
      //aqObject.CheckProperty(orderDetailsTotal,"Caption", cmpEqual, expectedSettlemtnttotal);  
	  verifyTotalOnConfirmationPageReservation(expectedSettlemtnttotal);
      var orderId = cnf_orderID.Caption;
      if (orderId == null){
        merlinLogError("Order id is not present");
      } 
     var reservationOrderID= (orderId.split('#')[1]).trim();
     ReservationOrderInfo.prototype.ResID = reservationOrderID;
  
     selectGroupFromMainMenuWithReservationRecord(groupNm);
     aqUtils.Delay(2000);
     var paymentTypeTotal=orderDetailsTotal.Caption;     
      Button.clickOnButton(CashButton);
      var paymentTypeBal= PaymentType_BalanceLabel.Caption;
      paymentTypeBal= aqString.Replace(paymentTypeBal,"Balance: $","");          
      if(paymentTypeBal != 0){
         Log.Message("Apply remaining amount");
         WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
         Button.clickOnButton(applyButton);
      }
      WrapperFunction.settlementCompleteOrder();  
      aqUtils.Delay(2000);
      validateTicket("Don't Validate"); 
      verifyTotalOnConfirmationPage(ReservationOrderInfo.prototype.ResTotal);
      OrderInfo.prototype.OrderID = ReservationOrderInfo.prototype.ResID;
      selectGroupFromMainMenuWithOrderedRecord(groupNm);
      aqUtils.Delay(2000);
      Button.clickOnButton(checkboxReservationOrder);
      if(orderWndReprintSelectedTickets.Exists && orderWndReprintSelectedTickets.Visible && orderWndReprintSelectedTickets.Enable){
        Log.Message("Order # is displayed in the Order History section.")
      }
      else{
        merlinLogError("Order # is not displayed in the Order History section.")
      }
      Button.clickOnButton(resOrderInfoClosebutton);      
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
  AppLoginLogout.logout();  
}