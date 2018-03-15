//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType

  
function _001485874495100_111_SingleCreditCard_TransactionVerification()
{

Log.AppendFolder("_001485874495100_111_SingleCreditCard_TransactionVerification");
try
{       InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
        WrapperFunction.selectKeyword("Annual Passes");
        selectPackage("Local Annual Pass Family - Renewal","Individual Free");
        WrapperFunction.finilizeOrder()
        PassholderDetails.enterDetailsWithoutCameraPassHolderDetails();
        SelectPaymentType.selectPaymentType("Credit Card");        
        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
        paymentTypeBal= aqConvert.StrToFloat(paymentTypeBal);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        aqUtils.Delay(1000);
        WrapperFunction.settlementCompleteOrder();
        validateTicket("Don't Validate");
        AppLoginLogout.logout();
}
catch(e)
{
       merlinLogError("Exception in Test script");
       //Runner.Stop();
}
}
 