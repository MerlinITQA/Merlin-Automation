//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT VerifyCheckProperty

function _0001485874513391_149_TabKeyMovement_DOB2Gender()
{

Log.AppendFolder("_0001485874513391_149_TabKeyMovement_DOB2Gender");
try
 {
        InitializationEnviornment.initiliaze();
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
          aqUtils.Delay(3000);
        //Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1);
         // aqUtils.Delay(3000);
        Button.clickOnButton(AssignNewBarCode_Button);
        aqUtils.Delay(3000);
        DateOfBirthfield.Click();
        Sys.Desktop.Keys("[Tab]");
        aqUtils.Delay(3000);
        Sys.Desktop.Keys("[Down]");
        aqUtils.Delay(2000);
        GenderField.Refresh();
        var selectedGender = GenderField.Label("labelDisplay").Caption;
        if(!VerifyCheckProperty.compareStringObj(selectedGender,"Female")){
          merlinLogError("After Tab key on BirthDate Cursor is not present on Gender field.")
        }         
        AppLoginLogout.logout();
}

catch(e)
{
       merlinLogError("Exception in Test script");
       //Runner.Stop();
}
}
 