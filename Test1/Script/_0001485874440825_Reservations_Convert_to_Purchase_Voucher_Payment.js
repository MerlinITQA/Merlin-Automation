//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT ConvertReservationsToPurchase

function _0001485874440825_Reservations_Convert_to_Purchase_Voucher_Payment()
{
  try{
      Log.AppendFolder("_0001485874440825_Reservations_Convert_to_Purchase_Voucher_Payment");
      InitializationEnviornment.initiliaze();
       AppLoginLogout.login();
      placeReservationOrderForMinimumPayment();  
      convertReservationsToPurchase(defaultGroupName,"Voucher");
      AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
}
