//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectDirectory
function C43141_Offline_Adding_tickets_to_Cart_when_going_back_Online()
{ 
try{
      Log.AppendFolder("C43141_Offline_Adding_tickets_to_Cart_when_going_back_Online");
      InitializationEnviornment.initiliaze(); 
      AppLoginLogout.login();
      aqUtils.Delay(2000);
      SelectDirectory.selectDirectory(Directory_GoOffline);
      aqUtils.Delay(2000);
      if ( bottomPOSOfflineImage.Visible && !(bottomPOSOnlineImage.Visible)){
          Log.Message("POS is in Offline mode.")
      }else{
          merlinLogError("Bottom image shows POS is Online.")
      }
      aqUtils.Delay(2000);
      SelectDirectory.selectDirectory(Directory_GoOffline);
      aqUtils.Delay(2000);
      if ( !(bottomPOSOfflineImage.Visible) && bottomPOSOnlineImage.Visible){
          Log.Message("POS is in Online mode.")
      }else{
          merlinLogError("Bottom image shows POS is Offline.")
      }
      placeOrder("Daily Admission","Dated","Children (Ages 3-12)",2,CommonCalender.getTodaysDate(),"Cash");
      AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
}