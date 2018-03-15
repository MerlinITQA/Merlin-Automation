//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
function C15982_Purchase_Retail_Package()
{
try{
      Log.AppendFolder("C15982_Purchase_Retail_Package");
      InitializationEnviornment.initiliaze(); 
      AppLoginLogout.login();
      placeOrder("Retail","Activity Pack","Retail",1,CommonCalender.getTodaysDate(),"Cash");
      AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
}