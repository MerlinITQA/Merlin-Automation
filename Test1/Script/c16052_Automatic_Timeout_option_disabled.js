﻿//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction

function C16052_Automatic_Timeout_option_disabled()
{
try{
   Log.AppendFolder("C16052_Automatic_Timeout_option_disabled");
     InitializationEnviornment.initiliaze();
     AppLoginLogout.login();
     checkControlExistence(homeButton); 
	   aqUtils.Delay(3000);   
     aqUtils.Delay(1000*60*10);        
  		if(homeButton.Exists && homeButton.VisibleOnScreen)
  	  {
  		     Log.Message("Automatic timeout is disabled.");
  	  }
  	  else
  	  {
  		     merlinLogError("Automatic timeout is not disabled.");
  	  }     
   }
  catch(e)
  {
    merlinLogError("Exception occured");
  }
  finally { 
	    Log.PopLogFolder();
  }      
   AppLoginLogout.logout(); 
}