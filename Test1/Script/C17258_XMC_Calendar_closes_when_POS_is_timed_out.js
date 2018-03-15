//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT PlaceOrder 

function C17258_XMC_Calendar_closes_when_POS_is_timed_out()
{
try{
     Log.AppendFolder("C17258_XMC_Calendar_closes_when_POS_is_timed_out");
     InitializationEnviornment.initiliaze();
     AppLoginLogout.login();
     var keyWordNm ="Daily Admission";
     var packageNm = "3 site Combi";
     var subPakNm="Adult";     
     WrapperFunction.selectKeywordName(keyWordNm);
     selectPackage(packageNm,subPakNm);
     if(datetimeformSubWindow.Exists){
		 aqUtils.Delay(20000);   
         aqUtils.Delay(1000*60*16);
         checkControlExistence(youhavebeenloggedout);   
           if(youhavebeenloggedout.Exists)
            {
              Log.Message("You have been logged out Window is displayed.");
              youhavebeenloggedout.Click();
              aqUtils.Delay(10000);
              checkControlExistence(userNameTxtBox);
              checkControlExistence(passwordTxtBox);
              AppLoginLogout.login();
               if(datetimeformSubWindow.Exists && datetimeformSubWindow.VisibleOnScreen){
                  merlinLogError("Calendar Window is displayed.")
               }                 
            }
            else
            {
              merlinLogError("You have been logged out Window is not displayed.");
            }                  
    }else{
        merlinLogError("Calendar Window is not displayed.")
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