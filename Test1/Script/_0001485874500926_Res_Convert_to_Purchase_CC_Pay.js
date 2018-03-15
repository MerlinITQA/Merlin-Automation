//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT ConvertReservationsToPurchase

function _0001485874500926_Res_Convert_to_Purchase_CC_Pay()
{
try{
      Log.AppendFolder("_0001485874500926_Res_Convert_to_Purchase_CC_Pay");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      placeReservationOrderForMinimumPayment();
      convertReservationsToPurchase(defaultGroupName,"Credit Card");
      AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
}
