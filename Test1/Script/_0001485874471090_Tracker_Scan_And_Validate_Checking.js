//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PassholderDetails
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType

//USEUNIT SelectDirectory
function _0001485874471090_Tracker_Scan_And_Validate_Checking()
{
try{
      Log.AppendFolder("_0001485874471090_Tracker_Scan_And_Validate_Checking");
      InitializationEnviornment.initiliaze();
       AppLoginLogout.login();  
        Button.clickOnButton(selectDirectoryButton); 
        if(Directory_Tracker_OnOff.FlexObject.active){
          Log.Message("Tracker is enabled");
            Button.clickOnButton(Directory_Tracker);
          if (trackerpopupTrackerScanAndValida.Exists  && trackerScanBarcodeInput.Visible && 
                      trackerScanLogout.Visible && trackerScanValidate.Visible){
            Log.Message("Validate all fields in Tracker Scan And validate popup");
            Button.clickOnButton(trackerScanCloseButton);
          }
          else{
            merlinLogError("Tracker Scan and Validate window is not displayed")
          }
        }else{
         merlinLogError("Tracker is not enabled");
        }
       AppLoginLogout.logout();  
        } catch (e) {
  	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
      }
      finally { 
  	    Log.PopLogFolder();
      }       
} 