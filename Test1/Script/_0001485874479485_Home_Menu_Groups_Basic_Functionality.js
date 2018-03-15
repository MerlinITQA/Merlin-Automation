//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT SelectGroupFromMainMenu

function _0001485874479485_Home_Menu_Groups_Basic_Functionality()
{
try{
      Log.AppendFolder("_0001485874479485_Home_Menu_Groups_Basic_Functionality");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      var groupNm=defaultGroupName;   
      selectGroupFromMainMenu(groupNm);
      aqUtils.Delay(2000);  
      if(groupUpdateDataGridReservation.Visible &&groupUpdateBuyTicketsButton.Visible){
        Log.Message("'Groups' is accessible via the 'Home Menu'.");
      }else{
         merlinLogError("'Groups' is not accessible via the 'Home Menu'.");
      } 
      AppLoginLogout.logout();  
      AppLoginLogout.loginCashier();     
      selectGroupFromMainMenu(groupNm);
      aqUtils.Delay(2000);  
      if(groupUpdateDataGridReservation.Visible &&groupUpdateBuyTicketsButton.Visible){
        Log.Message("'Groups' is accessible via the 'Home Menu'.");
      }else{
         merlinLogError("'Groups' is not accessible via the 'Home Menu'.");
      } 
      AppLoginLogout.logout();
  } catch (e) {
  	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
      }
      finally { 
  	    Log.PopLogFolder();
      } 
}