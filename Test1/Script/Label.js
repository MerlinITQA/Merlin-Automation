//USEUNIT ApplicationOpen
/** @function
@name Label.clickOnLabel
@description Click On Lable.
@param {Object} locator  TestComplete's object containing a Lable.
*/
function clickOnLabel(locator) {
	try {
    
	 	Log.AppendFolder("Label.clickOnLabel");
    
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

/*****************************************************************************************/