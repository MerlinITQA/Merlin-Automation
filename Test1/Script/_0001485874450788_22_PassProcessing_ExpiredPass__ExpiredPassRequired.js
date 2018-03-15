//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//Application Login & Logout functioonality
  
function _0001485874450788_22_PassProcessing_ExpiredPass__ExpiredPassRequired()
{
Log.AppendFolder("_0001485874450788_22_PassProcessing_ExpiredPass__ExpiredPassRequired__");
try{
 
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      WrapperFunction.selectMainMenu(PassProcessing_MainMenu);
       aqUtils.Delay(1000);
      searchPassHolderOrderID("1052");
      
      Button.clickOnButton(SearchButton);
      Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1);
      var status=WrapperFunction.getTextValue(OrderHistory_Scroller_StatusField_Row1);
      Log.Message("Satus"+ status);
      Button.clickOnButton(Save_Button); // mapping of RENEW Button gives different objects
    
      WrapperFunction.selectMainMenu(PointOfSale_MainMenu);
      WrapperFunction.selectKeyword("Annual Pass");
      selectPackage("Annual Pass - reserve","Individual");
      aqUtils.Delay(5000);
      selectFinalizeOrderbutton();
      PassholderDetails.enterDetailsWithCam();
       
      SelectPaymentType.selectPaymentType("Cash");
          
      WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
      var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
      WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
      Button.clickOnButton(applyButton);
      WrapperFunction.settlementCompleteOrder();
      validateTicket("Validate All");
      // Blocker:  getting Error 
      Button.clickOnButton(NewOrder_Button);
      AppLoginLogout.logout(); 
    
}

catch(e)
{
 merlinLogError("Exception occured");
 //Runner.Stop();
}
}
 