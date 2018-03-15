//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType

  
function _0001485874458651_40_Retail_Cash()
{
Log.AppendFolder("_0001485874458651_40_Retail_Cash");
try{
         InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
        WrapperFunction.selectKeyword("Retail");
        selectPackage("Photo Package","Retail");
		    aqUtils.Delay(2000);
        WrapperFunction.finilizeOrder()
        SelectPaymentType.selectPaymentType("Cash");
        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        SettlementCompleteOrderButton();
        //validateTicket("Validate All");
        Button.clickOnButton(NewOrder_Button);
        AppLoginLogout.logout(); 
        
}

catch(e)
{
 merlinLogError("Exception occured");
 //Runner.Stop();
}
}
 