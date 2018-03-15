//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
function _0001485874443999_Payments_External_CC_payment_type()
{
try{
      Log.AppendFolder("_0001485874443999_Payments_External_CC_payment_type");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      placeOrder("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"External CC");
      AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
}