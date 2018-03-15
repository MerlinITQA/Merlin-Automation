//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT VerifyCheckProperty
function _001485874496318_114_ZipCode_Verification()
{

Log.AppendFolder("_001485874496318_114_ZipCode_Verification");
try
{       
        InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
        WrapperFunction.selectKeyword("Annual Passes");
        selectPackage("Local Annual Pass Family - Renewal","Individual Free");
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
        aqUtils.Delay(3000);
       // Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1);
        Button.clickOnButton(AssignNewBarCode_Button);
         aqUtils.Delay(5000);
        zipCodeField.Keys("94203");
        aqUtils.Delay(5000);
        var stateValue=stateField.Label("labelDisplay").Caption;
        var cityValue=WrapperFunction.getTextValue(cityField);
         aqUtils.Delay(2000);
         if(!VerifyCheckProperty.compareStringObj(stateValue,"California")){
          merlinLogError("State field is not correctly displayed.")
        }   
         if(!VerifyCheckProperty.compareStringObj(cityValue,"Sacramento")){
          merlinLogError("City field is not correctly displayed.")
        }   
        Log.Message(stateValue + cityValue)
         AppLoginLogout.logout();
}

catch(e)
{
       merlinLogError("Exception in Test script");
       //Runner.Stop();
}
}
 