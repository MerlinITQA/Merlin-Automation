//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT WrapperFunction

function C43070_New_Quantity_Selector_option()
{ 
  Log.AppendFolder("C43070_New_Quantity_Selector_option");
  InitializationEnviornment.initiliaze(); 
  AppLoginLogout.login();
   aqUtils.Delay(2000);
  try{
    checkControlExistence(labelQuantitylabel);
    checkControlExistence(selectablebuttonClearbutton);
    checkControlExistence(selectablebuttonQtybtn0);
    checkControlExistence(selectablebuttonQtybtn1);
    checkControlExistence(selectablebuttonQtybtn2);
    checkControlExistence(selectablebuttonQtybtn3);
    checkControlExistence(selectablebuttonQtybtn4);
    checkControlExistence(selectablebuttonQtybtn5);
    checkControlExistence(selectablebuttonQtybtn6);
    checkControlExistence(selectablebuttonQtybtn7);
    checkControlExistence(selectablebuttonQtybtn8);
    checkControlExistence(selectablebuttonQtybtn9);
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
  AppLoginLogout.logout(); 
}
 