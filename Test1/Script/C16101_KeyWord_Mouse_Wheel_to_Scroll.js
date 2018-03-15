//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectDirectory
//USEUNIT SelectGroupFromMainMenu
//USEUNIT POSObjectMapping

function C16101_KeyWord_Mouse_Wheel_to_Scroll()
{  
try{
      Log.AppendFolder("C16101_KeyWord_Mouse_Wheel_to_Scroll");
  InitializationEnviornment.initiliaze();
   AppLoginLogout.login();
 passportPOS.listListgroup.Refresh();
  aqUtils.Delay(1000);
  var keyWordName ="Trade";
  WrapperFunction.selectKeywordName(keyWordName);
  passportPOS.listListgroup.Refresh();
  aqUtils.Delay(1000);
   keyWordName ="Reservations";
  WrapperFunction.selectKeywordName(keyWordName);
  passportPOS.listListgroup.Refresh();
  aqUtils.Delay(1000);
   keyWordName ="Taxes and Fees";
  WrapperFunction.selectKeywordName(keyWordName);
//  var wnd = Aliases.Passport_POS.wndApolloRuntimeContentWindow;
//  var passportPOS = wnd.passportposPassportpos1;
//  var Keyword_Listgroup =passportPOS.Keyword_Listgroup;
//  var allItemCnt = Keyword_Listgroup.ItemCount;
//  temp = Keyword_Listgroup.FindAllChildren("Visible","True" ,1, true);
//  var visibleItemCnt = temp.length;
//  var counter = allItemCnt - visibleItemCnt; 
//  cnt = Keyword_Listgroup.ChildCount;
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
//    Log.Message("--"+counter);
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
    }
    finally { 
	    Log.PopLogFolder();
    } 
}