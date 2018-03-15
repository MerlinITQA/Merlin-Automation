//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT SelectDirectory
//USEUNIT SelectPaymentType
//USEUNIT SelectPackageAndSubPackage
  
function C16008_Menu_Tracker_Auto_Login()
{  
try
{  
      Log.AppendFolder("C16008_Menu_Tracker_Auto_Login");
        InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
        //isDirectoryPresent(Directory_AutoValidationOn);
  		 Button.clickOnButton(selectDirectoryButton); 
  		    if(!slidetoggleAutovalidateslidetogg.FlexObject.active){
             slidetoggleAutovalidateslidetogg.Click();  
          } else{
  			     Button.clickOnButton(selectDirectoryButton); 
  		    }
//       // isDirectoryPresent(Directory_TrackerLoggedOn);
       Button.clickOnButton(selectDirectoryButton);
         if(toggleTrackertoggle.FlexObject.active){
             Log.Message("Tracker is not log in.");  
          } else{
  			    merlinLogError("Tracker is not log in."); 
  		    }
          Button.clickOnButton(selectDirectoryButton);
        WrapperFunction.selectKeyword("Annual Passes");
        selectPackage("Merlin Annual Pass Premium North America","Individual");        
        WrapperFunction.finilizeOrder()
        PassholderDetails.enterDetailsWithoutCameraPassHolderDetails();
        aqUtils.Delay(2000);
        SelectPaymentType.selectPaymentType("Cash");
        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        SettlementCompleteOrderButton();
        validateTicket("Validate All");

        Button.clickOnButton(PassProcessing_Button);
          aqUtils.Delay(3000);
//        Button.clickOnButton(PassHolder_ResultDataGridScroller_OrderID_Row1);
        var barcodevalue=WrapperFunction.getTextValue(TicketBarcodeTextBox);
       // Button.clickOnButton(Save_Button);
        selectDirectory(Directory_Tracker);
        setTextBoxValue(trackerScanBarcodeInput,barcodevalue);
        Button.clickOnButton(trackerScanValidate);
        if(checkControlExistence(alertOneMoreStep)){
        Button.clickOnButton(buttonOkAlertOneMore);
        Button.clickOnButton(validatequantityOnTrackerScan);
        var errorText = DeviceIDErrorLabel.Caption
          if(errorText.includes(""))
          {
           Log.Message("Ticket Bar code validated");
            Button.clickOnButton(trackerScanCloseButton);
          }
          else
          {
            merlinLogError("Ticket Bar code not  validated");
          }
        }else{
           merlinLogError("Ticket Bar code not  validated");
        }
    }
    
  catch(e)
  {
          merlinLogError("Exception occured"); 
  }
       AppLoginLogout.logout();    
}
 