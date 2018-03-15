//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType

  
function _0001485874442632_11_LocalPass_AnnualPass_Cash()
{
Log.AppendFolder("_0001485874442632_11_LocalPass_AnnualPass_Cash");
try{
        InitializationEnviornment.initiliaze();
       AppLoginLogout.login();
        WrapperFunction.selectKeyword("Annual Passes");
        
        // Meq Suggested Local Pass means : "you can use Annual Passes > Merlin Annual Pass Premium North America > Individual"
        selectPackage("Merlin Annual Pass Premium North America","Individual - Reissue");
        selectFinalizeOrderbutton();
        aqUtils.Delay(3000);
        PassholderDetails.enterDetailsWithoutCameraPassHolderDetails();
        
        SelectPaymentType.selectPaymentType("Cash");
        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
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
 