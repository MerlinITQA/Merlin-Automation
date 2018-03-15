//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT POSObjectMapping

function C17359_Open_Dated_Tickets_Ensure_that_a_date_is_Not_added()
{ 
  InitializationEnviornment.initiliaze(); 
  AppLoginLogout.login();
  var keyWordNm ="Daily Admission";
  var packageNm = "Open Dated - prefix";
  var subPakNm ="Children (Ages 3-12)";
  
  var packageNm1 = "Date/Time";      
  var subPakNm1 = "Children (Ages 3-12)";  
  var dateD = CommonCalender.getTodaysDate();
  
   try {
    Log.AppendFolder("C17359_Open_Dated_Tickets_Ensure_that_a_date_is_Not_added");
    WrapperFunction.selectKeywordName(keyWordNm);    
    selectPackage(packageNm,subPakNm); 
    aqUtils.Delay(3000);
    SelectQuantityFromHeader.selectQuantity(2);
    selectPackage(packageNm1,subPakNm1);
     if(datetimeformSubWindow.Exists){   
      selectDateFromSubWindow(dateD); //mm-dd-yyyy 
      selectNextButtonFromSubWindow();      
    } 
    cartaddedItemList.Refresh();
    aqUtils.Delay(3000);
    cartaddedItemList.Refresh();
    aqUtils.Delay(1000);
    var firstPackageText = cartaddedItemList.Child(0).VGroup("cartVGroup").List("ratesList").ListItem("[object CartItemRateRendererData]").HGroup(0).HGroup("cartItemRateGrp").Group(0).Label("rateNameLabel").Caption;
    var secondPackageText = cartaddedItemList.Child(1).VGroup("cartVGroup").List("ratesList").ListItem("[object CartItemRateRendererData]").HGroup(0).HGroup("cartItemRateGrp").Group(0).Label("rateNameLabel").Caption;
   
    if(aqString.StrMatches(dateD, secondPackageText)){
      merlinLogError("Date exists on the ticket in the cart.");
    }
    
    if(!aqString.StrMatches(dateD, firstPackageText)){
      merlinLogError("Date is not exists on the ticket in the cart.");
    }
     
   // VerifyCheckProperty.compareStringObj(firstPackageText,packageNm);
    //VerifyCheckProperty.compareStringObj(secondPackageText,packageNm1); 
    finilizeOrder();
    aqUtils.Delay(2000);   
    var settlementTotal =orderDetailsTotal.Caption;
    Log.Message("Verified order details on settlement page");    
    CashButton.Click();    
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
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
  AppLoginLogout.logout(); 
}