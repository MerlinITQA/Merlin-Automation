//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT SelectGroupFromMainMenu
//USEUNIT WrapperFunction

function _0001485874476745_Support_Manager_Basic_Functionality()
{
try{
      Log.AppendFolder("_0001485874476745_Support_Manager_Basic_Functionality");
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();   
   WrapperFunction.selectMainMenu(SupportManger_MainMenu);  
   aqUtils.Delay(10000); 
//   if(SupportManger_MainMenu.Caption == mainMenuHeaderText.Caption){
//      Log.Message("Support Manager is selected.");
//   } else{
//      merlinLogError("Support Manager Heading is wrong.");
//   }
  // AppLoginLogout.loginSupportManager(); 
   if(smOrdersearchbutton.Exists && newConfirmationSearchtextBox.Exists 
      && newPerformSearchButton.Exists &&  smCreateprofilebutton.Exists &&  
       smEmailtemplatebutton.Exists && smEventsearchbutton.Exists){
      Log.Message("Menu options are available for selection in Support Manager.");
      Button.clickOnButton(newCancelButton);
  } 
  else{
     merlinLogError("Menu options are not available for selection in Support Manager.");
  } 
  AppLoginLogout.logout();
   } catch (e) {
  	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
      }
      finally { 
  	    Log.PopLogFolder();
      }  
}