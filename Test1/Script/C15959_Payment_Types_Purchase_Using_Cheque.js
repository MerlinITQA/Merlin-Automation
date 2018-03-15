//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
function C15959_Payment_Types_Purchase_Using_Cheque()
{
try{
      Log.AppendFolder("C15959_Payment_Types_Purchase_Using_Cheque");
      InitializationEnviornment.initiliaze(); 
      AppLoginLogout.login();
      placeOrder("Daily Admission","Open Dated","Children (Ages 3-12)",2,CommonCalender.getTodaysDate(),"Check");
      AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
}