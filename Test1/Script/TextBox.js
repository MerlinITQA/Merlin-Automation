//USEUNIT ApplicationOpen
/** @function
@name TextBox.setTextBoxValue
@description Assign text box with a new value.
@param {Object} control  TestComplete's object containing a text box.
@param {String} value    Value to assign.
 */
function setTextBoxValue(control, value) 
{
  try 
  {
	 	Log.AppendFolder("Set value to textbox Common_TextBox.SetTextBoxValue ");
    if (control.WaitProperty("Enabled", true, 30000))
    {
    //  control.Keys(""); 
      control.keys("[BS]")
      control.keys("")
      control.keys(value);
    }
    else
    {
        merlinLogError("The text box didn't become enabled within 15 seconds.");
    }
    Log.Message("Set Value :"+value);
	 	 
	} catch (e) 
  {
    merlinLogError("Object: "+control.Name+" not found");
    //Runner.Stop(true);
	 	return;
	}
	finally {
		Log.PopLogFolder();
	}
}

