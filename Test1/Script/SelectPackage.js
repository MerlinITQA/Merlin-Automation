//USEUNIT AppLoginLogout
//USEUNIT Listbox
//USEUNIT InitializationEnviornment
//USEUNIT AppLoginLogout
//USEUNIT POSObjectMapping
//USEUNIT Button
//USEUNIT SelectQuantityFromHeader
//USEUNIT SelectPackageAndSubPackage

var wnd = Aliases.Passport_POS.wndApolloRuntimeContentWindow
var passportPOS = wnd.passPortApp;
function LoginLogOut()
{
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      Listbox.SelectListboxItems("Daily Admission");
      selectQuantity(31);
      selectPackage("Open Dated","Under 3");
      selectPackage("Open Dated","Adult");
      selectPackage("Open Dated","Children (Ages 3-12)");
      AppLoginLogout.logout();
}
