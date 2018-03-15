//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT VerifyCheckProperty
//USEUNIT POSObjectMapping

function C17357_Settlement_Screen_Apply_Balance_F11_Keys()
{ 
 
    InitializationEnviornment.initiliaze(); 
    AppLoginLogout.login();  
     try {
    Log.AppendFolder("C17357_Settlement_Screen_Apply_Balance_F11_Keys");
     
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Cash","[F11]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Credit Card","[F11]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Websphere","[F11]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"External CC","[F11]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Invoice","[F11]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Callscripter","[F11]");
   // verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Ticket","[F11]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Voucher","[F11]");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Check","[F11]");    
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
   AppLoginLogout.logout(); 
}