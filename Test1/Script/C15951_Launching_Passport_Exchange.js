//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT WrapperFunction

function C15951_Launching_Passport_Exchange()
{
try{
    Log.AppendFolder("C15951_Launching_Passport_Exchange");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
   try {
    	Log.AppendFolder("C15951_Launching_Passport_Exchange");
      WrapperFunction.selectMainMenu(Exchange_MainMenu);        
      aqUtils.Delay(15000);
      if(pageExchange.Exists && pageExchange.Visible){
        if(pageExchangebuttonCancel.Visible && pageExchangebuttonNext.Visible ){
            Log.Message("Page exchange next and cancel buttons are displayed.");
        }else{
          merlinLogError("Page exchange buttons are not displayed on window.");
        }
      }else{
        merlinLogError("Page exchange window is not displayed.");
      }
            
    } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    } 
    AppLoginLogout.logout(); 
     } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();      
    }   
}