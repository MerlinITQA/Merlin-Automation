//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT WrapperFunction
//USEUNIT VerifyCheckProperty
function C43085_Build_version_number_on_footer()
{
  Log.AppendFolder("C43085_Build_version_number_on_footer");
  try{  
  InitializationEnviornment.initiliaze();
  
  var buildTextOnUI = footerBuildNumber.Caption;
   
    VerifyCheckProperty.compareStringObj(buildTextOnUI,expectedBuildText);   
    AppLoginLogout.login();
    buildTextOnUI = footerBuildNumber.Caption; 
    VerifyCheckProperty.compareStringObj(buildTextOnUI,expectedBuildText);
      
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
    AppLoginLogout.logout(); 
}
 