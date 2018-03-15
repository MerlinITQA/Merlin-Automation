//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT POSObjectMapping
//USEUNIT SupportManagerFunctions

function C43147_Res_verify_new_refund_receipt_format_for_CC_partial_refund()
{ 
try{
      Log.AppendFolder("C43147_Res_verify_new_refund_receipt_format_for_CC_partial_refund");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login(); 
      var groupNm=defaultGroupName;
      var paymentTypeForReservation = "Credit Card";
      ReservationOrderInfo.prototype.ResID = 0;
      var keyWordNm ="Reservations";
      var packageNm ="Minimum Payment Required Reservation 3";
      var subPakNm ="Individual";
      var qtyT = 1;
      var dateD =CommonCalender.getTodaysDate();
      selectGroupFinilizeOrderForReservation(groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD);
      aqUtils.Delay(4000);  
      var expectedSettlemtnttotal = orderDetailsTotal.Caption;        
      var paymentTypeBal= aqString.Replace(expectedSettlemtnttotal,"$","");  
      selectPaymentTypeAddRequiredFields(paymentTypeForReservation);
      WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
      Button.clickOnButton(applyButton);
      aqUtils.Delay(1000);
      if(paymentTypeForReservation == "Cash" && applycashrespopupCashPaymentOKButton.Exists){
        Button.clickOnButton(applycashrespopupCashPaymentOKButton);
        aqUtils.Delay(1000);
      }   
      Log.Message("Complete the order");
      WrapperFunction.settlementCompleteOrder();
      verifyOrderDetailsStoreOrderId(expectedSettlemtnttotal); 
  
      selectReservationRecordToPartialRefundReservation(groupNm);
      aqUtils.Delay(1000);
      
        paidAmt = resPartialPaymentPaidAmt.Caption;  
        var refAmt = parseInt((paidAmt.split('$')[1]).trim());
        var halfAmt = refAmt/2;   
        TextBox.setTextBoxValue(resPartialPaymentAmountinput,halfAmt);
        resPartialPaymentOkButton.Click();
        aqUtils.Delay(1000);  
  
      //  cancelARefundOk.Click();
        aqUtils.Delay(1000);
        if(authorizationpopupRefundReservat.Exists &&authorizationpopupRefundReservat.Visible){
           WrapperFunction.setTextValue(refundReservationConfReasontext,"Test Cancel and refund amount"); 
           Button.clickOnButton(refundReservationConfOK);
           aqUtils.Delay(3000);
        }
         cancelARefundOk.Click();
           aqUtils.Delay(3000);
         
        if(cashliftalertpopupCashLift.Exists && cashliftalertpopupCashLift.VisibleOnScreen){
             Log.Message("Cash Lift pop up alert is displayed.")
             Button.clickOnButton(cashLiftPopupClosebutton);
         }
        try {
        expectedSettlemtnttotal =refAmt;
        //aqObject.CheckProperty(orderDetailsTotal,"Caption", cmpEqual, expectedSettlemtnttotal);  
		verifyTotalOnConfirmationPageReservation(expectedSettlemtnttotal);
        } catch (e) {
    	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
        }
    AppLoginLogout.logout();
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    }    
}