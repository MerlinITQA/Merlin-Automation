//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT SelectQuantityFromHeader
//USEUNIT VerifyCheckProperty

function C17238_Quantity_selected_Does_Not_remain()
{
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
  try {
    Log.AppendFolder("C17238_Quantity_selected_Does_Not_remain");
      aqUtils.Delay(2000);
      selectQuantity(11);
      aqUtils.Delay(2000);
      if(labelQuantitylabel.Caption == 11){
        Log.Message("Quantity selected.")
      }else{
        merlinLogError("Quantity is not selected.")
      }
      AppLoginLogout.logout(); 
      AppLoginLogout.login();
       aqUtils.Delay(2000);
       if(labelQuantitylabel.Caption == 0){
        Log.Message("Quantity is not selected.")
      }else{ 
        merlinLogError("After logging back in the Qty banner at the top will display the word Qty.")
        merlinLogError("Previously selected No number is displayed.");
      } 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
    AppLoginLogout.logout(); 
}
 