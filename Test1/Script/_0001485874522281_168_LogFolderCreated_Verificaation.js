//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT SelectDirectory
  
function _0001485874522281_168_LogFolderCreated_Verificaation()
{
Log.AppendFolder("_0001485874522281_168_LogFolderCreated_Verificaation");
try
{  
        InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
        AppLoginLogout.logout();
        AppLoginLogout.login();
        AppLoginLogout.logout();
         
        var fso, folder, myEnum, f,fName; 
       Process.isProcessRunningClose( );
       
       var sysPath= getLogFolderPath();
     
         Log.Message("sysPath "+sysPath );
        fso = Sys.OleObject("Scripting.FileSystemObject");
        folder = fso.GetFolder(sysPath);
          for (let f of folder.Files)
        {
          fName=f.Name; 
          sPath = sysPath + fName; 
          sFileNm =aqString.Replace(sPath, "\\", "\\\\").trim();
          sFile = aqString.Replace(sPath, "\\", "").trim();
          try{
            var F, s;
            if (!aqFile.Exists(sFile) &&  fName.includes("passportPOS"))
            {
              F = aqFile.OpenTextFile(sFileNm, aqFile.faRead, aqFile.ctANSI);
              aqFile.o
              F.Cursor = 0; 
              while(! F.IsEndOfFile()){
                s = F.ReadLine();
                if(s.includes("5.0.4")){
                    Log.Message(s);
                    break;
                }
              }
              F.Close();
              }
            } catch ( e) {
              merlinLogError("Error: ");
            }
           
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
 