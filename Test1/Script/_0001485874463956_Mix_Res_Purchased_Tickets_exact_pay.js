//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder

function _0001485874463956_Mix_Res_Purchased_Tickets_exact_pay()
{
try{ 
    Log.AppendFolder("_0001485874463956_Mix_Res_Purchased_Tickets_exact_pay");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      placeMixReservationOrderForPaymentExact();
      AppLoginLogout.logout(); 
   } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    }     
}
