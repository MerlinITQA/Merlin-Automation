//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction

function C16097_Inactivity_Logged_Off_Messages()
{
try{
     Log.AppendFolder("C16097_Inactivity_Logged_Off_Messages");
     InitializationEnviornment.initiliaze();
     AppLoginLogout.login();
     checkControlExistence(homeButton); 
	   aqUtils.Delay(11000);   
     aqUtils.Delay(1000*60*6);              
     checkControlExistence(inactivityDetectedWindow);
      if(inactivityDetectedWindow.Exists && inactivityDetectedWindow.VisibleOnScreen)
        {
          Log.Message("Inactivity Detected Window is displayed.");
          inactivityDetectedWindow.Click();
          aqUtils.Delay(10000);
        }
        else
        {
          merlinLogError("Inactivity Detected Window  is not displayed.");
          return;
        }
     checkControlExistence(homeButton);
     aqUtils.Delay(11000);   
     aqUtils.Delay(1000*60*16); 
       if(youhavebeenloggedout.Exists)
        {
          Log.Message("You have been logged out Window is displayed.");
          youhavebeenloggedout.Click();
		      checkControlExistence(userNameTxtBox);
          checkControlExistence(passwordTxtBox);        
        }
        else
        {
          merlinLogError("You have been logged out Window is displayed.");
           return;
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