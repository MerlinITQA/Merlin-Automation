//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT SelectDirectory

//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
  
function _001485874459072_41_OrderHistory_Refund()
{
Log.AppendFolder("_001485874459072_41_OrderHistory_Refund");
try
 {     InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      placeOrder("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Cash");
     var verifyText ="Refund due: $"+OrderInfo.prototype.OrderTotalAmount;
      AppLoginLogout.logout();
      AppLoginLogout.loginCashier();
      aqUtils.Delay(5000);
      
       selectDirectory(Directory_OrderHistory);
        clickSpecificViewOrder(OrderInfo.prototype.OrderID);
        aqUtils.Delay(2000);
         
        Button.clickOnButton(Refund_Button);
      WrapperFunction.setTextValue(refundReservationConfReasontext,"Test Cancel and refund amount");
      enterSupervisorCred();
      aqUtils.Delay(5000);
      var refundText = confirmationChangeDue.Caption;
      if(refundText.startsWith(verifyText)){
         Log.Message("The payment summary on the bottom right shows correct values.");
      }
      else{
         merlinLogError("The payment summary is not correctly displayed.");
      }
        
    }
catch(e)
{
        merlinLogError("Exception occured");
        //Runner.Stop();
}
}
 