//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
function e()
{
try{
    Log.AppendFolder("e");
    
   InitializationEnviornment.initiliaze();
   AppLoginLogout.login();  
   WrapperFunction.selectKeyword("Annual Pass"); 
        selectPackage("Annual Pass - reserve","Individual");
        aqUtils.Delay(5000);
        WrapperFunction.finilizeOrder()
        PassholderDetails.enterAllPassHolderDetails(); 
        Button.clickOnButton(Passholder_NextButton);
     
          if(PassholderCameraLogo.Exists)
         {
            Button.clickOnButton(PassholderCameraLogo);
            Button.clickOnButton(Passholder_NextButton);
         }
        aqUtils.Delay(5000);
        SelectPaymentType.selectPaymentType("Cash");          
        WrapperFunction.verifyBalance(labelTotal,PaymentType_BalanceLabel);
        var paymentTypeBal=WrapperFunction.getBalanceValue(PaymentType_BalanceLabel);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        WrapperFunction.settlementCompleteOrder();
        aqUtils.Delay(2000);
        validateTicket("Don't Validate");
        Button.clickOnButton(PassProcessing_Button);
        aqUtils.Delay(2000); 
    
    VerifyCheckProperty.compareStringObj(FirstnameField.Caption,"M_FirstName");
    VerifyCheckProperty.compareStringObj(LastnameField.Caption,"M_LastName");
    if(AssignNewBarCode_Button.Exists && AssignNewBarCode_Button.VisibleOnScreen){
      Log.Message("Passprocessing window is displayed");
    }
    else{
      merlinLogError("Passprocessing window is not displayed");
    }
   
  
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
      AppLoginLogout.logout(); 
	    Log.PopLogFolder(); 
    }   
     
}