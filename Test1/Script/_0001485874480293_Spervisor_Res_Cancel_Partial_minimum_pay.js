//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu

function _0001485874480293_Spervisor_Res_Cancel_Partial_minimum_pay()
{
try {
  Log.AppendFolder("_0001485874480293_Spervisor_Res_Cancel_Partial_minimum_pay");
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
  var groupNm=defaultGroupName;
  var paymentTypeForReservation = "Cash";
  placeROrderForPaymentType(groupNm,paymentTypeForReservation);
  selectReservationRecordToCancelReservation(groupNm);
  if(alertCancelReservation.Exists){
      Button.clickOnButton(alertCancelReservationYes);
      WrapperFunction.setTextValue(refundReservationConfReasontext,"Test Cancel and refund amount");
      Button.clickOnButton(refundReservationConfOK);          
      aqUtils.Delay(3000);  
      }
  aqUtils.Delay(2000);  
  var cancelStatus = false;
  var cC = orderinfoResDataGrid.wColumnCount;
  var rC = 0;
  rC = orderinfoResDataGrid.wRowCount;
  for ( rowC = 0 ; rowC <  rC ; rowC++){
      var displayDt = orderinfoResDataGrid.wValue(rowC ,6);
      if (displayDt == "Cancelled"){                
          cancelStatus = true;
          break; 
      }else{
        cancelStatus = false;
      }
  } 
  if(cancelStatus){
     Log.Message("The Reservation details are correctly reflected to the cancellation status");
  }else{
     merlinLogError("The Reservation details are not correctly reflected to the cancellation status");
  } 
  clickPartialRefundReservation();
  aqUtils.Delay(2000);  
  
  paidAmt = resPartialPaymentPaidAmt.Caption;  
  var refAmt = parseInt((paidAmt.split('$')[1]).trim());   
  TextBox.setTextBoxValue(resPartialPaymentAmountinput,refAmt);
  resPartialPaymentOkButton.Click();
  aqUtils.Delay(1000);  
  WrapperFunction.setTextValue(refundReservationConfReasontext,"Test Cancel and refund amount");  
  Button.clickOnButton(refundReservationConfOK);
  aqUtils.Delay(3000);  
  // cash payment edit details doesnot required AP-1332 as per Erin's comment.
//  cancelARefundEditDetails.Click();
//  TextBox.setTextBoxValue(resUpdatetextinputFirstnameti,(resUpdatetextinputFirstnameti.Caption + "_Test"));
//  TextBox.setTextBoxValue(resUpdatetextinputLastnameti,(resUpdatetextinputLastnameti.Caption + "_Test"));
//  resUpdateDoneButton.Click();
//  cancelARefundOk.Click();
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
  aqUtils.Delay(3000);  
  AppLoginLogout.logout();  
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }    
}