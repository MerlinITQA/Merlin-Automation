//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction

//Application Login & Logout functioonality
  
function C43122_Ensure_that_Inactivity_message_appears()
{
try{
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
	    aqUtils.Delay(11000);   
      aqUtils.Delay(1000*60*6);      
      checkControlExistence(inactivityDetectedWindow);
//      aqUtils.Delay(11000); 
//      aqUtils.Delay(1000*60*10);     
//      Button.clickOnButton(youhavebeenloggedout);       
   }
  catch(e)
  {
  merlinLogError("Exception occured");
  }
}
 