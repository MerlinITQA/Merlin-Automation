//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction

function C37524_PE_Access_to_POS_Home_menues()
{

try {
    Log.AppendFolder("C37524_PE_Access_to_POS_Home_menues");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    selectMainMenu(Exchange_MainMenu); 
    aqUtils.Delay(17000);
    if(pageExchange.Exists && pageExchange.Visible){    
        if(pageExchangebuttonCancel.Visible && pageExchangebuttonNext.Visible ){
            Log.Message("Page exchange next and cancel buttons are displayed.");
        }else{
            merlinLogError("Page exchange buttons are not displayed on window.");
        }
      }else{
        merlinLogError("Page exchange window is not displayed.");
        
    }
    Button.clickOnButton(homeButton);
    if(PointOfSale_MainMenu.Exists && PointOfSale_MainMenu.VisibleOnScreen
       && Groups_MainMenu.Exists && Groups_MainMenu.VisibleOnScreen
        && SupportManger_MainMenu.Exists && SupportManger_MainMenu.VisibleOnScreen
        && PassProcessing_MainMenu.Exists && PassProcessing_MainMenu.VisibleOnScreen
        && Exchange_MainMenu.Exists && Exchange_MainMenu.VisibleOnScreen){
            Log.Message("All options in the Home menu are available.");
        }else{
            merlinLogError("All options in the Home menu are not available.");
        }
    Label.clickOnLabel(PointOfSale_MainMenu);
    aqUtils.Delay(10000);
    if(Keyword_Listgroup.Exists && Keyword_Listgroup.VisibleOnScreen
       && finilizeOrder_button.Exists && finilizeOrder_button.VisibleOnScreen
         ){
            Log.Message("Point of sale screen displayed.");
        }else{
            merlinLogError("Point of sale screen is not displayed.");
        }
    selectMainMenu(Exchange_MainMenu); 
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
    Button.clickOnButton(homeButton);
    Label.clickOnLabel(Groups_MainMenu);
    aqUtils.Delay(10000);
      if(
        groupsNameti.Exists && groupsNameti.VisibleOnScreen
        && groupsSerarchButton.Exists && groupsSerarchButton.VisibleOnScreen
        ){
            Log.Message("Group Search screen displayed.");
        }else{
            merlinLogError("Group Search screen is not displayed.");
        }
     Button.clickOnButton(homeButton);
     Label.clickOnLabel(SupportManger_MainMenu);
     aqUtils.Delay(15000);
     if(newOrdersearchpanelOrderSearch.Exists && newOrdersearchpanelOrderSearch.VisibleOnScreen    
        ){
            Log.Message("Support Manager screen displayed.");
            Button.clickOnButton(newCancelButton);
        }else{
            merlinLogError("Support Manager screen is not displayed.");
        }
     Button.clickOnButton(homeButton);
     Label.clickOnLabel(PassProcessing_MainMenu);
     aqUtils.Delay(10000);
     if( PassHolderSearch_TicketID.Exists && PassHolderSearch_TicketID.VisibleOnScreen    
        ){
            Log.Message("PassProcessing search screen displayed.");
            
        }else{
            merlinLogError("PassProcessing search is not displayed.");
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
 