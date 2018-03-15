//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment  
//USEUNIT WrapperFunction

function C17268_Passport_Exchange_opens_within_the_POS()
{
   InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
   try {
    	Log.AppendFolder("C17268_Passport_Exchange_opens_within_the_POS");
      WrapperFunction.selectMainMenu(Exchange_MainMenu);        
      aqUtils.Delay(10000);
      if(Sys.WaitBrowser().Exists)
      {
        merlinLogError("Browser is opened.")
      }
      if(pageExchange.Exists && pageExchange.Visible){
        if(pageExchangebuttonCancel.Visible && pageExchangebuttonNext.Visible ){
            Log.Message("Page exchange next and cancel buttons are displayed.");
             pageExchangebuttonNext.ClickButton();            
             aqUtils.Delay(5000);
             if(!textnodeMerlinQa.Visible){
              merlinLogError("User name is not displayed.")
             }
             textnodeMenuStore.Click(1,1,0);
             aqUtils.Delay(1000);
             if(panelStoreViewNgScope.Visible){
              Log.Message("Store tab options are displayed.")
             }else{
                merlinLogError("Store tab options are not displayed.")
             }
             textnodeMenuRefunds.Click(1,1,0);
             aqUtils.Delay(1000);
             if(panelReturnsPropertiesView.Visible && panelRefundDetails.Visible){
              Log.Message("clicked on Refund tab.")
             }else{
              merlinLogError("Refund menu tab options are not displayed.");
             }
            textnodeMenuReports.Click(1,1,0);
            aqUtils.Delay(1000);
            if(panelModalContentForReport.Visible){
                buttonOkReport.ClickButton();
            }
            else{
              merlinLogError("Report tab message is not displayed.");
            } 
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
}