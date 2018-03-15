//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType

  
function _0001485874510314_143_DOBEnterUser()
{
      Log.AppendFolder("_0001485874510314_143_DOBEnterUser");
      try{
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      WrapperFunction.selectKeyword("Annual Pass");
      selectPackage("Annual Pass - reserve","Individual");
      aqUtils.Delay(5000);
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
     // Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1);
      
      
       PassProcessingPassholderDetails();
       aqUtils.Delay(3000);
       Button.clickOnButton(sessionPassSavebtn);
        aqUtils.Delay(3000);      
        Button.clickOnButton(sessionPassProcessbtn);

       //The Year (season) and the Expiration Date of the pass is displayed on the Pass Fulfilment screen.
       
       AppLoginLogout.logout();

}
catch(e)
{ 
      merlinLogError("Exception occured");
      //Runner.Stop();
}
}
 