//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT POSObjectMapping
//USEUNIT ConvertReservationsToPurchase

function C37510_Payment_Types_Credit_Card_required_fields_Street_address()
{
try {
    Log.AppendFolder("C37510_Payment_Types_Credit_Card_required_fields_Street_address");
     InitializationEnviornment.initiliaze();
     AppLoginLogout.login();
    var keyWordNm ="Daily Admission";
    var packageNm = "Date/Time";
    var subPakNm="Adult";
    var qty = 2; 
    var dateD = CommonCalender.getTodaysDate();
    var givenPaymentType = "Credit Card";
    
    WrapperFunction.selectKeywordName(keyWordNm);
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(3000);       
     if(datetimeformSubWindow.Exists){
      selectDateFromSubWindow(dateD);   
      selectNextButtonFromSubWindow();
    }
    finilizeOrder();
    aqUtils.Delay(2000);
    
    var settlementTotal =orderDetailsTotal.Caption;
    applyAmount= aqString.Replace(settlementTotal,"$",""); 
    OrderInfo.prototype.OrderTotalAmount = applyAmount.trim();
    ConvertReservationsToPurchase.selectPaymentType(givenPaymentType);
          Button.clickOnButton(CC_EnterNumber);
          SelectPaymentType.enterCCNumber("4444333322221111");
          CC_ExpirationMonth.ClickItem("05 - May");
          CC_ExpirationYear.Keys("[Down][Down][Down]");
          
     Button.clickOnButton(applyBalance);
    
    Log.Message("Order total amount is set:",OrderInfo.prototype.OrderTotalAmount);        
     if(!streetAddErrorindicator.Exists){
        merlinLogError("Street Address error indicator is not displayed");
        return;
     }
     CC_StreetAddress.Keys("Pune");
     CC_ZipCode.Keys("90210");
     
      Button.clickOnButton(applyBalance);
//     var cardLastDigit = paymentListFirstItem.PaymentListItem("payItem").Label("descLabel").Caption;
//     if( !VerifyCheckProperty.compareStringObj(cardLastDigit,"Visa 1111")){
//        merlinLogError("Credit Card last digit is not displayed in applied amount.");
//        return;
//     }
     var correctcardLastDigit = false;
      var cnt = paymentListFirstItem.PaymentListItem("payItem").HGroup(0).ChildCount;
      for( j = 0; j<cnt;j++){
        lbl= paymentListFirstItem.PaymentListItem("payItem").HGroup(0).Child(j).Caption;
        if(lbl.startsWith("Visa 1111")){
            correctcardLastDigit = true;      
        }
      }      
      if(correctcardLastDigit){
            Log.Message("Credit Card last digit is correctly displayed in applied amount.");
            return;       
        }else{
            merlinLogError("Credit Card last digit is not displayed in applied amount.");
            return; 
        }
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(3000);
    validateTicket("Don't Validate");
    Log.Message("Don't Validate the order"); 
    verifyTotalOnConfirmationPage(settlementTotal);
    var orderId = cnf_orderID1.Caption;
    if (orderId == null){
      merlinLogError("Order id is not present");
      return;
    } 
    var OrderID= (orderId.split('#')[1]).trim();
    OrderInfo.prototype.OrderID = OrderID;
    Log.Message("Order id is set:"+OrderID); 
    
    } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
      AppLoginLogout.logout(); 
	    Log.PopLogFolder();
    }   
  
}
 
    