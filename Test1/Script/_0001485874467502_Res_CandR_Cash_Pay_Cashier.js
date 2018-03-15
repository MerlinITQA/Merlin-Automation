//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu

function _0001485874467502_Res_CandR_Cash_Pay_Cashier()
{
try{
      Log.AppendFolder("_0001485874467502_Res_CandR_Cash_Pay_Cashier");
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