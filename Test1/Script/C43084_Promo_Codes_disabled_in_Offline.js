//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT WrapperFunction
//USEUNIT SelectDirectory

function C43084_Promo_Codes_disabled_in_Offline()
{
  Log.AppendFolder("C43084_Promo_Codes_disabled_in_Offline");
  InitializationEnviornment.initiliaze(); 
  AppLoginLogout.login(); 
  try{  
      aqUtils.Delay(1000);            
      selectDirectory(Directory_GoOffline);
      aqUtils.Delay(1000);
      WrapperFunction.selectMainMenu(SupportManger_MainMenu);
      aqUtils.Delay(10000);
      Button.clickOnButton(newCancelButton);      
      if(textinputPromocodeinput.Exists && !(textinputPromocodeinput.Visible)){
          Log.Message("Promo Code field should be greyed out.");
      }
      else{
          merlinLogError("Promo Code field is not greyed out.")
      }
      WrapperFunction.selectMainMenu(Groups_MainMenu);  
       aqUtils.Delay(2000);
      if(textinputPromocodeinput.Exists && !(textinputPromocodeinput.Visible)){
           Log.Message("Promo Code field should be greyed out.");
      }
      else{
          merlinLogError("Promo Code field is not greyed out.")
      }  
      WrapperFunction.selectMainMenu(PointOfSale_MainMenu);       
      if(textinputPromocodeinput.Exists && !(textinputPromocodeinput.Visible)){
           Log.Message("Promo Code field should be greyed out.");
      }
      else{
          merlinLogError("Promo Code field is not greyed out.")
      }  
      WrapperFunction.selectMainMenu(Exchange_MainMenu);
      aqUtils.Delay(2000);
      if(errorWindow.Exists){                   
              buttonOkOnError.Click();
      }else{ merlinLogError("Error message is not displayed.")}
      aqUtils.Delay(10000);
      if(alertCancelReservation.Exists){             
        Button.clickOnButton(alertOk);              
      }else{ merlinLogError("Error message is not displayed.")}
      if(textinputPromocodeinput.Exists && !(textinputPromocodeinput.Visible)){
          Log.Message("Promo Code field should be greyed out.");
      }
      else{
          merlinLogError("Promo Code field is not greyed out.")
      }  
      
        WrapperFunction.selectMainMenu(PointOfSale_MainMenu); 
        selectDirectory(Directory_GoOffline);  
        aqUtils.Delay(2000);
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
    AppLoginLogout.logout(); 
}
 