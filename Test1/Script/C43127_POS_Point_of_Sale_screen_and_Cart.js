//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT WrapperFunction

function C43127_POS_Point_of_Sale_screen_and_Cart()
{ 
try{
    Log.AppendFolder("C43127_POS_Point_of_Sale_screen_and_Cart");
    InitializationEnviornment.initiliaze();
     AppLoginLogout.login();
    
    aqUtils.Delay(2000);  
    
    checkControlExistence(passportPOS);
    checkControlExistence(homeButton);
    checkControlExistence(Keyword_Listgroup);
    checkControlExistence(groupCartandcarttotalsgroup); 
   
    } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally {  
      AppLoginLogout.logout(); 
	    Log.PopLogFolder();
    } 
}