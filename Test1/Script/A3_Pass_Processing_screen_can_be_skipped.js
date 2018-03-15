//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT WrapperFunction

function A3_Pass_Processing_screen_can_be_skipped()
{ 
try{
   Log.AppendFolder("A3_Pass_Processing_screen_can_be_skipped");
    InitializationEnviornment.initiliaze(); 
    AppLoginLogout.login();
   WrapperFunction.selectKeyword("Annual Pass"); 
   selectPackage("Annual Pass - reserve","Individual");
   aqUtils.Delay(3000);  
   WrapperFunction.finilizeOrder()
   aqUtils.Delay(1000);
   PassholderDetails.enterAllPassHolderDetails();
   Button.clickOnButton(PassholderDetailsClearButton);
   if(PassholderWindow.Exists && PassholderWindow.VisibleOnScreen){
      Button.clickOnButton(Passholder_NextButton);     
      if(PassholderCameraLogo.Exists)
      {
        merlinLogError("PassholderCameraLogo is displayed.");
        return;
      }
      if(applyBalance.Exists && applyBalance.VisibleOnScreen
      &&Settlement_CompleteOrder.Exists && Settlement_CompleteOrder.VisibleOnScreen)
      {
        Log.Message("Settlement screen displays showing correct details");      
              
      }else{
          merlinLogError("Settlement Screen is not displayed.")
      }
     }else{
      merlinLogError("PassholderWindow is not displayed.");
      return;
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