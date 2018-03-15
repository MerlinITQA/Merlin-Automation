//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
function C17253_Refund_Due_amount_is_displayed_correctly()
{
 try {
      Log.AppendFolder("C17253_Refund_Due_amount_is_displayed_correctly");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      placeOrder("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Cash");
      var verifyText ="Refund due: $"+OrderInfo.prototype.OrderTotalAmount;
      Button.clickOnButton(Refund_Button);
      WrapperFunction.setTextValue(refundReservationConfReasontext,"Test Cancel and refund amount");  
      Button.clickOnButton(refundReservationConfOK);      
      aqUtils.Delay(3000);
      if(cashliftalertpopupCashLift.Exists && cashliftalertpopupCashLift.VisibleOnScreen){
       Log.Message("Cash Lift pop up alert is displayed.")
       Button.clickOnButton(cashLiftPopupClosebutton);
      }
      var refundText = confirmationChangeDue.Caption;
      if(refundText.startsWith(verifyText)){
         Log.Message("The payment summary on the bottom right shows correct values.");
      }
      else{
         merlinLogError("The payment summary is not correctly displayed.");
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