﻿//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT POSObjectMapping

function _0001485874465825_Res_CandR_CC_Pay_Supervisor()
{
try{
      Log.AppendFolder("_0001485874465825_Res_CandR_CC_Pay_Supervisor");
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
   if(cashliftalertpopupCashLift.Exists && cashliftalertpopupCashLift.VisibleOnScreen){
       Log.Message("Cash Lift pop up alert is displayed.")
       Button.clickOnButton(cashLiftPopupClosebutton);
   }
  AppLoginLogout.logout();
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    }    
}