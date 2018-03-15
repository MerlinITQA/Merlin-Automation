//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder

function _0001485874464457_Mix_of_Res_Purchased_Tickets_over_pay()
{
try{
      Log.AppendFolder("_0001485874464457_Mix_of_Res_Purchased_Tickets_over_pay");
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