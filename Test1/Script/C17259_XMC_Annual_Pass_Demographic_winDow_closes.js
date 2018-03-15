//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT PlaceOrder 

function C17259_XMC_Annual_Pass_Demographic_winDow_closes()
{
try{
     Log.AppendFolder("C17259_XMC_Annual_Pass_Demographic_winDow_closes");
     InitializationEnviornment.initiliaze();
     AppLoginLogout.login();
     var keyWordNm ="Annual Pass";
     var packageNm = "Annual Pass - reserve";
     var subPakNm="Individual";     
     WrapperFunction.selectKeywordName(keyWordNm);
     selectPackage(packageNm,subPakNm);
     finilizeOrder();
     aqUtils.Delay(2000); 
     if(Passholder_NextButton.Exists){
		 aqUtils.Delay(20000);   
         aqUtils.Delay(1000*60*17);
           checkControlExistence(youhavebeenloggedout);   
           if(youhavebeenloggedout.Exists)
            {
              Log.Message("You have been logged out Window is displayed.");
              youhavebeenloggedout.Click();
               aqUtils.Delay(10000);
              checkControlExistence(userNameTxtBox);
              checkControlExistence(passwordTxtBox);
              AppLoginLogout.login();
               if(Passholder_NextButton.Exists && Passholder_NextButton.VisibleOnScreen){
                  Button.clickOnButton(Passholder_NextButton);
                  if(labelSettlement.Exists && labelSettlement.VisibleOnScreen){
                    merlinLogError("Annual Pass Demographics Window is displayed.");
                    return;      
                  }            
               }                 
            }
            else
            {
              merlinLogError("You have been logged out Window is not displayed.");
            }                  
    }else{
        merlinLogError("Annual Pass Demographics Window is not displayed.")
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