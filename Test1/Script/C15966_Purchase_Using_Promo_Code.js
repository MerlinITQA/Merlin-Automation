//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder

function C15966_Purchase_Using_Promo_Code()
{ 
try{
      Log.AppendFolder("C15966_Purchase_Using_Promo_Code");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();   
    var keyWordNm ="Promo Codes";
    var packageNm = "Trade Group (RateV1)";
    var subPakNm ="Individual";    
    var qty =1;
    var dateD = CommonCalender.getTodaysDate();
    var givenPaymentType ="Cash";
     
    Log.AppendFolder("C15985_Purchase_Complimentary_Package");
    OrderInfo.prototype.OrderID = 0;
    //WrapperFunction.selectKeywordName(keyWordNm);    
    //WrapperFunction.setTextValue(PromoCodes_EnterPromoCodes,"RateV1");
    WrapperFunction.setTextValue(textinputPromocodeinput,"RateV1");
    Button.clickOnButton(selectablebuttonSearchbutton);
    
   // PromoCodes_EnterPromoCodes.Keys("[Enter]");
     aqUtils.Delay(3000); 
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(3000);       
     if(datetimeformSubWindow.Exists){
      selectDateFromSubWindow(dateD); //mm-dd-yyyy  
      selectNextButtonFromSubWindow();
    }else{
      if(qty > 1){
        SelectQuantityFromHeader.selectQuantity(qty);
        selectPackage(packageNm,subPakNm);
        aqUtils.Delay(2000);
      }    
    }
    aqUtils.Delay(3000);  
    finilizeOrder();
    aqUtils.Delay(2000);   
    var settlementTotal =orderDetailsTotal.Caption;
    Log.Message("Verified order details on settlement page");
    CashButton.Click();
    applyAmount= aqString.Replace(settlementTotal,"$",""); 
    OrderInfo.prototype.OrderTotalAmount = applyAmount.trim();
    Log.Message("Order total amount is set:",OrderInfo.prototype.OrderTotalAmount);        
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
    verifyTotalOnConfirmationPage(settlementTotal);     
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