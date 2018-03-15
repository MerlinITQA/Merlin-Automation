//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT POSObjectMapping
//USEUNIT SupportManagerFunctions

function C43150_Edit_Group_users_details_on_refunding()
{ 
try{
      Log.AppendFolder("C43150_Edit_Group_users_details_on_refunding");
       InitializationEnviornment.initiliaze();
       AppLoginLogout.login(); 
      var groupNm=defaultGroupName;
      var paymentTypeForReservation = "Check";
      ReservationOrderInfo.prototype.ResID = 0;
      var keyWordNm ="Reservations";
      var packageNm ="Minimum Payment Required Reservation 3";
      var subPakNm ="Individual";
      var qtyT = 7;
      var dateD =CommonCalender.getTodaysDate();
         selectGroupFromMainMenu(groupNm);
         clickBuyTicketsButton();
         WrapperFunction.selectKeywordName(keyWordNm);
         selectPackage(packageNm,subPakNm);
         selectQuantityFromSubWindow(qtyT); 
         if(datetimeformSubWindow.Exists){   
            selectDateFromSubWindow(dateD); //mm-dd-yyyy  
            selectNextButtonFromSubWindow();
            aqUtils.Delay(1000);        
            Button.clickOnButton(selectablebuttonClosebutton);
         }  
         
         finilizeOrder();
         aqUtils.Delay(3000);
         clickConvertToReservation();
      
      
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
  
       
        aqUtils.Delay(3000);
        cancelARefundEditDetails.Click();
        TextBox.setTextBoxValue(resUpdatetextinputFirstnameti,(resUpdatetextinputFirstnameti.Caption + "_Test"));
        TextBox.setTextBoxValue(resUpdatetextinputLastnameti,(resUpdatetextinputLastnameti.Caption + "_Test"));
        resUpdateDoneButton.Click();
        cancelARefundOk.Click();
        
        aqUtils.Delay(3000);
        if(authorizationpopupRefundReservat.Exists &&authorizationpopupRefundReservat.Visible){
           WrapperFunction.setTextValue(refundReservationConfReasontext,"Test Cancel and refund amount"); 
           Button.clickOnButton(refundReservationConfOK);
           aqUtils.Delay(3000);
        }    
        if(cashliftalertpopupCashLift.Exists && cashliftalertpopupCashLift.VisibleOnScreen){
             Log.Message("Cash Lift pop up alert is displayed.")
             Button.clickOnButton(cashLiftPopupClosebutton);
        }
          var temp = cnf_orderID.Caption;
          if (temp == null){
              merlinLogError("Order id is not present");
          } 
          var oId= (temp.split('#')[1]).trim(); 
          Log.Message("Order id is set:"+oId);  
          if(oId == ReservationOrderInfo.prototype.ResID ){
            Log.Message("The refund is processed correctly.");
          }
          else{
            merlinLogError("The refund is not processed correctly.");
          }   
        try {
        expectedSettlemtnttotal =0;
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