//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder

function _0001485874462035_Reservations_make_reservation_no_minimum_payment()
{
try{
      Log.AppendFolder("_0001485874462035_Reservations_make_reservation_no_minimum_payment");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();     
      placeReservationOrderForNoPayment();
      AppLoginLogout.logout();
    } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    }    
}
