//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT ConvertReservationsToPurchase

function C17239_0_credit_card_payments_cannot_be_made()
{
 try {
      Log.AppendFolder("C17239_0_credit_card_payments_cannot_be_made");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      var groupNm=defaultGroupName;
      var keyWordNm ="Reservations";
      var packageNm ="Minimum Payment Required Reservation 2";
      var subPakNm ="Individual";
      var givenPaymentType = "Credit Card";
      var dateD =CommonCalender.getTodaysDate();
      
      selectGroupFromMainMenu(groupNm);
      clickBuyTicketsButton();
      WrapperFunction.selectKeywordName(keyWordNm);
      selectPackage(packageNm,subPakNm);
      aqUtils.Delay(1000);  
      selectDateFromSubWindow(dateD); //mm-dd-yyyy
      selectNextButtonFromSubWindow(); 
      finilizeOrder();
      aqUtils.Delay(3000);
      clickConvertToReservation();
      aqUtils.Delay(4000);     
      selectPaymentTypeAddRequiredFields(givenPaymentType);
      WrapperFunction.setTextValue(PayamountTextBox,"0");
      Button.clickOnButton(applyButton);
      aqUtils.Delay(1000); 
      if(errorWindow.Exists){
        errorMsg = errorMessagedisplay.Caption;
        VerifyCheckProperty.compareStringObj(errorMsg,"Must enter a payment amount.")
        Log.Message(errorMsg);
        Log.Message(" Error message is displayed for 0 Payment.")
        buttonOkOnError.Click();
      }
      else{
         merlinLogError(" Error message is not displayed for 0 Payment.")
      }
      AppLoginLogout.logout();
   } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally {
	    Log.PopLogFolder();
    } 
}
