//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction

function C37525_Passport_Exchange_Access_Log_out_button()
{
try {
    Log.AppendFolder("C37525_Passport_Exchange_Access_Log_out_button");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    selectMainMenu(Exchange_MainMenu); 
    aqUtils.Delay(15000);
    if(pageExchange.Exists && pageExchange.Visible){
        if(pageExchangebuttonCancel.Visible && pageExchangebuttonNext.Visible ){
            Log.Message("Page exchange next and cancel buttons are displayed.");
        }else{
            merlinLogError("Page exchange buttons are not displayed on window.");
        }
      }else{
        merlinLogError("Page exchange window is not displayed.");        
    }   
    AppLoginLogout.logout();
    if(userNameTxtBox.Exists   && userNameTxtBox.VisibleOnScreen
      && passwordTxtBox.Exists   && passwordTxtBox.VisibleOnScreen 
      && loginBtn.Exists  && loginBtn.VisibleOnScreen)
     {
       Log.Message("User is successfully logged out.");
     }else{
       merlinLogError("User is not successfully logged out.");     
     }
     
    } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }   
  
}
 