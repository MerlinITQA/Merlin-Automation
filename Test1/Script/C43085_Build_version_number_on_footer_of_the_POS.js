//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT WrapperFunction
//USEUNIT VerifyCheckProperty
function C43085_Build_version_number_on_footer_of_the_POS()
{
  Log.AppendFolder("C43085_Build_version_number_on_footer_of_the_POS");
  try{  
  InitializationEnviornment.initiliaze();
  var expectedBuildText = "© 2017 accesso Technology Group plc build v5.0.8 - Service Pack 3"; 
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
 