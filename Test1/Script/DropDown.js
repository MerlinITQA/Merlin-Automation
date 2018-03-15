/** 
 * This function is used to select specified items from Dropdown.
 * @param {Object} DropDown - The DropDown object.
 * @param {String} ItemName - A list of items in forms of a '|' delimited string e.g. "Resource|Program".
 * @return {Boolean} - True if all the items exist in the Listbox, false otherwise.
 * @autor  
 */
function SelectListboxItemsWithListBoxName(DropDown, ItemName) {
   try {
   	Log.AppendFolder("ListBox.SelectListboxItems");
    if (DropDown.WaitProperty("Enabled", true, 30000))
    {
       DropDown.ListItem(ItemName).Click();
    }
    else
    {
        merlinLogError("The text box didn't become enabled within 15 seconds.");
    }
	} catch (e) {
		merlinLogError("Oops! There's some glitch in the script: " + e.message);
		return;
	}
	finally {
		Log.PopLogFolder();
	}
}