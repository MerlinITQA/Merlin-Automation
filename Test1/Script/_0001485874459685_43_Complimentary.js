//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT WrapperFunction
//USEUNIT SelectPaymentType

  
function _0001485874459685_43_Complimentary()
{
 Log.AppendFolder("_0001485874459685_43_Complimentary");
try{
        InitializationEnviornment.initiliaze();
         AppLoginLogout.login();
        WrapperFunction.selectKeyword("Complimentary");
        selectPackage("MMW","Individual");
		aqUtils.Delay(2000);
        WrapperFunction.finilizeOrder()
        WrapperFunction.settlementCompleteOrder();
        validateTicket("Validate All");
        Button.clickOnButton(NewOrder_Button);
        AppLoginLogout.logout(); 
        
}

catch(e)
{
 merlinLogError("Exception occured");
 //Runner.Stop();
}
}
 