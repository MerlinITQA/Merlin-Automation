//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType

  
function _0001485874528226_180_AmendMentOfOrder()
{
Log.AppendFolder("_0001485874528226_180_AmendMentOfOrder");
try{
        InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
        WrapperFunction.selectKeyword("Annual Passes");
        selectPackage("Local Annual Pass Family - Renewal","Individual Free");
        WrapperFunction.finilizeOrder()
        PassholderDetails.enterDetailsWithoutCameraPassHolderDetails();
        SelectPaymentType.selectPaymentType("Cash");
         WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
         var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
         aqUtils.Delay(1000);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        Button.clickOnButton(editOrder_SettlementWindow);
        
        
        WrapperFunction.selectKeyword("Annual Passes");
        selectPackage("Merlin Annual Pass Premium North America","Individual - Reissue");
        WrapperFunction.finilizeOrder()
        PassholderDetails.enterDetailsWithoutCameraPassHolderDetails();
        SelectPaymentType.selectPaymentType("Cash");
        //  WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
          var balObj1=labelTotal.Caption;
          var balObj2=PaymentType_BalanceLabel.Caption;

          balObj_1= removeSpecialCharacter(balObj1);
          balObj2= (balObj2.split('(')[0]).trim();
          balObj_2= removeSpecialCharacter(balObj2);         
          IntegerComparisonResult=balObj_1.localeCompare(balObj_2);
          if (IntegerComparisonResult == 0){ 
             merlinLogError("The Balance matches :"+ balObj1+" with "+balObj2);
             }
          else{
             Log.Message("The Balance do not matches as order is updated :"+balObj1 +" with "+balObj2);
         }
        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
        aqUtils.Delay(1000);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton); 
       

        WrapperFunction.settlementCompleteOrder();
        validateTicket("Validate All");
        Button.clickOnButton(NewOrder_Button);
       AppLoginLogout.logout();
   
       
}

catch(e)
{
       merlinLogError("Exception in Test script");
       //Runner.Stop();
}
}
 