//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
function C37526_Passport_Exchange_Access_Directory_Menu()
{
try {
    Log.AppendFolder("C37526_Passport_Exchange_Access_Directory_Menu");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    selectMainMenu(Exchange_MainMenu); 
    aqUtils.Delay(15000);
    if(pageExchange.Exists && pageExchange.Visible){
        if(pageExchangebuttonCancel.Visible && pageExchangebuttonNext.Visible ){
            Log.Message("Page exchange next and cancel buttons are displayed.");
        }else{
            merlinLogError("Page exchange buttons are not displayed on window.");
            return;
        }
      }else{
        merlinLogError("Page exchange window is not displayed.");        
    }   
    Button.clickOnButton(selectDirectoryButton); 
    if( Directory_SendLogs.Exists   && Directory_SendLogs.Enabled
      && Directory_ChangePassword.Exists   && Directory_ChangePassword.Enabled
      && Directory_AutoValidationOnOff.Exists   && Directory_AutoValidationOnOff.Enabled
      //&& Directory_CashLift.Exists   && ! Directory_CashLift.Enabled       
     // && Directory_TrackerLoggedOn.Exists   && Directory_TrackerLoggedOn.Enabled
      && Directory_Tracker.Exists   && Directory_Tracker.Enabled
      && Directory_OrderHistory.Exists   && Directory_OrderHistory.Enabled
      && Directory_NoSale.Exists   && Directory_NoSale.Enabled
      && Directory_PrintExchangeQueue.Exists   && Directory_PrintExchangeQueue.Enabled
      && Directory_GoOffline.Exists   && Directory_GoOffline.Enabled
      && Directory_CancelOrder.Exists   && Directory_CancelOrder.Enabled 
      //&& Directory_About.Exists   && Directory_About.Enabled 
      )
     {
       Log.Message("Directory menu expands and all options are visible .");
       Button.clickOnButton(selectDirectoryButton); 
     }else{
       merlinLogError("User is not successfully logged out.");     
     }
    AppLoginLogout.logout(); 
    } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }   
  
}
 