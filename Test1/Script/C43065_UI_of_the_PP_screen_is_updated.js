//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT POSObjectMapping
//USEUNIT ConvertReservationsToPurchase
//USEUNIT SupportManagerFunctions

function C43065_UI_of_the_PP_screen_is_updated()
{
try {
    Log.AppendFolder("C43065_UI_of_the_PP_screen_is_updated");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var keyWordNm ="Annual Pass";
    var packageNm = "Annual Pass - reserve";
    var subPakNm="Individual";    
    WrapperFunction.selectKeywordName(keyWordNm);
    selectPackage(packageNm,subPakNm);
    finilizeOrder();
    aqUtils.Delay(2000);
    if(PassholderWindow.Exists && PassholderWindow.VisibleOnScreen){
      PassholderDetails.enterAllPassHolderDetails();      
      Button.clickOnButton(Passholder_NextButton);     
      if(!PassholderCameraLogo.Exists)
      {
        merlinLogError("PassholderCameraLogo is not displayed.");
        return;
      }
      Button.clickOnButton(PassholderCameraLogo);
      Button.clickOnButton(Passholder_NextButton);      
      aqUtils.Delay(4000);
        Log.Message("Settlement screen displays showing correct details");
         var settlementTotal =orderDetailsTotal.Caption;
         applyAmount= aqString.Replace(settlementTotal,"$",""); 
         OrderInfo.prototype.OrderTotalAmount = applyAmount.trim();         
         Button.clickOnButton(applyBalance);
         Log.Message("Complete the order");
         WrapperFunction.settlementCompleteOrder();
         aqUtils.Delay(3000);
         validateTicket("Don't Validate");
         Log.Message("Don't Validate the order"); 
         verifyTotalOnConfirmationPage(settlementTotal);
         var orderId = cnf_orderID1.Caption;
         var orderId= (orderId.split('#')[1]).trim(); 
         if (orderId == null){
            merlinLogError("Order id is not present");
            return;
          } 
          if(cnfPrintSeasonPassButton.Exists && cnfPrintSeasonPassButton.VisibleOnScreen){
            Log.Message("Print Season Pass Button is displayed.")
          }
          else{
            merlinLogError("Print Season Pass Button is not displayed.")
            return;
          }     
     }else{
      merlinLogError("PassholderWindow is not displayed.");
      return;
     }
     
     Button.clickOnButton(PassProcessing_Button);
     aqUtils.Delay(5000);  
        
      VerifyCheckProperty.compareStringObj(FirstnameField.Caption,"M_FirstName");
      VerifyCheckProperty.compareStringObj(LastnameField.Caption,"M_LastName");
      VerifyCheckProperty.compareStringObj(DateOfBirthfield.Caption,"09/22/1975");
      VerifyCheckProperty.compareStringObj(SuffixField.Caption,"Mr");
      VerifyCheckProperty.compareStringObj(AddressField.Caption,"SQS");
      VerifyCheckProperty.compareStringObj(EmailField.Caption,"test@sqs.com");
      VerifyCheckProperty.compareStringObj(PhoneField.Caption,"0123456789");
      VerifyCheckProperty.compareStringObj(zipCodeField.Caption,"411057");
      VerifyCheckProperty.compareStringObj(cityField.Caption,"Hinjewadi");
      
      if(AssignNewBarCode_Button.Exists && AssignNewBarCode_Button.VisibleOnScreen){
        Log.Message("Passprocessing window is displayed");
      }
      else{
        merlinLogError("Passprocessing window is not displayed");
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
 
    