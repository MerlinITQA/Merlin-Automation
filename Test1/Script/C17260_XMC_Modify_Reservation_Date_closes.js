//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT ConvertReservationsToPurchase

function C17260_XMC_Modify_Reservation_Date_closes()
{
  try{
      Log.AppendFolder("C17260_XMC_Modify_Reservation_Date_closes");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();  
      selectGroupFromMainMenu(defaultGroupName);
      groupUpdateDataGridReservation.ClickCell(0,0);
	    aqUtils.Delay(2000);
      Button.clickOnButton(checkboxReservationOrder);
      clickModifyReservationDate();
      if(errorMessagedisplay.Exists){
        Button.clickOnButton(buttonOkOnError);
      } 
      if(modifyreservationdatepopupModify.Exists){
           checkControlExistence(homeButton); 
		   aqUtils.Delay(11000);   
           aqUtils.Delay(1000*60*16);        
            checkControlExistence(youhavebeenloggedout);   
           if(youhavebeenloggedout.Exists)
            {
              Log.Message("You have been logged out Window is displayed.");
              youhavebeenloggedout.Click();
               aqUtils.Delay(10000);
              checkControlExistence(userNameTxtBox);
              checkControlExistence(passwordTxtBox);
              AppLoginLogout.login();
               if(modifyreservationdatepopupModify.Exists){
                  merlinLogError("Calendar Window is displayed.")
               }                 
            }
            else
            {
              merlinLogError("You have been logged out Window is not displayed.");
            }
      }else{
       merlinLogError("Modify Reservation Date window is not displayed.")
      } 
    } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
  AppLoginLogout.logout(); 
}
