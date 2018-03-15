﻿//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT ConvertReservationsToPurchase

function _0001485874439744_Reservations_Convert_to_Purchase_Cheque_Payment()
{
  try{ 
  Log.AppendFolder("_0001485874439744_Reservations_Convert_to_Purchase_Cheque_Payment");
  InitializationEnviornment.initiliaze();
  aqUtils.Delay(5000);
  AppLoginLogout.login();  
  placeReservationOrderForMinimumPayment();
  convertReservationsToPurchase(defaultGroupName,"Check");
  AppLoginLogout.logout(); 
  } catch (e) {
  	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
  	    return;
    }
      finally { 
	    Log.PopLogFolder();
    }    
}
 
 
 
 

 