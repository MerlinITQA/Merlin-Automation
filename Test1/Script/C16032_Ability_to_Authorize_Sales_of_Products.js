//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT WrapperFunction

function C16032_Ability_to_Authorize_Sales_of_Products()
{
try{
      Log.AppendFolder("C16032_Ability_to_Authorize_Sales_of_Products");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();   
    var keyWordNm ="Daily Admission";
    var packageNm ="Date/Time";
    var subPakNm ="Children (Ages 3-12)";
    var qtyT = 2;          
    var keyWordNm1 ="Daily Admission";
    var packageNm1 ="Dated";
    var subPakNm1 ="Adult";
    var qtyT1 = 1;  
    addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,CommonCalender.getTodaysDate());     
    addNewTicket(keyWordNm1,packageNm1,subPakNm1,qtyT1,CommonCalender.getTodaysDate());   
    finilizeOrder();
    aqUtils.Delay(3000);
    var expectedSettlemtnttotal = orderDetailsTotal.Caption;
    var applyAmount= (expectedSettlemtnttotal.split('$')[1]).trim(); 
    CashButton.Click();       
     if(applyAmount != 0){
      Log.Message("Apply amount");
      WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
      Button.clickOnButton(applyButton); 
      }
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(2000);
    validateTicket("Don't Validate");
    Log.Message("Don't Validate the order"); 
    verifyTotalOnConfirmationPage(expectedSettlemtnttotal);
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