﻿//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder 

function _0001485874495995_Concierge_Tickets_Trade_Referral_Name_Capture()
{
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
  try {   
    var keyWordNm ="Daily Tickets";
    var packageNm = "Concierge Package";
    var subPakNm="Adult"; 
    var refersName ="12345";
    Log.AppendFolder("_0001485874495995_Concierge_Tickets_Trade_Referral_Name_Capture");
      
    WrapperFunction.selectKeywordName(keyWordNm); 
    selectPackage(packageNm,subPakNm); 
    finilizeOrder();
    aqUtils.Delay(2000);  
    if(mcformwrapperConciergePackageAdu.Exists && mcformwrapperConciergePackageAdu.VisibleOnScreen){
      WrapperFunction.setTextValue(conciergePktextinput,refersName);
      Button.clickOnButton(conciergePklabelNext);
      aqUtils.Delay(3000);
      if(labelSettlement.Exists && labelSettlement.VisibleOnScreen && labelSettlement.Caption =="Settlement" )
      {
       Log.Message("The user is taken to the 'Settlement screen' after entering the referrers name.");     
      }else{
      merlinLogError("Settlement screen is not displayed after entering the referrers name.");
      }  
    }else{
      merlinLogError("A Trade referral prompt is not appears after finalising the cart.")
    }    
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
   AppLoginLogout.logout(); 
}
