//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT CommonCalender
//Application Login & Logout functioonality
  
function _0001485874456152_33_PromoCodes_Cash()
{
Log.AppendFolder("_0001485874456152_33_PromoCodes_Cash");
try{
        InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
        var keyWordNm ="Promo Codes";
        var packageNm = "1:1 Comp Ratio";
        var subPakNm ="Individual";    
        var qty =1;
        var dateD = CommonCalender.getTodaysDate();
        var givenPaymentType ="Cash";
       // WrapperFunction.selectKeywordName("Promo Codes");
        //WrapperFunction.enterPromoCode("test");
        WrapperFunction.setTextValue(textinputPromocodeinput,"test");
        Button.clickOnButton(selectablebuttonSearchbutton);
        aqUtils.Delay(3000);  
        selectPackage(packageNm,subPakNm);
        aqUtils.Delay(3000);       
         if(datetimeformSubWindow.Exists){
          selectDateFromSubWindow(dateD); //mm-dd-yyyy  
          selectNextButtonFromSubWindow();
        }else{
          if(qty > 1){
            SelectQuantityFromHeader.selectQuantity(qty);
            selectPackage(packageNm,subPakNm);
            aqUtils.Delay(2000);
          }    
        }
        aqUtils.Delay(3000);  
        finilizeOrder();
        aqUtils.Delay(2000);  
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
        Button.clickOnButton(NewOrder_Button);
        AppLoginLogout.logout(); 
   }

catch(e)
{
       merlinLogError("Exception in Test script");
       //Runner.Stop();
}
}
 