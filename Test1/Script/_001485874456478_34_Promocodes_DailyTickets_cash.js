//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT CommonCalender

  
function _001485874456478_34_Promocodes_DailyTickets_cash()
{
Log.AppendFolder("_001485874456478_34_Promocodes_DailyTickets_cash");
try{
        InitializationEnviornment.initiliaze();
         AppLoginLogout.login();
        var keyWordNm ="Promo Codes";
        var packageNm = "Trade Group (RateV1)";
        var subPakNm ="Individual";    
        var qty =1;
        var dateD = CommonCalender.getTodaysDate();
        var givenPaymentType ="Cash";
       // WrapperFunction.selectKeywordName("Promo Codes");
        //WrapperFunction.enterPromoCode("test");
        aqUtils.Delay(1000);
        WrapperFunction.setTextValue(textinputPromocodeinput,"test");
        Button.clickOnButton(selectablebuttonSearchbutton);
        aqUtils.Delay(1000);  
        selectPackage(packageNm,subPakNm);
        aqUtils.Delay(2000);       
         if(datetimeformSubWindow.Exists){
          selectDateFromSubWindow(dateD); //mm-dd-yyyy  
          selectNextButtonFromSubWindow();
          Button.clickOnButton(selectablebuttonClosebutton);
        }
        aqUtils.Delay(1000); 
        testPromoCodeCloseImg.Click();
        //selectPackage("$3 off Individual Admission","Individual");
//        selectQuantityFromSubWindow(1);
//        selectSubPackageFromSubWindow("Individual");
//        selectDateFromSubWindow(CommonCalender.getTodaysDate()); //mm-dd-yyyy
//        selectAvailableTimeFromSubWindow("11:00 AM");
//        selectNextButtonFromSubWindow();
//        WrapperFunction.finilizeOrder()
//        SelectPaymentType.selectPaymentType("Cash");
//        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
//        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
//        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
//        Button.clickOnButton(applyButton);
//        WrapperFunction.settlementCompleteOrder();
//        validateTicket("Validate All");
//        Button.clickOnButton(NewOrder_Button);
        Keyword_Listgroup.Refresh();
         aqUtils.Delay(2000); 
         WrapperFunction.selectKeyword("Daily Admission");
        selectQuantityFromSubWindow(2);      
        selectPackage("Date/Time","Adult");
        if(datetimeformSubWindow.Exists){
          selectDateFromSubWindow(dateD); //mm-dd-yyyy  
          selectNextButtonFromSubWindow();
          Button.clickOnButton(selectablebuttonClosebutton);
        }
       
        WrapperFunction.finilizeOrder();
        SelectPaymentType.selectPaymentType(givenPaymentType);
        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        WrapperFunction.settlementCompleteOrder();
        validateTicket("Validate All");
        if(buttonClosebutton.Exists && buttonClosebutton.VisibleOnScreen){
          Button.clickOnButton(buttonClosebutton);
          }
        
        AppLoginLogout.logout();
   }

catch(e)
{
       merlinLogError("Exception in Test script");
       //Runner.Stop();
}
}
 