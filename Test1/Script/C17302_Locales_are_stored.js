//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT WrapperFunction
 
function C17302_Locales_are_stored()
{

try
{  
    Log.AppendFolder("C17302_Locales_are_stored");
    var fso, folder,fName; 
    var sysPath= getLocaleFolderPath();
    Log.Message("sysPath "+sysPath );
    fso = Sys.OleObject("Scripting.FileSystemObject");
    folder = fso.GetFolder(sysPath);
    for (let f of folder.Files)
    {
       fName=f.Name; 
       sPath = sysPath + fName;      
       sFile = aqString.Replace(sPath, "\\", "").trim();
       try{
            var F, s;
            if (!aqFile.Exists(sFile))
            {
              Log.Message("The locale file is present")  
              }else{
                 merlinLogError("The locale file is  not present")
              }
            } catch ( e) {
              merlinLogError("Error: ");
            } 
        }        
    }
  catch(e)
  {
          merlinLogError("Exception occured Local folder does not exist."); 
  }
}
 