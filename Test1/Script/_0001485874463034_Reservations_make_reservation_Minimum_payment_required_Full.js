//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder

function _0001485874463034_Reservations_make_reservation_Minimum_payment_required_Full()
{
try{
      Log.AppendFolder("_0001485874463034_Reservations_make_reservation_Minimum_payment_required_Full");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      placeReservationOrderForMinimumPaymentFull();
      AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    }    
}