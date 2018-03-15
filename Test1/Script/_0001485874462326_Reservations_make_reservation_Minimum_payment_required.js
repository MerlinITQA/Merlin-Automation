//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder

function _0001485874462326_Reservations_make_reservation_Minimum_payment_required()
{
try{
      Log.AppendFolder("_0001485874462326_Reservations_make_reservation_Minimum_payment_required");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      placeReservationOrderForMinimumPayment();
      AppLoginLogout.logout();
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    }     
}