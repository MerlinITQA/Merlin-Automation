//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT ConvertReservationsToPurchase

function _0001485874441584_Res_Convert_to_Purchase_Invoice()
{
try{
      Log.AppendFolder("_0001485874441584_Res_Convert_to_Purchase_Invoice");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      placeReservationOrderForMinimumPayment();
      convertReservationsToPurchase(defaultGroupName,"Invoice");
      AppLoginLogout.logout(); 
      } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
}