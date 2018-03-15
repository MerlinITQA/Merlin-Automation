//USEUNIT ApplicationOpen

/** @function
@name Common_Button.clickOnButton
@description Assign text box with a new value.
@param {Object} control  TestComplete's object containing a text box.
*/
function clickOnButton(locator) 
{
 
	try {
    Log.AppendFolder("Click on Button : ");
	 	if (locator.WaitProperty("Enabled", true, 10000)
     && locator.Visible)
    {
            locator.Click();
          
    }
    else
    {
        merlinLogError("The button didn't become enabled within 15 seconds.");
    }
	  
	} catch (e) {
		merlinLogError("Oops! There's some glitch in the script: " + e.message);	 
  	return;
	}
	finally {
		Log.PopLogFolder();
	}
}
/*********************************************************************************************/
/** @function
@name Common_Button.clickOnLabel
@description Assign text box with a new value.
@param {Object} control  TestComplete's object containing a text box.
*/
function click(locator) {
	try {
    
	 	Log.AppendFolder("Common_Button.clickOnLabel");
    
    if (locator.WaitProperty("Enabled", true, 30000)
    && locator.Visible)
    {
      locator.Click();
    }
    else
    {
        merlinLogError("The button didn't become enabled within 15 seconds.");
    }
	 	
	} catch (e) {
		merlinLogError("Oops! There's some glitch in the script: " + e.message);
		return;
	}
	finally {
		Log.PopLogFolder();
	}
} 
/*********************************************************************************************/  

// Click on locator with its cordinate
function mouseClick(locator,x,y)
{
  
  try {
    
	 	Log.AppendFolder("Common_Button.mouseClick");
    
    if (control.WaitProperty("Enabled", true, 30000)
    && control.Visible)
    {
     locator.Click(x,y);
    }
    else
    {
        merlinLogError("The button didn't become enabled within 15 seconds.");
    }
	 	
	} catch (e) {
		merlinLogError("Oops! There's some glitch in the script: " + e.message);
		return;
	}
	finally {
		Log.PopLogFolder();
	}
}  


/*********************************************************************************************/

