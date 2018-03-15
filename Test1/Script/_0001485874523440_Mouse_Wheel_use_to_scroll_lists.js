//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectDirectory
//USEUNIT SelectGroupFromMainMenu
//USEUNIT POSObjectMapping

function _0001485874523440_Mouse_Wheel_use_to_scroll_lists()
{  
try{
   Log.AppendFolder("_0001485874523440_Mouse_Wheel_use_to_scroll_lists");
   InitializationEnviornment.initiliaze();
   AppLoginLogout.login();
//  var wnd = Aliases.Passport_POS.wndApolloRuntimeContentWindow;
//  var passportPOS = wnd.passportposPassportpos1;
//  var Keyword_Listgroup =passportPOS.Keyword_Listgroup;
//  var allItemCnt = Keyword_Listgroup.ItemCount;
//   temp = Keyword_Listgroup.FindAllChildren("Visible","True" ,1, true);
//  var visibleItemCnt = temp.length;
//  var counter = allItemCnt - visibleItemCnt; 
// cnt = Keyword_Listgroup.ChildCount;
   var keywordStr = "Taxes and Fees"
 
   if(Keyword_Listgroup.ListItem("Show more").Exists && Keyword_Listgroup.ListItem("Show more").VisibleOnScreen){
      Keyword_Listgroup.ListItem("Show more").Click();
     }
   function isKeywordSelectable() {
        Keyword_Listgroup.Refresh();
        keywordTCObject =
            Keyword_Listgroup.FindChild("Caption", keywordStr);
        var selectable =
            keywordTCObject.Exists &&
            (groupClosekeywordgrp.ScreenTop -
                keywordTCObject.ScreenTop) > 49;      
        return selectable;
    };
    var keywordIsSelectable = isKeywordSelectable();
    for (
        let previousScrollPosition = -1;
        !keywordIsSelectable &&
        !equal(previousScrollPosition,
            Keyword_Listgroup.FlexObject.dataGroup.verticalScrollPosition
        );
    ) {
        previousScrollPosition =
            Keyword_Listgroup.FlexObject.dataGroup.verticalScrollPosition;
        Keyword_Listgroup.MouseWheel(-1);
        keywordIsSelectable = isKeywordSelectable();
    }
    var results = keywordIsSelectable ? (
        Log.Message(
            "Keyword found.",
            "",
            pmNormal,
            null,
            keywordTCObject
        ),
        keywordTCObject.Click(),
        true
    ) : (
        Log.Warning("Unable to find keyword!"),
        false
    );    
    if(results ){        
        Log.Message("Scroll functionality is working correctly.");       
      }else{
        Log.Message("Scroll functionality is not working correctly.");     
      }    
//  flag = false;    
//  while(!flag){
//    if (counter == 0){
//      flag = true;
//      merlinLogError("Scroll is not working correctly.");
//      break;
//    }
//    counter -- ;     
//    Keyword_Listgroup.MouseWheel(-1);
//    Keyword_Listgroup.Refresh();
//    Log.Message("--",counter);
//    cnt = Keyword_Listgroup.ChildCount;
//     for(let i = 0 ; i < cnt ; i++){
//      if((Keyword_Listgroup.Child(i).Visible)&&(Keyword_Listgroup.Child(i).Caption == "Promo Codes")){
//        Keyword_Listgroup.MouseWheel(-1);
//        flag = true;
//        Log.Message("Scroll functionality working correctly.");
//        break;
//      }
//     } 
//  } 
  AppLoginLogout.logout();  
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();      
    }   
}