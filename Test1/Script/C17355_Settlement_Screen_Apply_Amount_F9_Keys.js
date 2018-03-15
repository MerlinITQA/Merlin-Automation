//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT VerifyCheckProperty
 

function C17355_Settlement_Screen_Apply_Amount_F9_Keys()
{ 
    InitializationEnviornment.initiliaze(); 
    AppLoginLogout.login();  
    try {
    Log.AppendFolder("C17355_Settlement_Screen_Apply_Amount_F9_Keys");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Cash","[F9]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Credit Card","[F9]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Websphere","[F9]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"External CC","[F9]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Invoice","[F9]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Callscripter","[F9]");
   // verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Ticket","[F9]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Voucher","[F9]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Check","[F9]");    
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
   AppLoginLogout.logout(); 
}