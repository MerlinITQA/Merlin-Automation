﻿//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT WrapperFunction
//USEUNIT SelectQuantityFromHeader
//USEUNIT PlaceReservationOrder

function C43148_Promo_Codes_gets_applied_properly()
{
  Log.AppendFolder("C43148_Promo_Codes_gets_applied_properly");
  InitializationEnviornment.initiliaze(); 
  AppLoginLogout.login(); 
  try{
      aqUtils.Delay(1000);
       
      if(textinputPromocodeinput.Exists && textinputPromocodeinput.Visible){
          Log.Message("Promo Code field is enabled.");
          //lower case    
          WrapperFunction.setTextValue(textinputPromocodeinput,"test");
          aqUtils.Delay(500);
          Button.clickOnButton(selectablebuttonSearchbutton);
          aqUtils.Delay(5000);
           Keyword_Listgroup.Refresh();
           Keyword_Listgroup.Refresh();
           aqUtils.Delay(3000);
          var cnt = Keyword_Listgroup.ChildCount;
          if(cnt == 2){
              Log.Message("Only Promocode packages are displayed.");
          }else{
              merlinLogError("Only promocode packages are not displayed.");
          }          
          testPromoCodeCloseImg.Click();
          aqUtils.Delay(5000);
          Keyword_Listgroup.Refresh();
          aqUtils.Delay(3000);
          cnt = Keyword_Listgroup.ChildCount;
          if(cnt > 2){
            Log.Message("Promocode packages are Cleared.");
          }else{
              merlinLogError("Promocode packages are displayed.");
          } 
          //UPPER CASE
          WrapperFunction.setTextValue(textinputPromocodeinput,"TEST");
          aqUtils.Delay(500);
          Button.clickOnButton(selectablebuttonSearchbutton);
          aqUtils.Delay(5000);
           Keyword_Listgroup.Refresh();
           Keyword_Listgroup.Refresh();
           aqUtils.Delay(3000);
          var cnt = Keyword_Listgroup.ChildCount;
          if(cnt == 2){
              Log.Message("Only Promocode packages are displayed.");
          }else{
              merlinLogError("Only promocode packages are not displayed.");
          }          
          
          
          
      }
      else{
          merlinLogError("Promo Code field is greyed out.")
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
 