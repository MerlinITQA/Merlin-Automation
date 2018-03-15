//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT POSObjectMapping

function C43106_Credit_card_refund_authorization_slip_are_printed()
{
try{
  Log.AppendFolder("C43106_Credit_card_refund_authorization_slip_are_printed");
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
  var groupNm=defaultGroupName;
  var paymentTypeForReservation = "Credit Card";
  placeROrderForPaymentType(groupNm,paymentTypeForReservation);
  selectReservationRecordToCancelAndRefund(groupNm);
  var expected =  ("Refund of $2.00 posted to credit card ending 1111.").trim();
  var actual = (richtextRichtext.Caption).trim();
  if( compareStringObj(expected,actual)){
  Log.Message("true");
  Button.clickOnButton(OK);
  aqUtils.Delay(2000);
  if(authorizationpopupRefundReservat.Exists &&authorizationpopupRefundReservat.Visible){
           WrapperFunction.setTextValue(refundReservationConfReasontext,"Test Cancel and refund amount"); 
           Button.clickOnButton(refundReservationConfOK);
           aqUtils.Delay(2000);
    }    
  try {
      if(cashliftalertpopupCashLift.Exists && cashliftalertpopupCashLift.VisibleOnScreen){
           Log.Message("Cash Lift pop up alert is displayed.")
           Button.clickOnButton(cashLiftPopupClosebutton);
       }
    expectedSettlemtnttotal =0;
    //aqObject.CheckProperty(orderDetailsTotal,"Caption", cmpEqual, expectedSettlemtnttotal);  
	verifyTotalOnConfirmationPageReservation(expectedSettlemtnttotal);
    } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
    }       
  }else{
   merlinLogError("Refund text is not matching");
   Button.clickOnButton(reservationoverpaymentrefundpopupClosebutton);
  }     
  AppLoginLogout.logout();
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    }    
}