//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT POSObjectMapping
//USEUNIT ConvertReservationsToPurchase

function A4_Pass_Processing_Confirmation_Print_Season_Pass_Button()
{
try {
    Log.AppendFolder("A4_Pass_Processing_Confirmation_Print_Season_Pass_Button");
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
       if(applyBalance.Exists && applyBalance.VisibleOnScreen
      &&Settlement_CompleteOrder.Exists && Settlement_CompleteOrder.VisibleOnScreen)
      {
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
          merlinLogError("Settlement Screen is not displayed.")
      }
     }else{
      merlinLogError("PassholderWindow is not displayed.");
      return;
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
 
    