//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
function _0001485874443487_Payments_Cash_payment_type()
{
  try{
      Log.AppendFolder("_0001485874443487_Payments_Cash_payment_type");
      InitializationEnviornment.initiliaze();
       AppLoginLogout.login();
      placeOrder("Daily Admission","Date/Time","Children (Ages 3-12)",11,CommonCalender.getTodaysDate(),"Cash");
      AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
}