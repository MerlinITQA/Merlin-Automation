//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu

function _0001485874467502_Reservations_Cancel_and_Refund_Cash_Payments_Cashier()
{
try{
      Log.AppendFolder("_0001485874467502_Reservations_Cancel_and_Refund_Cash_Payments_Cashier");
  InitializationEnviornment.initiliaze();
  AppLoginLogout.loginCashier();
  var groupNm=defaultGroupName;
  var paymentTypeForReservation = "Cash";
  placeROrderForPaymentType(groupNm,paymentTypeForReservation);
  selectReservationRecordToCancelAndRefund(groupNm);
  aqUtils.Delay(2000);
  Button.clickOnButton(OK);
  aqUtils.Delay(2000);
  enterResonaOnConfirmationCancelARefundwnd();
  aqUtils.Delay(2000);
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