//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//Application Login & Logout functioonality
  
function _0001485874452329_24_InactivityWindow_Verification()
{
try{
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
	    aqUtils.Delay(11000);   
      aqUtils.Delay(1000*60*6);      
      checkControlExistence(inactivityDetectedWindow);
      aqUtils.Delay(11000); 
      aqUtils.Delay(1000*60*10);     
      Button.clickOnButton(youhavebeenloggedout);       
   }
  catch(e)
  {
  merlinLogError("Exception occured");
  }
}
 