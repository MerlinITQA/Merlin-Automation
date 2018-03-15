//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT PlaceOrder

function _0001485874507346_Offline_mode_The_Go_Online_button_is_disabled()
{
try{
      Log.AppendFolder("_0001485874507346_Offline_mode_The_Go_Online_button_is_disabled");
  InitializationEnviornment.initiliaze(); 
  AppLoginLogout.login();
  Button.clickOnButton(selectDirectoryButton); 
  Button.clickOnButton(Directory_GoOffline);
   
   aqUtils.Delay(2000);
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
     if(finilizeOrder_button.Enabled){ 
     Button.clickOnButton(confirmationbuttonClearbtn);
     aqUtils.Delay(1000);
     
     }else{
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
  Button.clickOnButton(selectDirectoryButton); 
  Button.clickOnButton(Directory_GoOffline); 
  aqUtils.Delay(2000);     
  WrapperFunction.selectKeyword("Daily Admission");  
  SelectQuantityFromHeader.selectQuantity(2);	  
    selectPackage("Date/Time","Children (Ages 3-12)");
     aqUtils.Delay(2000);
     if(datetimeformSubWindow.Exists){   
      selectDateFromSubWindow(dateD); //mm-dd-yyyy      
      selectNextButtonFromSubWindow();
      aqUtils.Delay(2000);        
      Button.clickOnButton(selectablebuttonClosebutton);
   }    
    if(finilizeOrder_button.Enabled){
      Log.Message("POS is in online mode."); 
    }else{
       merlinLogError("POS is not in online mode.");
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