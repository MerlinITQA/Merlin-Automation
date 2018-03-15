//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment 

function _0001485874479932_Directory_Menu_No_Sale_Cash_draw_opens_on_till()
{  
try{
      Log.AppendFolder("_0001485874479932_Directory_Menu_No_Sale_Cash_draw_opens_on_till");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();  
      Button.clickOnButton(selectDirectoryButton); 
        if(Directory_NoSale.Visible){
          Log.Message("User clicks on Directory No Sale Button.");
          Button.clickOnButton(Directory_NoSale);
        } 
      else{
         merlinLogError("Directory NoSale is not present.");
      }   
      AppLoginLogout.logout();   
   } catch (e) {
  	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
      }
      finally { 
  	    Log.PopLogFolder();
      } 
}

