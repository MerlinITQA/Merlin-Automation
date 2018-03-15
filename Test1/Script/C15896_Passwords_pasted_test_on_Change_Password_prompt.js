//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT SelectDirectory 

function C15896_Passwords_pasted_test_on_Change_Password_prompt()
{  
  try {   
  	 Log.AppendFolder("C15896_Passwords_pasted_test_on_Change_Password_prompt");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      SelectDirectory.selectDirectory(Directory_ChangePassword);
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
      aqUtils.Delay(1000);
       changePwdcurrentPassword.Click(1,1,0);
       changePwdcurrentPassword.ClickR(-1,-1,0);
       aqUtils.Delay(300); 
       wnd.PopupMenu.Click("Paste");
       aqUtils.Delay(1000);
       if(changePwdcurrentPassword.Caption != ""){
        merlinLogError("Current password field can be pasted.")
       }
       
       changePwdNewPassword.Click(1,1,0);
       changePwdNewPassword.ClickR(-1,-1,0);
       aqUtils.Delay(1000); 
       wnd.PopupMenu.Click("Paste");
       aqUtils.Delay(1000);
       if(changePwdNewPassword.Caption != ""){
        merlinLogError("New password field can be pasted.")
       }
       changePwdReenterNewPass.Click(1,1,0);   
       changePwdReenterNewPass.ClickR(-1,-1,0);
       aqUtils.Delay(300);
       wnd.PopupMenu.Click("Paste");
       aqUtils.Delay(1000);
       if(changePwdReenterNewPass.Caption != ""){
        merlinLogError("Re-enter New password field can be pasted.")
       }
         
       var np=Sys.WaitProcess("notepad");      
         if (np.Exists){
            np.Terminate();       
         } 
         changePwdClosebutton.Click()
    AppLoginLogout.logout();   
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder(); 
    } 
}
 