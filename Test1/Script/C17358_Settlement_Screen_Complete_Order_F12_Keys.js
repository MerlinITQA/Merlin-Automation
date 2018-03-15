//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT VerifyCheckProperty
 

function C17358_Settlement_Screen_Complete_Order_F12_Keys()
{ 
    InitializationEnviornment.initiliaze(); 
     AppLoginLogout.login();  
    try {
    Log.AppendFolder("C17358_Settlement_Screen_Complete_Order_F12_Keys");
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Cash","[F12]");
    AppLoginLogout.logout(); 
    AppLoginLogout.login(); 
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Credit Card","[F12]");
    AppLoginLogout.logout(); 
    AppLoginLogout.login();
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Websphere","[F12]");
    AppLoginLogout.logout(); 
    AppLoginLogout.login();
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"External CC","[F12]");
    AppLoginLogout.logout(); 
    AppLoginLogout.login();
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Invoice","[F12]");
    AppLoginLogout.logout(); 
    AppLoginLogout.login();
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Callscripter","[F12]");
    AppLoginLogout.logout(); 
    AppLoginLogout.login();
   // verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Ticket","[F12]");
   //   AppLoginLogout.logout(); 
   //   AppLoginLogout.login();
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Voucher","[F12]");
    AppLoginLogout.logout(); 
    AppLoginLogout.login();
    verifyFunctionKeys("Daily Admission","Date/Time","Adult",2,CommonCalender.getTodaysDate(),"Check","[F12]");    
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
   AppLoginLogout.logout(); 
}