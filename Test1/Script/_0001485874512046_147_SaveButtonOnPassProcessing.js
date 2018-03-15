//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType

function _0001485874512046_147_SaveButtonOnPassProcessing()
{

Log.AppendFolder("_0001485874512046_147_SaveButtonOnPassProcessing");
try
{       InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
        WrapperFunction.selectKeyword("Annual Passes");
        selectPackage("Local Annual Pass Family - Renewal","Individual Free");
        aqUtils.Delay(3000);
        WrapperFunction.finilizeOrder()
        PassholderDetails.enterDetailsWithoutCameraPassHolderDetails();
        SelectPaymentType.selectPaymentType("Cash");
        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        WrapperFunction.settlementCompleteOrder();
        validateTicket("Validate All");
        Button.clickOnButton(confirmationPassProcessingButton);
        checkControlExistence(Save_Button);
        AppLoginLogout.logout();
}

catch(e)
{
       merlinLogError("Exception in Test script");
       //Runner.Stop();
}
}
 