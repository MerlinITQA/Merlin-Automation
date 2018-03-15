//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType

  
function _001485874509422_141_YearExpirationDateVerification()
{
      Log.AppendFolder("_001485874509422_141_YearExpirationDateVerification");
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
      Button.clickOnButton(PassProcessing_Button);
      aqUtils.Delay(3000);
//      Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1);
//      
//     
//      Button.clickOnButton(Save_Button);
//      Button.clickOnButton(Process_Button);
      
      Button.clickOnButton(AssignNewBarCode_Button);
      aqUtils.Delay(3000);
     
      Button.clickOnButton(Save_Button);
    //Verify Expiration Date Present on Passholder Scroller
      checkControlExistence(ExpirationDateLabel);
     
      AppLoginLogout.logout();
  }
catch(e)
{ 
merlinLogError("Exception occured"+e.getMessage);
//Runner.Stop();
}
}
 