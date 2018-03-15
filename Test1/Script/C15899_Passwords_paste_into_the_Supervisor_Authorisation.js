//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectDirectory 
//USEUNIT PlaceReservationOrder
function C15899_Passwords_paste_into_the_Supervisor_Authorisation()
{ 
// var testCaseId = 42852;
  try {   
      InitializationEnviornment.initiliaze();
      AppLoginLogout.loginCashier();  
      SelectDirectory.selectDirectory(Directory_GoOffline);
      aqUtils.Delay(1000);
      var p, Edit;
      WshShell.Run("notepad.exe", SW_SHOWNORMAL);
      p = Sys.Process("NOTEPAD");
      Edit = p.Window("Notepad").Window("Edit");
      Edit.Keys("myPassword");
      Edit.Keys("^a");
      Edit.Keys("^c");
      Edit.ClickR(-1,-1,0);  
      Edit.PopupMenu.Click("Copy");
      aqUtils.Delay(2000);
        var np=Sys.WaitProcess("notepad");      
         if (np.Exists){
            np.Terminate();       
         }
         aqUtils.Delay(2000);
       refundReservationConfPassword.Click();
       refundReservationConfPassword.ClickR(-1,-1,0);
       aqUtils.Delay(200);
       wnd.PopupMenu.Click("Paste");
    aqUtils.Delay(1000);
    var passValue = refundReservationConfPassword.Caption;
    if(passValue == ""){
      Log.Message("password canNot be pasted into the Password field.");
    }else{
    merlinLogError("password can be pasted into the Password field");
    }   
    refundReservationClosebutton.Click();
    AppLoginLogout.logout();   
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
//      ApplicationOpen.updateInTestRail(testCaseId);
//	    Log.PopLogFolder();
    }
}
