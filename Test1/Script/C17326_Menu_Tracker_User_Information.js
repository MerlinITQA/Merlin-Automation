//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT SelectDirectory
  
function C17326_Menu_Tracker_User_Information()
{  
try
{  
      Log.AppendFolder("C17326_Menu_Tracker_User_Information");
     // InitializationEnviornment.initiliaze();
     // AppLoginLogout.login();  
      Button.clickOnButton(selectDirectoryButton); 
      if(toggleTrackertoggle.FlexObject.active){
          Log.Message("Tracker is enabled");
          Button.clickOnButton(Directory_Tracker);
          if (trackerpopupTrackerScanAndValida.Exists  && trackerScanBarcodeInput.Visible && 
                      trackerScanLogout.Visible && trackerScanValidate.Visible){
            Log.Message("Validate all fields in Tracker Scan And validate popup");
              var appFolder = TestedApps.Passport_POS.Path;
              var trackerUserName="";
              var fso, folder, myEnum, f,fName; 
              fso = Sys.OleObject("Scripting.FileSystemObject");
              folder = fso.GetFolder(appFolder);
              for (let f of folder.Files)
              {
                      fName=f.Name; 
                      sPath = appFolder + fName; 
                      sFileNm =aqString.Replace(sPath, "\\", "\\\\").trim();
                      sFile = aqString.Replace(sPath, "\\", "").trim();
                      try{
                        var F, s;
                        if (!aqFile.Exists(sFile) &&  fName.includes("config"))
                        {
                          F = aqFile.OpenTextFile(sFileNm, aqFile.faRead, aqFile.ctANSI);
                          aqFile.o
                          F.Cursor = 0; 
                          while(! F.IsEndOfFile()){
                            s = F.ReadLine();
                            if(s.includes("trackerUser=")){
                               trackerUserName = (s.split('=')[1]).trim();
                               trackerUserName = aqString.Replace(trackerUserName,"\"","");
                               Log.Message(trackerUserName);
                                break;
                            }
                          }
                          F.Close();
                          }
                        } catch ( e) {
                          merlinLogError("Error: ");
                        }
                    }
            var uName= labelCurrentUserName.Caption;          
            if (uName.includes(trackerUserName)){
              Log.Message("Current User name is displayed.");
            }else{
              merlinLogError("Current User name is not displayed.");
            }  
              Button.clickOnButton(trackerScanCloseButton);        
          }
          else{
            merlinLogError("Tracker Scan and Validate window is not displayed")
          }
        }else{
         merlinLogError("Tracker is not enabled");
        }
    }
  catch(e)
  {
          merlinLogError("Exception occured"); 
  }
  finally { 
	    Log.PopLogFolder();
    } 
       AppLoginLogout.logout();
    
}
 