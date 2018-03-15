//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType

  
function _001485874451379_23_ExpiredPass_RequiredWithDetails()
{
Log.AppendFolder("_001485874451379_23_ExpiredPass_RequiredWithDetails");
   try{
     InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
    WrapperFunction.selectMainMenu(PassProcessing_MainMenu);
    searchPassHolderOrderID("1051");
    Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1_new);
//    var status=WrapperFunction.getTextValue(OrderHistory_Scroller_StatusField_Row1);
//    Log.Message("Satus"+ status);
     Button.clickOnButton(Renew_Button);
     aqUtils.Delay(3000);
    //ERROR : Renew Button showing as SAVE button
        WrapperFunction.selectKeyword("Annual Pass");
        selectQuantity(2);
        selectPackage("Annual Pass - reserve","Individual");
     
        WrapperFunction.finilizeOrder()
        PassholderDetails.enterDetailsWithCam();
        PassholderDetails.enterDetailsWithCam();        
        SelectPaymentType.selectPaymentType("Cash");
          
        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        WrapperFunction.settlementCompleteOrder();
        validateTicket("Validate All");
      // Blocker  getting Error Message
        Button.clickOnButton(NewOrder_Button);
        AppLoginLogout.logout(); 
    
}

catch(e)
{
 merlinLogError("Exception occured");
 //Runner.Stop();
}
}
 