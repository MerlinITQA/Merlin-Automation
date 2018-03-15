//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder

function C15985_Purchase_Complimentary_Package()
{ 
try{
      Log.AppendFolder("C15985_Purchase_Complimentary_Package");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();   
    WrapperFunction.selectKeywordName("Complimentary");
    selectPackage("MMW","Individual");  
    finilizeOrder();
    aqUtils.Delay(2000); 
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(2000);
    validateTicket("Don't Validate");
    Log.Message("Don't Validate the order");  
    var orderId = cnf_orderID1.Caption;
    if (orderId == null){
      merlinLogError("Order id is not present");
    }     
    AppLoginLogout.logout(); 
    } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    } 
}