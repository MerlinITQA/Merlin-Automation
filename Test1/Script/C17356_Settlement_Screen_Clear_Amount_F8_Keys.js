//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT VerifyCheckProperty
 

function C17356_Settlement_Screen_Clear_Amount_F8_Keys()
{ 
    InitializationEnviornment.initiliaze(); 
    AppLoginLogout.login();  
    try {
    Log.AppendFolder("C17356_Settlement_Screen_Clear_Amount_F8_Keys");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Cash","[F8]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Credit Card","[F8]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Websphere","[F8]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"External CC","[F8]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Invoice","[F8]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Callscripter","[F8]");
   // verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Ticket","[F8]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Voucher","[F8]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Check","[F8]");    
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
   AppLoginLogout.logout(); 
}