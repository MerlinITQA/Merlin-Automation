//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT SelectDirectory
  
function _0001485874515394_154_LogFileVerification()
{
Log.AppendFolder("_0001485874515394_154_LogFileVerification");
try
{  
      var fso, folder, myEnum, f,fName;
     InitializationEnviornment.initiliaze();
       AppLoginLogout.login();
      Process.isProcessRunningClose();       
    
      var sysPath= getLogFolderPath();     
      Log.Message("sysPath "+sysPath );
      fso = Sys.OleObject("Scripting.FileSystemObject");
      folder = fso.GetFolder(sysPath);
      var packageArray = new Array();
      for (let f of folder.Files)
        {
          fName=f.Name;   
          if(fName.endsWith(".log")||fName.endsWith(".LOG")){
              Log.Message("Files :"+fName);
              if(fName.includes("cePOS")||
                 fName.includes("EXTERNALDEVICE")||
                 fName.includes("passportPOS")||
                 fName.includes("POSPRINT"))
              {
                Log.Message("Log file available");
              }
              else
              {
                  merlinLogError("Log file not available"+fName);
              }
          }else{
             merlinLogError("log file extension names does not end with .log"+fName);
          }          
        }       
    }
catch(e)
{
        merlinLogError("Exception occured");       
}
}
 