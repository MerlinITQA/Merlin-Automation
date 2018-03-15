//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT VerifyCheckProperty
  
function C17237_Print_Annual_Pass_button_is_greyed_out()
{
      
      try{
      Log.AppendFolder("C17237_Print_Annual_Pass_button_is_greyed_out");
       InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      WrapperFunction.selectKeyword("Annual Pass");
      selectPackage("Annual Pass - reserve","Individual");
      aqUtils.Delay(2000);
      WrapperFunction.finilizeOrder()
      PassholderDetails.enterDetailsWithoutCameraPassHolderDetails();
      aqUtils.Delay(1000);
      CashButton.Click();    
      WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
      var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
      WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
      Button.clickOnButton(applyButton);
      WrapperFunction.settlementCompleteOrder();
      aqUtils.Delay(1000);
      validateTicket("Don't Validate");
      Button.clickOnButton(PassProcessing_Button);
      aqUtils.Delay(3000);
     // Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1);
      aqUtils.Delay(3000);
      VerifyCheckProperty.compareStringObj(FirstnameField.Caption ,"");
      VerifyCheckProperty.compareStringObj(MiddleInitialField.Caption ,"");
      VerifyCheckProperty.compareStringObj(PhoneField.Caption ,"");
      var temp = TicketBarcodeTextBox.Caption;
      AssignNewBarCode_Button.Click();
      aqUtils.Delay(5000);
      var temp1 = TicketBarcodeTextBox.Caption;
      if(temp == temp1){
        merlinLogError("New barcode is not assigned");
      }
      else{
         Log.Message("New barcode is assigned");
      }
      sessionPassProcessbtn.Click();
      aqUtils.Delay(2000);
      if(FirstNameErrorIndicator.Exists && FirstNameErrorIndicator.VisibleOnScreen){
        Log.Message("The First Name field will have a red border and an error message will be displayed");
          aqUtils.Delay(2000);
          WrapperFunction.setTextValue(FirstnameField,"Test");
          aqUtils.Delay(2000);
          sessionPassSavebtn.Click();
          aqUtils.Delay(3000);
          sessionPassProcessbtn.Click();
          aqUtils.Delay(3000);
//          if(Pass_Fulfillment.Exists && Pass_Fulfillment.VisibleOnScreen){
//            Log.Message("The process screen can be accessed.");
//          }
//          else{
//            merlinLogError("The process screen can not be accessed.")
//          }
        Button.clickOnButton(PrintPreview_Button);
        aqUtils.Delay(3000);
        if(PrintPreview_Window.Visible){
            PrintPreview_Closebutton.Click();
            Log.Message("Print preview window is present");
        }else{
              merlinLogError("Print preview window is not displayed.");
        }
      }
      else{
        merlinLogError("The First Name field do not have a red border and an error message is not displayed")
      }
       AppLoginLogout.logout();
   }
  catch(e)
  { 
      merlinLogError("Exception occured");
  }
     finally { 
	    Log.PopLogFolder();
    }   
}
 