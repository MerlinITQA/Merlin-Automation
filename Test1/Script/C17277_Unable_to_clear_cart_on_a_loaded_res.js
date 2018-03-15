//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT ConvertReservationsToPurchase

function C17277_Unable_to_clear_cart_on_a_loaded_res()
{
  try{
      Log.AppendFolder("C17277_Unable_to_clear_cart_on_a_loaded_res");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();  
      selectGroupFromMainMenu(defaultGroupName);
      groupUpdateDataGridReservation.ClickCell(0,0);
      aqUtils.Delay(2000);     
      clickLoadReservation();      
      Button.clickOnButton(editOrder_SettlementWindow);
      aqUtils.Delay(2000);
      Button.clickOnButton(confirmationbuttonClearbtn);
      aqUtils.Delay(500);
      Button.clickOnButton(confirmationbuttonClearbtn);
      
      if(errorWindow.Exists){
        var errorMsg ="If you need to lower capacity of a reserved item, please cancel the tickets.";
        var errorMsgActual = errorMessagedisplay.Caption;
        VerifyCheckProperty.compareStringObj(errorMsg,errorMsgActual);
        Button.clickOnButton(buttonOkOnError);
      } 
      else
        {
          merlinLogError("Error message Window is not displayed.");
        }     
    } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
  AppLoginLogout.logout(); 
}
