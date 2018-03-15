//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT SelectDirectory 
//USEUNIT PlaceOrder

function C16083_Refund_button_is_disabled_offline_mode()
{ 
try{
     Log.AppendFolder("C16083_Refund_button_is_disabled_offline_mode");
   InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
   aqUtils.Delay(2000);
  Button.clickOnButton(selectablebuttonScrolldown);
  SelectDirectory.selectDirectory(Directory_GoOffline);
  placeOrder("Daily Admission","Open Dated","Children (Ages 3-12)",1,CommonCalender.getTodaysDate(),"Cash");
  if(Refund_Button.Exists && Refund_Button.Enabled){
    merlinLogError("Refund button can be processed while in Offline mode");
  }else{
    Log.Message("Refunds button is not enabled while in Offline mode.")
  }  
//  Refund_Button.Click();
//  aqUtils.Delay(2000);
//  if(authorizationpopupRefundReservat.Exists && authorizationpopupRefundReservat.Visible){
//    merlinLogError("Refund button can be processed while in Offline mode");
//  }else{
//    Log.Message("Refunds canNot be processed while in Offline mode Button is disabled.")
//  }  
  SelectDirectory.selectDirectory(Directory_GoOffline);
  aqUtils.Delay(3000);
  AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
}