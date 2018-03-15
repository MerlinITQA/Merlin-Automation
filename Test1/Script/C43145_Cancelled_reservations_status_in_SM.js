//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT POSObjectMapping
//USEUNIT SupportManagerFunctions

function C43145_Cancelled_reservations_status_in_SM()
{ 
try{
      Log.AppendFolder("C43145_Cancelled_reservations_status_in_SM");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login(); 
      var groupNm=defaultGroupName;
      var paymentTypeForReservation = "Cash";
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
  
      selectReservationRecordToCancelAndRefund(groupNm);
      aqUtils.Delay(1000);
  
        cancelARefundOk.Click();
        aqUtils.Delay(1000);
        if(authorizationpopupRefundReservat.Exists &&authorizationpopupRefundReservat.Visible){
           WrapperFunction.setTextValue(refundReservationConfReasontext,"Test Cancel and refund amount"); 
           Button.clickOnButton(refundReservationConfOK);
           aqUtils.Delay(3000);
        }
        if(cashliftalertpopupCashLift.Exists && cashliftalertpopupCashLift.VisibleOnScreen){
             Log.Message("Cash Lift pop up alert is displayed.")
             Button.clickOnButton(cashLiftPopupClosebutton);
         }
        try {
        expectedSettlemtnttotal =0;
        //aqObject.CheckProperty(orderDetailsTotal,"Caption", cmpEqual, expectedSettlemtnttotal);  
		verifyTotalOnConfirmationPageReservation(expectedSettlemtnttotal);
        } catch (e) {
    	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
        } 
      OrderID = ReservationOrderInfo.prototype.ResID;
      selectSupportManagerFromMainMenu(); 
      aqUtils.Delay(10000);          
      searchSpecificOrderInSM(OrderID);  
      selectsubTabSM(tabTicketDetails); 
      if(VerifyCheckProperty.compareStringObj(cancelOrderTicketDetailsSM.Caption,"Cancelled")){
        Log.Message("Ticket status is Cancelled.");
      }else{
      merlinLogError("Ticket status is not Cancelled in Support Manager.")
      }
  AppLoginLogout.logout();
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    }    
}