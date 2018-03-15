//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder

function _0001485874462735_Reservations_make_reservation_Minimum_payment_required_over()
{
try{
      Log.AppendFolder("_0001485874462735_Reservations_make_reservation_Minimum_payment_required_over");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login(); 
      placeReservationOrderForMinimumPaymentOver();
      AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    }   
}
 
 