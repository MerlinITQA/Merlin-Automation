//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT WrapperFunction
//USEUNIT SelectQuantityFromHeader
//USEUNIT PlaceReservationOrder

function C43081_Promo_Code_field_is_functional_on_all_screens()
{
  Log.AppendFolder("C43081_Promo_Code_field_is_functional_on_all_screens");
  InitializationEnviornment.initiliaze(); 
  AppLoginLogout.login(); 
  try{
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
     WrapperFunction.selectMainMenu(Exchange_MainMenu);
      aqUtils.Delay(2000);
      if(textinputPromocodeinput.Exists && !(textinputPromocodeinput.Visible)){
          Log.Message("Promo Code field should be greyed out.");
      }
      else{
          merlinLogError("Promo Code field is not greyed out.")
      }  
      WrapperFunction.selectMainMenu(Groups_MainMenu);  
       aqUtils.Delay(2000);
      if(textinputPromocodeinput.Exists && textinputPromocodeinput.Visible){
          Log.Message("Promo Code field is enabled.");    
          WrapperFunction.setTextValue(textinputPromocodeinput,"RateV1");
          aqUtils.Delay(500);
          VerifyCheckProperty.compareStringObj(textinputPromocodeinput.Caption,"RateV1");
      }
      else{
          merlinLogError("Promo Code field is greyed out.")
      }  
      WrapperFunction.selectMainMenu(PointOfSale_MainMenu);       
      if(textinputPromocodeinput.Exists && textinputPromocodeinput.Visible){
          Log.Message("Promo Code field is enabled.");  
          WrapperFunction.setTextValue(textinputPromocodeinput,"RateV1");
          aqUtils.Delay(500);
          VerifyCheckProperty.compareStringObj(textinputPromocodeinput.Caption,"RateV1");        
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
 