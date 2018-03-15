//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu

function _0001485874466380_Res_CandR_CC_Pay_Cashier()
{
try{
  Log.AppendFolder("_0001485874466380_Res_CandR_CC_Pay_Cashier");
  InitializationEnviornment.initiliaze();
  AppLoginLogout.loginCashier();
  aqUtils.Delay(2000);
  var groupNm=defaultGroupName;
  var paymentTypeForReservation = "Credit Card";
  placeROrderForPaymentType(groupNm,paymentTypeForReservation);
  selectReservationRecordToCancelAndRefund(groupNm);
  aqUtils.Delay(2000);
  clickCancelAndRefundWndOk();  
  aqUtils.Delay(2000);
  enterResonaOnConfirmationCancelARefundwnd();
  aqUtils.Delay(5000);
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