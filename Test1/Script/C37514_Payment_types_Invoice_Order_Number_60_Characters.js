//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT POSObjectMapping
//USEUNIT ConvertReservationsToPurchase
function C37514_Payment_types_Invoice_Order_Number_60_Characters()
{
try {
    Log.AppendFolder("C37514_Payment_types_Invoice_Order_Number_60_Characters");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var keyWordNm ="Daily Admission";
    var packageNm = "Date/Time";
    var subPakNm="Adult";
    var qty = 2; 
    var dateD = CommonCalender.getTodaysDate();
    var givenPaymentType = "Invoice";
    WrapperFunction.selectKeywordName(keyWordNm);
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(3000);       
     if(datetimeformSubWindow.Exists){
      selectQuantityFromSubWindow(qty);
      selectSubPackageFromSubWindow(subPakNm);   
      selectDateFromSubWindow(dateD); //mm-dd-yyyy  
      selectNextButtonFromSubWindow();
    }else{
      if(qty > 1){
        SelectQuantityFromHeader.selectQuantity(qty);
        selectPackage(packageNm,subPakNm);
        aqUtils.Delay(2000);
      }    
    }
    finilizeOrder();
    aqUtils.Delay(2000);  
    var settlementTotal =orderDetailsTotal.Caption;
    Log.Message("Verified order details on settlement page");
    ConvertReservationsToPurchase.selectPaymentType(givenPaymentType);
    Invoice_Ordernumber.Keys("1234567891123456789112345678911234567891123456789112345678915555555");     
    var InputString = Invoice_Ordernumber.Caption;
    var len = aqString.GetLength(InputString)
    aqUtils.Delay(2000);
     if(len > 60){
      merlinLogError("Order number is Greater than 60 characters.");
      return;
     }
     Invoice_Organization.Keys("SQS");
     applyAmount= aqString.Replace(settlementTotal,"$",""); 
     OrderInfo.prototype.OrderTotalAmount = applyAmount.trim();
     Log.Message("Order total amount is set:",OrderInfo.prototype.OrderTotalAmount);        
     Button.clickOnButton(applyBalance);
     Log.Message("Complete the order");
     WrapperFunction.settlementCompleteOrder();
     aqUtils.Delay(2000);
     validateTicket("Don't Validate");
     Log.Message("Don't Validate the order"); 
     verifyTotalOnConfirmationPage(settlementTotal);
      if(Cnflabel_InvoicePaymentType.Exists && Cnflabel_InvoicePaymentType.VisibleOnScreen){
        Log.Message("Confirmation screen displays correctly showing invoice as payment");
      }else{
        merlinLogError("Confirmation screen is not displayed invoice as payment type");
        return;
      }      
    var orderId = cnf_orderID1.Caption;
    if (orderId == null){
      merlinLogError("Order id is not present");
    } 
    var OrderID= (orderId.split('#')[1]).trim();
    OrderInfo.prototype.OrderID = OrderID;
    Log.Message("Order id is set:"+OrderID); 
    
    AppLoginLogout.logout(); 
    } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }   
  
}
 