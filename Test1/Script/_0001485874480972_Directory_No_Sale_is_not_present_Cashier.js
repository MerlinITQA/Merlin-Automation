//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment 

function _0001485874480972_Directory_No_Sale_is_not_present_Cashier()
{ 
try{
      Log.AppendFolder("_0001485874480972_Directory_No_Sale_is_not_present_Cashier"); 
      InitializationEnviornment.initiliaze();
      AppLoginLogout.loginCashier();  
      Button.clickOnButton(selectDirectoryButton); 
      if(Directory_NoSale.Child(0).ChildCount == 1 ){
          Log.Message("The Directory Menu does NOT contain a No Sale option in Cashier credentials.");      
        } 
      else{
         merlinLogError("The Directory Menu is contains a No Sale option in Cashier credentials.");
      }   
      AppLoginLogout.logout();  
   } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
}

