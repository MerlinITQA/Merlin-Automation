//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder

function _0001485874464457_Mix_of_Reservations_and_Purchased_Tickets_over_payment()
{
try{
      Log.AppendFolder("_0001485874464457_Mix_of_Reservations_and_Purchased_Tickets_over_payment");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    placeMixReservationOrderForPaymentOver();
    AppLoginLogout.logout();  
   } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    }     
}