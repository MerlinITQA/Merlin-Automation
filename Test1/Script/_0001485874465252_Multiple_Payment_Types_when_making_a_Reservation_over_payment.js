﻿//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder

function _0001485874465252_Multiple_Payment_Types_when_making_a_Reservation_over_payment()
{
try{
      Log.AppendFolder("_0001485874465252_Multiple_Payment_Types_when_making_a_Reservation_over_payment");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      placeReservationOrderForMultiPaymentOver();
      AppLoginLogout.logout();
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    }    
}