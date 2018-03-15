//USEUNIT AppLoginLogout
//USEUNIT Button
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectPackageAndSubPackage
//USEUNIT SelectQuantityFromHeader

// Select package and subpackageFunctionality
function SelectPackage()
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
