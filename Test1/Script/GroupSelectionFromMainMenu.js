//USEUNIT AppLoginLogout
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT InitializationEnviornment
//USEUNIT SelectGroupFromMainMenu
//Main Menu selection functionality

function selectionOfGroups()
{
   //InitializationEnviornment.initiliaze();
   //AppLoginLogout.login();  
  selectGroupFinilizeOrderForReservation(defaultGroupName,"Reservations","Minimum Payment Required Reservation 2","Individual",2,"5/20/2017")
  aqUtils.Delay(4000);
  var expectedSettlemtnttotal = orderDetailsTotal.Caption;
  var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
  paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");
  if(paymentTypeBal != 0){
    Log.Message("Apply remaining amount");
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
    Button.clickOnButton(applyButton);
    // aqUtils.Delay(2000);
    Button.clickOnButton(applycashrespopupCashPaymentOKButton);
  }
  Log.Message("Complete the order");
  WrapperFunction.settlementCompleteOrder();
  aqUtils.Delay(5000);   
  aqObject.CheckProperty(orderDetailsTotal,"Caption", cmpEqual, expectedSettlemtnttotal); 
   
  AppLoginLogout.logout();
   AppLoginLogout.logout();  
}

