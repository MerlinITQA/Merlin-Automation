//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT VerifyCheckProperty 
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT SelectDirectory

function _0001485874499581_Automatic_default_placement_on_selected_screens()
{
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
  try {   
    Log.AppendFolder("_0001485874499581_Automatic_default_placement_on_selected_screens");
      
    WrapperFunction.selectKeywordName("Promo Codes");
    aqUtils.Delay(1000); 
    Sys.Desktop.Keys("Test"); 
    aqUtils.Delay(500);
    var str = PromoCodes_EnterPromoCodes.Caption;
    if(compareStringObj("Test",str)){
      Log.Message("Promo Code – Places the cursor in the Promo Code field");
     }else  {
      merlinLogError("Cursor is not placed in the Promo Code field");
    }
        
    selectDirectory(Directory_Tracker);    
    aqUtils.Delay(1000); 
    Sys.Desktop.Keys("Test"); 
    aqUtils.Delay(500);
    var str = trackerScanBarcodeInput.Caption;
    if(compareStringObj("Test",str)){
      Log.Message("Tracker (Log In) - Places the cursor in the Device ID field");
     }else  {
      merlinLogError("Tracker (Log In) - IS NOT Places the cursor in the Device ID field");
    }
    Button.clickOnButton(trackerScanCloseButton);
    WrapperFunction.selectMainMenu(PassProcessing_MainMenu);    
    aqUtils.Delay(1000); 
    Sys.Desktop.Keys("123"); 
    aqUtils.Delay(500);
    var str = PassHolderSearch_TicketID.Caption;
    if(compareStringObj("123",str)){
      Log.Message("Pass Processing – Places the cursor in the Ticket ID field");
     }else  {
      merlinLogError("Pass Processing – IS NOT Places the cursor in the Ticket ID field");
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
