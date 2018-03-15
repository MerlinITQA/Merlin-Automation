//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT SelectDirectory 

function C15955_Text_wrapping_occurs_on_the_Home_menu()
{ 
  try {   
  	  Log.AppendFolder("C15955_Text_wrapping_occurs_on_the_Home_menu");
      InitializationEnviornment.initiliaze();
       AppLoginLogout.login();
      homeButton.Click();
      
     if( SupportManger_MainMenu.VGroup(0).Label("moduleLabel").FlexObject.measuredHeight ==13 &&
      SupportManger_MainMenu.VGroup(0).Label("moduleLabel").FlexObject.measuredWidth == 98){
        Log.Message("Text This is to test the text wrapping on the home menu is wraped correctly.")
      }else{
        merlinLogError("Text is not is wraped correctly.")
      }
    }catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
    AppLoginLogout.logout(); 
}
 