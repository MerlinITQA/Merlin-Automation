//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType

  
function _0001485874452727_25_LoginErrorValidation()
{
Log.AppendFolder("_0001485874452727_25_LoginErrorValidation");
try{
        InitializationEnviornment.initiliaze();
        AppLoginLogout.invalidloginCheck();
     
}

catch(e)
{
       merlinLogError("Exception in Test script");
       //Runner.Stop();
}
}
 