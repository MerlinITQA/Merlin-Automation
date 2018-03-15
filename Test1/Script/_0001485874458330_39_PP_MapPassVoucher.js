//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType

  
function _0001485874458330_39_PP_MapPassVoucher()
{
      Log.AppendFolder("_0001485874458330_39_PP_MapPassVoucher");
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
        
      validateTicket("Don't Validate");
      Button.clickOnButton(PassProcessing_Button);
        aqUtils.Delay(3000);
//      Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1);
//      var oldBarcode=WrapperFunction.getTextValue(TicketBarcodeTextBox);
//      WrapperFunction.selectMainMenu(PassProcessing_MainMenu);
   //   WrapperFunction.enterTicketID(oldBarcode);
     // Button.clickOnButton(SearchButton);
     // Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1);  
        Button.clickOnButton(AssignNewBarCode_Button);
        aqUtils.Delay(5000);
        WrapperFunction.setTextValue(FirstnameField,"abc");
        WrapperFunction.setTextValue(LastnameField,"xyz");
        aqUtils.Delay(3000); 
        Button.clickOnButton(sessionPassSavebtn);
        aqUtils.Delay(3000);      
        Button.clickOnButton(sessionPassProcessbtn);
        aqUtils.Delay(3000);
        Button.clickOnButton(PrintPreview_Button);
        aqUtils.Delay(2000);
        if(PrintPreview_Window.Visible){
            PrintPreview_Closebutton.Click();
            Log.Message("Print preview window is present");
        }else{
              merlinLogError("Print preview window is not displayed.");
        }
        
      AppLoginLogout.logout();
    
    

}
catch(e)
{ 
merlinLogError("Exception occured");
//Runner.Stop();
}
}
 