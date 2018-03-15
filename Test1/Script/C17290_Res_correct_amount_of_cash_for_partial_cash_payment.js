//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder

function C17290_Res_correct_amount_of_cash_for_partial_cash_payment()
{
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();   
  try {
  Log.AppendFolder("C17290_Res_correct_amount_of_cash_for_partial_cash_payment");
  var groupNm=defaultGroupName;
  var keyWordNm ="Reservations";
  var packageNm ="Minimum Payment Required Reservation 3";
  var subPakNm ="Individual";
  var qtyT = 2;
  var dateD =CommonCalender.getTodaysDate();
  selectGroupFinilizeOrderForReservation(groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD);
  aqUtils.Delay(4000);  
 
  var expectedSettlemtnttotal = orderDetailsTotal.Caption;
  ReservationOrderInfo.prototype.ResTotal = expectedSettlemtnttotal;
  total =aqString.Replace(expectedSettlemtnttotal,"$","")
  var applyAmount= (expectedSettlemtnttotal.split('$')[1]).trim();
  Button.clickOnButton(cash100);
  aqUtils.Delay(2000);  
  if(applycashrespopupCashPayment.Exists){
      TextBox.setTextBoxValue(applycashrespopupCashPaymentinputtext,"90");      
      Button.clickOnButton(applycashrespopupCashPaymentOKButton);      
      var applyedAmt = paymentlistgroup.Child(0).PaymentListItem("payItem").HGroup(0).Label("amtLabel").Caption;
      applyedAmt= aqString.Replace(applyedAmt,"$","").trim();    
      applyedAmt =StrToInt(applyedAmt);
      if(applyedAmt == 90){
           Log.Message("Correct amount is applyed.");
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
      }else{
           merlinLogError("Wrong amount is applied.");
         }      
    }
    else{
      merlinLogError("apply cash confirmation is not displayed.")
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