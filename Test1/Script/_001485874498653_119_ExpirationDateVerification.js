//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType

  
function _001485874498653_119_ExpirationDateVerification()
{
      Log.AppendFolder("_001485874498653_119_ExpirationDateVerification");
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
      aqUtils.Delay(2000);
        
     // Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1);
      var oldBarcode=WrapperFunction.getTextValue(TicketBarcodeTextBox);
       aqUtils.Delay(2000);
      WrapperFunction.selectMainMenu(PassProcessing_MainMenu);
       aqUtils.Delay(2000);
      WrapperFunction.enterTicketID(oldBarcode);
      Button.clickOnButton(SearchButton);
       aqUtils.Delay(2000);
      Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1_new);  
      Button.clickOnButton(AssignNewBarCode_Button);
      Button.clickOnButton(sessionPassSavebtn);
         
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
 