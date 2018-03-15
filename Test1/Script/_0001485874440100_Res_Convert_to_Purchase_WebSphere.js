﻿//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT ConvertReservationsToPurchase

function _0001485874440100_Res_Convert_to_Purchase_WebSphere()
{
try{
      Log.AppendFolder("_0001485874440100_Res_Convert_to_Purchase_WebSphere");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      placeReservationOrderForMinimumPayment();
      convertReservationsToPurchase(defaultGroupName,"Websphere");
      AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
}
