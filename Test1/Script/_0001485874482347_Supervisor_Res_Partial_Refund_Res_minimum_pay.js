//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu

function _0001485874482347_Supervisor_Res_Partial_Refund_Res_minimum_pay()
{
try{
  InitializationEnviornment.initiliaze();  
  AppLoginLogout.login();
  var groupNm=defaultGroupName;
  var paymentTypeForReservation = "Cash";
  placeROrderForPaymentType(groupNm,paymentTypeForReservation);
  selectReservationRecordToPartialRefundReservation(groupNm);
  aqUtils.Delay(2000);  
  paidAmt = resPartialPaymentPaidAmt.Caption;  
  var refAmt = parseInt((paidAmt.split('$')[1]).trim());   
  TextBox.setTextBoxValue(resPartialPaymentAmountinput,refAmt);
  resPartialPaymentOkButton.Click();
  aqUtils.Delay(1000);  
  WrapperFunction.setTextValue(refundReservationConfReasontext,"Test Cancel and refund amount");  
  Button.clickOnButton(refundReservationConfOK); 
  aqUtils.Delay(3000); 
  cancelARefundEditDetails.Click();
  TextBox.setTextBoxValue(resUpdatetextinputFirstnameti,(resUpdatetextinputFirstnameti.Caption + "_Test"));
  TextBox.setTextBoxValue(resUpdatetextinputLastnameti,(resUpdatetextinputLastnameti.Caption + "_Test"));
  resUpdateDoneButton.Click();
  cancelARefundOk.Click();
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
  AppLoginLogout.logout();  
  }catch(e)
    {
     merlinLogError("Exception occured");
     //Runner.Stop();
    }
}