//USEUNIT POSObjectMapping




function getKeyword(ItemName)
{
  var app =  TestedApps.Items(0);
  wnd = Aliases.Passport_POS.wndApolloRuntimeContentWindow;
  var passportPOS = wnd.passportposPassportpos1;
  
  var KeyWordList = passportPOS.listListgroup;
  return KeyWordList;
 }
 