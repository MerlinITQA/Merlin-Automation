//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//Application Login & Logout functioonality
  
function _0001485874521335_166_InactivityWindow_Verification()
{
try{
     InitializationEnviornment.initiliaze();
     AppLoginLogout.login();
	   aqUtils.Delay(11000);   
     aqUtils.Delay(1000*60*6);      
     checkControlExistence(inactivityDetectedWindow);
     inactivityDetectedWindow.Click();    
     aqUtils.Delay(11000); 
     aqUtils.Delay(1000*60*16);   
     checkControlExistence(youhavebeenloggedout);  
     Button.clickOnButton(youhavebeenloggedout);   
   }
  catch(e)
  {
       merlinLogError("Exception occured");
  }
}
 