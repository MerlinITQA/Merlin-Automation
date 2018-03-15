//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT POSObjectMapping

function C37509_New_order_Button_Repeated()
{
try {
    Log.AppendFolder("C37509_New_order_Button_Repeated");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var keyWordNm ="Daily Admission";
    var packageNm = "Date/Time";
    var subPakNm="Adult";
    var qty = 2; 
    var dateD = CommonCalender.getTodaysDate();
    var givenPaymentType = "Cash";
       
    placeOrder(keyWordNm,packageNm,subPakNm,qty,dateD,givenPaymentType);    
    Button.clickOnButton(NewOrder_Button);
    aqUtils.Delay(2000);
    if(NewOrder_Button.Exists && NewOrder_Button.VisibleOnScreen){
      Button.clickOnButton(NewOrder_Button);
    }
      
    if(Keyword_Listgroup.VisibleOnScreen){
    Log.Message("POS navigates to and remains on the Point of Sale screen after clicking on New Order button");
    }else{
    merlinLogError("POS is not navigated to the Point of Sale screen after clicking on New Order button");
    }
    placeOrder(keyWordNm,packageNm,subPakNm,qty,dateD,givenPaymentType);
    if(NewOrder_Button.VisibleOnScreen){
      Log.Message("Second order is placed.");
    }else{
      merlinLogError("Second order is not placed.");
    }
    AppLoginLogout.logout(); 
    } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }   
  
}
 