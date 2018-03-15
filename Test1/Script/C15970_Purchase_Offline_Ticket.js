//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder

function C15970_Purchase_Offline_Ticket()
{ 
try{
      Log.AppendFolder("C15970_Purchase_Offline_Ticket");
      InitializationEnviornment.initiliaze(); 
      AppLoginLogout.login();
      placeOrder("Offline","Daily Admission - O","Adult",1,CommonCalender.getTodaysDate(),"Cash");
      AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
}