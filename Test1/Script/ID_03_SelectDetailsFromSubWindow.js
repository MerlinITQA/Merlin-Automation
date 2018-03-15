//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT POSObjectMapping
//USEUNIT SelectPackageAndSubPackage
//USEUNIT SelectQuantityFromHeader
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction

//Application Login & Logout functioonality
  
function SelectDetailsFromSubWindow()
{
     // InitializationEnviornment.initiliaze();
//      AppLoginLogout.login();
      WrapperFunction.selectKeyword("Daily Admission");
//      selectQuantity(31);
//      selectPackage("Open Dated","Under 3");
//      selectPackage("Open Dated","Adult");
//      selectPackage("Open Dated","Children (Ages 3-12)");
//      selectPackage("3 site Combi","Adult");
      selectPackage("3 site Combi","Children (Ages 3-12)");
      selectSubPackagesFromWindowInit()
      AppLoginLogout.logout();  
}