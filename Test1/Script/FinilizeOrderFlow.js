//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT AppLoginLogout
//USEUNIT POSObjectMapping
//USEUNIT WrapperFunction
//USEUNIT SelectQuantityFromHeader
//USEUNIT SelectPackageAndSubPackage
//USEUNIT SelectSubPackagesFromWindow

//Application Login & Logout functioonality
  
function LoginLogOut()
{
     // InitializationEnviornment.initiliaze();
//      AppLoginLogout.login();
//      WrapperFunction.selectKeyword("Daily Admission");
//      selectPackage("3 site Combi","Children (Ages 3-12)");
//      selectSubPackagesFromWindowInit();
     // Button.click(finilizeOrder);
     var app =  TestedApps.Items(0);
var wnd = Aliases.Passport_POS.wndApolloRuntimeContentWindow;
var passportPOS = wnd.passportposPassportpos1;
 
        var amount = passportPOS.TotalBalanceLabel_orderDetails.label2095.Caption;
      Log.Message("Updated by Mahesh");
      AppLoginLogout.logout();  
}