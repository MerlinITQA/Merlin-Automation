//USEUNIT AppLoginLogout
//USEUNIT ApplicationOpen
//USEUNIT POSObjectMapping

/** 
 * This function is used to select specified items in a listbox.
 * @param {Object} Listbox - The Listbox object.
 * @param {String} Items - A list of items in forms of a '|' delimited string e.g. "Resource|Program".
 * @return {Boolean} - True if all the items exist in the Listbox, false otherwise.
 */
 
function SelectListboxItem(locator, ItemName)
 {
 
  try
   {
    if (locator.WaitProperty("Enabled", true, 30000)
    && locator.Visible)
    {
      Log.Message("ItemName" +ItemName);
       var count=locator.wItemCount;
       Log.Message("count" +count);
       for(i=0;i<count;i++)
       {
         var element=locator.wItem(i);
         Log.Message("element" +element);
      
         if(element==ItemName)
         {
           locator.ClickItem(element);
           break;
         }
      }
    }
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



