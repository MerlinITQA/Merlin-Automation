//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder

function _0001485874463571_Res_Exceeding_full_payment()
{
try{
      Log.AppendFolder("_0001485874463571_Res_Exceeding_full_payment");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      placeReservationOrderForExceedingFullPayment();
      AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    }    
}