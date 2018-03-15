//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
function _0001485874443487_Payments_Cash_payment_type()
{
 // InitializationEnviornment.initiliaze();
  //AppLoginLogout.login();
  //placeOrder("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Cash");
  var verifyText ="Refund due: $"+"0";
  Button.clickOnButton(Refund_Button);
  WrapperFunction.setTextValue(refundReservationConfReasontext,"Test Cancel and refund amount");  
  Button.clickOnButton(refundReservationConfOK);
  aqUtils.Delay(2000);
  var refundText = confirmationChangeDue.Caption;
  
   if(refundText.startsWith(verifyText)){
        Log.Message("The payment summary on the bottom right shows correct values.");
       }
       else{
          merlinLogError("The payment summary is not correctly displayed.");
       }
  
 // AppLoginLogout.logout(); 
}