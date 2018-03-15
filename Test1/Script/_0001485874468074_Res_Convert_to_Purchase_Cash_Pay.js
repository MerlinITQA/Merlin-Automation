//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT ConvertReservationsToPurchase

function _0001485874468074_Res_Convert_to_Purchase_Cash_Pay()
{
try{
      Log.AppendFolder("_0001485874468074_Res_Convert_to_Purchase_Cash_Pay");
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
  placeReservationOrderForMinimumPayment();
  convertReservationsToPurchase(defaultGroupName,"Cash");
  AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    }  
}
