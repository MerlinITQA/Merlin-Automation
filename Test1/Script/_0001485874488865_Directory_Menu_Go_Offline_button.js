//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT SupportManagerFunctions
//USEUNIT SelectQuantityFromHeader

function _0001485874488865_Directory_Menu_Go_Offline_button()
{
try{
      Log.AppendFolder("_0001485874488865_Directory_Menu_Go_Offline_button");
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
  aqUtils.Delay(3000);
  Button.clickOnButton(selectDirectoryButton); 
  Button.clickOnButton(Directory_GoOffline);   
  aqUtils.Delay(3000);
  Button.clickOnButton(selectDirectoryButton); 
  if(slidetoggleOfflineslidetoggle.FlexObject.active)
  {
     Log.Message("POS is in offline mode.");
  }
  else{
      merlinLogError("POS is not in offline mode.");
      return;
  }
  Button.clickOnButton(selectDirectoryButton); 
   aqUtils.Delay(3000);
    WrapperFunction.selectKeyword("Daily Admission"); 
    SelectQuantityFromHeader.selectQuantity(2);	
    selectPackage("Date/Time","Children (Ages 3-12)");
     aqUtils.Delay(2000);
    if(finilizeOrder_button.Enabled){ 
       merlinLogError("POS is not in offline mode.");
    } 
    aqUtils.Delay(1000);
      WrapperFunction.selectKeyword("Daily Admission");    
    selectPackage("Open Dated","Children (Ages 3-12)");
     aqUtils.Delay(2000);
     if(!finilizeOrder_button.Enabled){ 
       merlinLogError("POS is not in offline mode.");
    } 
//  var yellowRect = passportPOS.FlexObject._PassportPOS_Rect1.Visible;
//  var offlineImage = Sys.Process("Passport POS").Window("ApolloRuntimeContentWindow", "accesso Passport POS", 1).PassportPOS(0).Group(0).Group("contentGroup").MainView(0).BottomControlBar("bottomControlBar").Group(0).HGroup(1).GraphicIcons(2).FlexObject.selectedIcon;
//  if(offlineImage == 18 && yellowRect){
//      Log.Message("System offline image and Yellow rectangal is displayed.");
//       var cnt = Keyword_Listgroup.ItemCount;
//        Keyword_Listgroup.ClickItem(1,0); 
//        Keyword_Listgroup.ClickItem(5,0); 
//        Keyword_Listgroup.ClickItem(6,0); 
//        Keyword_Listgroup.ClickItem(15,0);   
//  }
//  else{
//    merlinLogError("System offline image or Yellow rectangal is not visible");
//  }
//  Button.clickOnButton(selectDirectoryButton);
//  Button.clickOnButton(Directory_GoOffline);   
  aqUtils.Delay(2000);
  Button.clickOnButton(selectDirectoryButton); 
   aqUtils.Delay(1000);
  Button.clickOnButton(Directory_GoOffline); 
   aqUtils.Delay(5000);
  AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    }    
}