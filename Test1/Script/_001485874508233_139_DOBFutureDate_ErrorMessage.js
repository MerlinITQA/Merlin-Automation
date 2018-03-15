//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType

  
function _001485874508233_139_DOBFutureDate_ErrorMessage()
{
      Log.AppendFolder("_001485874508233_139_DOBFutureDate_ErrorMessage");
      try{
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      WrapperFunction.selectKeyword("Annual Pass");
      selectPackage("Annual Pass - reserve","Individual");
      
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
        
      //Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1);
      
      WrapperFunction.setTextValue(DateOfBirthfield,"04/11/2060");
      
       aqUtils.Delay(2000);
     if(dateOfBirthErrorIndicator.Exists && dateOfBirthErrorIndicator.VisibleOnScreen){
        Log.Message("Birth Date error indicator is displayed.")
     }else{
        merlinLogError("Birth Date error indicator is not displayed.")
     }
  
      AppLoginLogout.logout();
    
    

}
catch(e)
{ 
merlinLogError("Exception occured");
//Runner.Stop();
}
}
 