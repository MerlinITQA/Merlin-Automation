  //USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder

function C17270_Multiple_different_times_selected_same_Date()
{ 
   InitializationEnviornment.initiliaze(); 
   AppLoginLogout.login();
  var keyWordNm ="Daily Admission";
  var packageNm = "Date/Time";
  var subPakNm ="Children (Ages 3-12)";    
  var qty =3;
  var qty2 = qty+1;
  var dateD = CommonCalender.getTodaysDate();
  var dtFmt = aqConvert.DateTimeToFormatStr(dateD, "%#m/%#d/%Y");
  var givenPaymentType ="Cash";
   try {
    Log.AppendFolder("C17270_Multiple_different_times_selected_same_Date");
//    OrderInfo.prototype.OrderID = 0;
//    WrapperFunction.selectKeywordName(keyWordNm);    
//    SelectQuantityFromHeader.selectQuantity(qty);      
//    selectPackage(packageNm,subPakNm); 
//    if(datetimeformSubWindow.Exists){   
//      selectDateFromSubWindow(dateD); //mm-dd-yyyy 
//      selectAvailableTimeFromSubWindow("11:00 AM"); 
//      selectNextButtonFromSubWindow();
//    } 
//     selectPackage(packageNm,subPakNm);
//     if(datetimeformSubWindow.Exists){   
//      selectDateFromSubWindow(dateD); //mm-dd-yyyy 
//       try {      
//        aqUtils.Delay(3000);
//        availableTimedatagroup.ListItem(1).Click();
//        aqUtils.Delay(1000);
//        } catch (e) {
//    		merlinLogError("Oops! There's some glitch in the script: Unable to select differnt time " + e.message);
//    	}
//      selectNextButtonFromSubWindow();
//      qty = qty+1;
//    } 
//    VerifyCheckProperty.compareStringObj(labelExtralabel.Caption,"(Multiple Date/Times)");
//    var cnt = datagroupRateslistItems.ChildCount;
//    var itemCount =0;
//    for (let i=0;i<cnt;i++){
//      try{
//       temp = datagroupRateslistItems.Child(i).Group(0).Child(2).Caption;
//       itemCount = itemCount + parseInt(temp);
//       }catch(e){
//          merlinLogError("Unable to get count");
//       }
//    }    
//    if(itemCount != qty){
//      merlinLogError("Number of item added in cart is not matching with chart.")
//    }
    OrderInfo.prototype.OrderID = 0;
    WrapperFunction.selectKeywordName(keyWordNm);
    SelectQuantityFromHeader.selectQuantity(qty);     
    selectPackage(packageNm,subPakNm);
    var firstTime;
    var secondTime; 
    if(datetimeformSubWindow.Exists){   
      selectDateFromSubWindow(dateD); //mm-dd-yyyy 
       try {      
          aqUtils.Delay(3000);
          availableTimedatagroup.Child(0).Click();
          firstTime = availableTimedatagroup.Child(0).HGroup(0).Label("timeLabel").Caption;
         
          } catch (e) {
      		merlinLogError("Oops! There's some glitch in the script: Unable to select differnt time " + e.message);
      	}
      selectNextButtonFromSubWindow();
      Button.clickOnButton(selectablebuttonClosebutton);
    } 
     aqUtils.Delay(2000);
     SelectQuantityFromHeader.selectQuantity(qty2);   
     aqUtils.Delay(5000);  
     selectPackage(packageNm,subPakNm);
     aqUtils.Delay(1000);
     if(datetimeformSubWindow.Exists){   
      selectDateFromSubWindow(dateD); //mm-dd-yyyy 
      try {      
        aqUtils.Delay(3000);
        availableTimedatagroup.Child(1).Click();
        secondTime = availableTimedatagroup.Child(1).HGroup(0).Label("timeLabel").Caption;
        selectNextButtonFromSubWindow();
        aqUtils.Delay(1000);
        } catch (e) {
    		merlinLogError("Oops! There's some glitch in the script: Unable to select differnt time " + e.message);
    	}
       Button.clickOnButton(selectablebuttonClosebutton);   
    } 
    aqUtils.Delay(2000);
    cartaddedItemList.Refresh();
    aqUtils.Delay(5000);
    var firstPackageText = cartaddedItemList.Child(0).VGroup("cartVGroup").List("ratesList").Child(0).HGroup(0).HGroup("cartItemRateGrp").Group(0).Label("rateNameLabel").Caption;
    var firstQty=cartaddedItemList.Child(0).VGroup("cartVGroup").List("ratesList").Child(0).HGroup(0).HGroup("cartItemRateGrp").Group(0).Label("quantityLabel").Caption;
    var secondPackageText = cartaddedItemList.Child(0).VGroup("cartVGroup").List("ratesList").Child(1).HGroup(0).HGroup("cartItemRateGrp").Group(0).Label("rateNameLabel").Caption
    var secQty=cartaddedItemList.Child(0).VGroup("cartVGroup").List("ratesList").Child(1).HGroup(0).HGroup("cartItemRateGrp").Group(0).Label("quantityLabel").Caption;
    var f1 = subPakNm+" "+dtFmt+""+firstTime;
    var f2 = subPakNm+" "+dtFmt+""+secondTime;
    var q1 = "Qty: "+qty;
    var q2 = "Qty: "+qty2;
    VerifyCheckProperty.compareStringObj(firstPackageText,f2);
    VerifyCheckProperty.compareStringObj(secondPackageText,f1);
    VerifyCheckProperty.compareStringObj(firstQty,q2);
    VerifyCheckProperty.compareStringObj(secQty,q1);
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