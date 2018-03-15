//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType
//Application Login & Logout functioonality
  
function _001485874439036_PurchaseTicket_Cash()
{
try{
 
    WrapperFunction.selectKeyword("Reservations");
    selectPackage("No Payment Required Reservation Shared Capacity 2","Individual");
    aqUtils.Delay(5000);
   
   // We are giving package name incorrect intentionally
   WrapperFunction.selectKeyword("Annual Pass");
   //selectPackage("3 site Combi","Adult");
   AppLoginLogout.logout();
}

catch(e)
{
 merlinLogError("Exception occured");
 //Runner.Stop();
}
}
 