//USEUNIT AppLoginLogout
//USEUNIT ApplicationOpen


/** 
 * This function is used to select specified items in a listbox.
 * @param {Object} Listbox - The Listbox object.
 * @param {String} Items - A list of items in forms of a '|' delimited string e.g. "Resource|Program".
 * @return {Boolean} - True if all the items exist in the Listbox, false otherwise.
 * @autor  Swapnil Mane
 */
 
function SelectListboxItem(Listbox, ItemName)
 {
   try
   {
     Listbox.ListItem(ItemName).Click();
   }
  catch(e)
   {
    merlinLogError("Oops! There's some glitch in the script: " + e.message);
    return;
  }
  finally
  {
    Log.PopLogFolder();
  }
}

/*********************************************************************************************/