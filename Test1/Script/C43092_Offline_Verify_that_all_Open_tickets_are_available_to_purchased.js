﻿//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectDirectory
function C43092_Offline_Verify_that_all_Open_tickets_are_available_to_purchased()
{ 
try{
      Log.AppendFolder("C43092_Offline_Verify_that_all_Open_tickets_are_available_to_purchased");
      InitializationEnviornment.initiliaze(); 
      AppLoginLogout.login();
      aqUtils.Delay(2000);
      SelectDirectory.selectDirectory(Directory_GoOffline);
      aqUtils.Delay(2000);
      placeOrder("Daily Admission","Open Dated","Children (Ages 3-12)",1,CommonCalender.getTodaysDate(),"Cash");
       aqUtils.Delay(2000);
      SelectDirectory.selectDirectory(Directory_GoOffline);
      aqUtils.Delay(2000);
      AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
}