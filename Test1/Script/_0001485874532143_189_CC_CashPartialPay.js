//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT CommonCalender
//USEUNIT ConvertReservationsToPurchase
//Application Login & Logout functioonality
  
function _0001485874532143_189_CC_CashPartialPay()
{
    Log.AppendFolder("_0001485874532143_189_CC_CashPartialPay");
      try{
     InitializationEnviornment.initiliaze();
     AppLoginLogout.login();
     
    var groupNm=defaultGroupName;
    var paymentTypeForReservation = "Cash";
    var keyWordNm ="Daily Admission";
    var packageNm ="Dated";
    var subPakNm ="Adult";
    var qtyT = 1;
    var dateD =CommonCalender.getTodaysDate();  
    addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);  
    addNewTicket(keyWordNm,packageNm,"Children (Ages 3-12)",qtyT,dateD);    
    selectFinalizeOrderbutton();
  
    WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
  
    SelectPaymentType.selectPaymentType("Credit Card");
    var paymentTypeBalBefore=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
    Log.Message("paymentTypeBalBefore :"+paymentTypeBalBefore);
    var paymentTypeBalAfterDecimalPlace=getFloorValue(paymentTypeBalBefore);
    Log.Message("paymentTypeBalAfterDecimalPlace :"+paymentTypeBalAfterDecimalPlace);
    roundingValue = paymentTypeBalBefore - paymentTypeBalAfterDecimalPlace;
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBalAfterDecimalPlace);
    Button.clickOnButton(applyButton);
    
     Button.clickOnButton(CashButton);    
    roundingValue = aqConvert.StrToFloat(roundingValue);
    roundingValue =roundingValue +.001;
    WrapperFunction.setTextValue(PayamountTextBox,roundingValue); 
    Button.clickOnButton(applyButton);
    aqUtils.Delay(1000);
    WrapperFunction.settlementCompleteOrder();
    WrapperFunction.validateTicket("Validate All");
    if(buttonClosebutton.Exists && buttonClosebutton.VisibleOnScreen){
          Button.clickOnButton(buttonClosebutton);
          }   
    AppLoginLogout.logout(); 
  
}
catch(e)
{ 
    merlinLogError("Need Package to verify rounding functionality."+e.getMessage);
    merlinLogError("Exception occured"+e.getMessage);
//Runner.Stop();
}
}
 