//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT WrapperFunction
//USEUNIT SelectQuantityFromHeader
//USEUNIT PlaceReservationOrder

function C43083_Promo_Code_is_not_found_error_message_displayed()
{
  Log.AppendFolder("C43083_Promo_Code_is_not_found_error_message_displayed");
  InitializationEnviornment.initiliaze(); 
  AppLoginLogout.login(); 
  try{
      aqUtils.Delay(1000);       
      if(textinputPromocodeinput.Exists && textinputPromocodeinput.Visible){
          Log.Message("Promo Code field is enabled.");    
          WrapperFunction.setTextValue(textinputPromocodeinput,"1234");
          aqUtils.Delay(500);
          Button.clickOnButton(selectablebuttonSearchbutton);
           if(errorWindow.Exists){
              errorMsg = errorMessagedisplay.Caption;
              VerifyCheckProperty.compareStringObj(errorMsg,"Failed to get packages from the server.  No packages found with promo code(s) [1234]")
              Log.Message(errorMsg);
              buttonOkOnError.Click();
            }
            else{
              merlinLogError("Error window is not displayed.")
            }          
      }
      else{
          merlinLogError("Promo Code field is greyed out.")
      }  
        
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
    AppLoginLogout.logout(); 
}
 