//USEUNIT InitializationEnviornment
//USEUNIT Process 
//USEUNIT AppLoginLogout
function _0001485874502442_POS_screen_launches_maximised()
{
  
  try {   
    Log.AppendFolder("_0001485874502442_POS_screen_launches_maximised");
     InitializationEnviornment.initiliaze(); 
     AppLoginLogout.login(); 
     var width = wnd.Width ; //1382
     var height = wnd.Height; // 742
    if(width >=1296 && height >= 742)
    {
      Log.Message("The POS launches with the maximum screen size by default.");
     }else  {
      merlinLogError("The POS IS NOT launches with the maximum screen size by default.");
    }    
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
      AppLoginLogout.logout();
    }       
}
