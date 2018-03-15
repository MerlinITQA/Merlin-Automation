//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
 

function C17544_12_Hour_Clock_Displays()
{
try
 {
      Log.AppendFolder("C17544_12_Hour_Clock_Displays");
      InitializationEnviornment.initiliaze();
      aqUtils.Delay(1000);
//      var launchampma = launchampm.Caption;
//      var launchtimehoura = launchtimehour.Caption;
//      var launchtimeminutea = launchtimeminute.Caption;
      var launchClock = launchClockLabel.Caption;
     // timeNow = launchtimehoura+":"+launchtimeminutea +" "+launchampma;
      toDate =aqConvert.DateTimeToFormatStr( aqDateTime.Now(), "%#I:%M %p");
      if(launchClock.endsWith("PM") || launchClock.endsWith("AM")){
        Log.Message("12 hrs time is displayed.");
       }
       else{
          merlinLogError("12 hrs time is not displayed.");
       }
  }catch(e)
  {
         merlinLogError("Exception in Test script");
  } finally { 
	    Log.PopLogFolder();
    }   
}