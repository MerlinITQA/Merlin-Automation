//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder

function C17242_Making_an_overpayment_for_a_reservation()
{
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
   
  try {
  Log.AppendFolder("C17242_Making_an_overpayment_for_a_reservation");
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
  var applyAmt = parseInt(total) + parseInt(minPay)+ 1;
  
  WrapperFunction.setTextValue(PayamountTextBox,applyAmt);  
  Log.Message("payment provided exceeds the total price of the package");
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
  Log.Message("Verified order details on settlement page");
  Log.Message("Complete the order");
  WrapperFunction.settlementCompleteOrder();  
  aqUtils.Delay(4000);  
  if(reservationoverpaymentrefundpopu.Exists){
      Button.clickOnButton(OK);
      aqUtils.Delay(2000);
      validateTicket("Don't Validate"); 
      verifyTotalOnConfirmationPage(ReservationOrderInfo.prototype.ResTotal);
  }
  else{
   merlinLogError("Confirmation window is not displayed.")
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