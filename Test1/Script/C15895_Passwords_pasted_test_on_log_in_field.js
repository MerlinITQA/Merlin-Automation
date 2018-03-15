//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT SelectDirectory 

function C15895_Passwords_pasted_test_on_log_in_field()
{ 
  try {   
      Log.AppendFolder("C15895_Passwords_pasted_test_on_log_in_field");
      var p, Edit;
      WshShell.Run("notepad.exe", SW_SHOWNORMAL); 
      p = Sys.Process("NOTEPAD");
      Edit = p.Window("Notepad").Window("Edit");
      Edit.Keys("myPassword");
       aqUtils.Delay(500);
      Edit.Keys("^a");
      aqUtils.Delay(500);
      Edit.Keys("^c");
      aqUtils.Delay(500);
      Edit.ClickR(-1,-1,0); 
      aqUtils.Delay(1000); 
      Edit.PopupMenu.Click("Copy");
      aqUtils.Delay(5000); 
      InitializationEnviornment.initiliaze();
      TextBox.setTextBoxValue(userNameTxtBox,"MerlinQA");
       passwordTxtBox.Click(1,1,0);
       passwordTxtBox.ClickR(-1,-1,0);
       aqUtils.Delay(300); 
       wnd.PopupMenu.Click("Paste");
       aqUtils.Delay(1000);
       if(passwordTxtBox.Caption != ""){
        merlinLogError("Current password field can be pasted.")
       }
       var np=Sys.WaitProcess("notepad");      
         if (np.Exists){
            np.Terminate();       
         }          
       
      Log.Message("after errorr");
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
     // ApplicationOpen.updateInTestRail(testCaseId);
	   // Log.PopLogFolder();
    }
}
 