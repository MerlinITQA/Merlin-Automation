//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//USEUNIT SelectDirectory
  
function _0001485874512540_149_About_InformationValidation()
{
Log.AppendFolder("_0001485874512540_149_About_InformationValidation");
try
 {       InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
      
        SelectDirectory.selectDirectory(Directory_About);
               var posVersionActualValue ="v5.0.4"; 
        var posVersionExpectedValue = getTextValue(PosVersion);
        Log.Message("posVersionExpectedValue "+posVersionExpectedValue);
        isIncludes(posVersionExpectedValue,posVersionActualValue);
        
        var cePosVersionActualValue ="1.8.2"; 
        var cePosVersionExpectedValue = getTextValue(CePosVersion);
        Log.Message("cePosVersionExpectedValue "+cePosVersionExpectedValue);
        isIncludes(cePosVersionExpectedValue,cePosVersionActualValue);
        
        var extDeviceVerActualValue ="1.3.1.0";
        var extDeviceVerExpectedValue = getTextValue(ExternalDeviceVersion);
        Log.Message("extDeviceVerExpectedValue "+extDeviceVerExpectedValue);
        isIncludes(extDeviceVerExpectedValue,extDeviceVerActualValue);
               
        var posPrintVersionActualValue ="1.67.1";
        var posPrintVersionExpectedValue = getTextValue(PosPrintVersion);
        Log.Message("posPrintVersionExpectedValue "+posPrintVersionExpectedValue);
        isIncludes(posPrintVersionExpectedValue,posPrintVersionActualValue);
        
        var islandNameActualValue ="https://preprod-cegateway.accesso.com/ceGateway/servlet/accesso90";
        var islandNameExpectedValue = getTextValue(IslandName);
        Log.Message("islandNameExpectedValue "+islandNameExpectedValue);
        isIncludes(islandNameExpectedValue,islandNameActualValue);
               
        var merchantNameActualValue ="803";
        var merchantNameExpectedValue = getTextValue(MerchantName);
        Log.Message("merchantNameExpectedValue "+merchantNameExpectedValue);
        isIncludes(merchantNameExpectedValue,merchantNameActualValue);
               Button.clickOnButton(CloseButton);
    AppLoginLogout.logout();         
    }
catch(e)
{
        merlinLogError("Exception occured");
        //Runner.Stop();
}
}
 