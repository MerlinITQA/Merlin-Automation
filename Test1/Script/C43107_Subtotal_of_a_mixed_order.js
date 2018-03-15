//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder

function C43107_Subtotal_of_a_mixed_order()
{
try{ 
    Log.AppendFolder("C43107_Subtotal_of_a_mixed_order");
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
