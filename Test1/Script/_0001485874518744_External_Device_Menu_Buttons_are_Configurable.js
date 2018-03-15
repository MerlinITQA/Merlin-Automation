//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT VerifyCheckProperty 
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT SelectDirectory

function _0001485874518744_External_Device_Menu_Buttons_are_Configurable()
{
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
  try {   
    Log.AppendFolder("_0001485874518744_External_Device_Menu_Buttons_are_Configurable");
    selectDirectory(Directory_Tracker);    
    aqUtils.Delay(1000); 
    Sys.Desktop.Keys("Test"); 
    aqUtils.Delay(500);
    var str = trackerScanBarcodeInput.Caption;
    if(compareStringObj("Test",str)){
      Log.Message("Tracker (Log In) - Places the cursor in the Device ID field");
     }else  {
      merlinLogError("Tracker (Log In) - IS NOT Places the cursor in the Device ID field");
       merlinLogError("Tracker Button is not present");
    }  
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
  AppLoginLogout.logout(); 
}
