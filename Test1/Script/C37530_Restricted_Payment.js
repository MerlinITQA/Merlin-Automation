//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT POSObjectMapping

function C37530_Restricted_Payment()
{
try {
    Log.AppendFolder("C37530_Restricted_Payment");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var keyWordNm ="Groups";
    var packageNm = "Invoice payment only";
    var subPakNm="Adult";
    var qty = 10; 
    var dateD = CommonCalender.getTodaysDate();
    var givenPaymentType = "Invoice";
       
    OrderInfo.prototype.OrderID = 0;
    WrapperFunction.selectKeywordName(keyWordNm);
    SelectQuantityFromHeader.selectQuantity(qty);     
     aqUtils.Delay(2000); 
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(3000);  
     if(datetimeformSubWindow.Exists){ 
      selectDateFromSubWindow(dateD);  
      selectNextButtonFromSubWindow();
    } 
    finilizeOrder();
    aqUtils.Delay(2000); 
    
    Log.Message("Verified order details on settlement page");
    selectPaymentTypeDropDown.Click();
    var cnt = Aliases.Passport_POS.wndApolloRuntimeContentWindow.groupDropdown.scroller.datagroup.ChildCount;
     if(cnt == 1){ 
          Invoice_Ordernumber.Keys("12345678");   
          Invoice_Organization.Keys("SQS");
          var settlementTotal =orderDetailsTotal.Caption;
          applyAmount= aqString.Replace(settlementTotal,"$",""); 
          OrderInfo.prototype.OrderTotalAmount = applyAmount.trim();
          Log.Message("Order total amount is set:",OrderInfo.prototype.OrderTotalAmount);        
          WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
          Button.clickOnButton(applyButton);   
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
          var OrderID= (orderId.split('#')[1]).trim();
          OrderInfo.prototype.OrderID = OrderID;
          Log.Message("Order id is set:"+OrderID);     
     }
     else{
        merlinLogError("The restricted payment type is displayed wrong ption in the drop-down menu");
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
 