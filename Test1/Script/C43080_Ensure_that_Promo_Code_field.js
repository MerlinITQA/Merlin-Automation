//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT WrapperFunction
//USEUNIT SelectQuantityFromHeader
//USEUNIT PlaceReservationOrder

function C43080_Ensure_that_Promo_Code_field()
{
  Log.AppendFolder("C43080_Ensure_that_Promo_Code_field");
  InitializationEnviornment.initiliaze(); 
  AppLoginLogout.login(); 
  try{
      aqUtils.Delay(1000);
      if(textinputPromocodeinput.Exists&& textinputPromocodeinput.Left > 500){
        Log.Message("PromoCode field is present.")
      }
      else{
        merlinLogError("PromoCode field is not present.")
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
 