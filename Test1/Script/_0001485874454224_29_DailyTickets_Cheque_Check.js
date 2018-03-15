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
  
function _0001485874454224_29_DailyTickets_Cheque_Check()
{
Log.AppendFolder("_0001485874454224_29_DailyTickets_Cheque_Check");
try{

    /*As per Meq :MJ 17/03/2016 - Daily ticket refers to any ticket with a calendar
    e.g. you can use Daily Admission > Dated (second package)*/
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
//    WrapperFunction.selectKeyword("Daily Admission");
//    selectPackage("Open Dated","Children (Ages 3-12)");
//    aqUtils.Delay(5000);
//    //selectQuantityFromSubWindow(3);
//    selectSubPackageFromSubWindow("Adult");
//    selectQuantityFromSubWindow(2);
//    selectSubPackageFromSubWindow("Children (Ages 3-12)");
//    selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy
//    selectAvailableTimeFromSubWindow("11:15 AM");
//    selectNextButtonFromSubWindow();
    aqUtils.Delay(3000);
    WrapperFunction.finilizeOrder()
    
    // Facing Value to select Check from Drop down
   // SelectPaymentType.selectPaymentType("Check");
    selectPaymentTypeAddRequiredFields("Check");
    aqUtils.Delay(3000);
    WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
    var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
     paymentTypeBal= aqConvert.StrToFloat(paymentTypeBal);
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);    
    Button.clickOnButton(applyButton);
    aqUtils.Delay(1000);
    WrapperFunction.settlementCompleteOrder();
    WrapperFunction.validateTicket("Validate All");
    if(buttonClosebutton.Exists && buttonClosebutton.VisibleOnScreen){
          Button.clickOnButton(buttonClosebutton);
          }    
    Button.clickOnButton(NewOrder_Button);
    AppLoginLogout.logout(); 
    
}

catch(e)
{
 merlinLogError("Exception occured");
 //Runner.Stop();
}
}
 