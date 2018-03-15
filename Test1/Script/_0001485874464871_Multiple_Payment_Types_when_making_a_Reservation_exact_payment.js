//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder

function _0001485874464871_Multiple_Payment_Types_when_making_a_Reservation_exact_payment()
{
try{
      Log.AppendFolder("_0001485874464871_Multiple_Payment_Types_when_making_a_Reservation_exact_payment");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      placeReservationOrderForMultiPaymentExact();
      AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    }    
}