//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType

  
function _0001485874503389_129_SupportManager_ExamineCustDetails()
{
Log.AppendFolder("_0001485874503389_129_SupportManager_ExamineCustDetails");
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
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        WrapperFunction.settlementCompleteOrder();
        validateTicket("Validate All");
        
        var confirnScreenOrderIDValue=getTextValue(ConfirnScreenOrderID);
        confirnScreenOrderIDValue=removeSpecialCharacter(confirnScreenOrderIDValue);
        confirnScreenOrderIDValue=confirnScreenOrderIDValue.trim();
        Log.Message("confirnScreenOrderIDValue "+confirnScreenOrderIDValue);
       
       
        WrapperFunction.selectMainMenu(SupportManger_MainMenu);
        //loginSupportManger();
		    aqUtils.Delay(10000);
        setTextBoxValue(newConfirmationSearchtextBox,confirnScreenOrderIDValue);
        Button.clickOnButton(newPerformSearchButton);
         aqUtils.Delay(10000);
        checkControlExistence(OrderDetailsPageSummary);
         aqUtils.Delay(5000);
        var confirmation_OrderIDValue=WrapperFunction.getTextValue(smConfirmationOrderNumber);
        WrapperFunction.verifyDetails(confirnScreenOrderIDValue,confirmation_OrderIDValue);          
        AppLoginLogout.logout(); 
    }
    catch(e)
    {
           merlinLogError("Exception in Test script");
           //Runner.Stop();
    }
}
 