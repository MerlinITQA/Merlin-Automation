//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType

  
function _0001485874461434_48_AnnualPass_Reissue_Cash()
{
Log.AppendFolder("_0001485874461434_48_AnnualPass_Reissue_Cash");
try{
        InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
        WrapperFunction.selectKeyword("Annual Passes");
        selectPackage("Merlin Annual Pass Premium North America","Individual - Reissue");
        WrapperFunction.finilizeOrder()
        PassholderDetails.enterDetailsWithoutCameraPassHolderDetails();
        SelectPaymentType.selectPaymentType("Cash");
        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        SettlementCompleteOrderButton();
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
 