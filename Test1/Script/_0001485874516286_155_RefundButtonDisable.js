//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT SelectDirectory 
//USEUNIT PlaceOrder

function _0001485874516286_155_RefundButtonDisable()
{
  
try{
  Log.AppendFolder("_0001485874516286_155_RefundButtonDisable");
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
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
  aqUtils.Delay(5000);
  AppLoginLogout.logout();  
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
}
 