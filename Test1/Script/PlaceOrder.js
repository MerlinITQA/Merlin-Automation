//USEUNIT ApplicationOpen
//USEUNIT WrapperFunction
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT SelectPackageAndSubPackage
//USEUNIT POSObjectMapping
//USEUNIT VerifyCheckProperty
//USEUNIT ConvertReservationsToPurchase
//USEUNIT SelectGroupFromMainMenu
//USEUNIT SelectPaymentType
//USEUNIT OrderDetails
//USEUNIT SelectQuantityFromHeader
//USEUNIT PlaceReservationOrder
/**
 * @author mnpatil
 */

/** @function
@name PlaceOrder.placeOrder
@description place reservation order.
@param {Object} keyWordNm is keyword name.
@param {Object} packageNm is package name.
@param {Object} subPakNm is subpackage name.
@param {Object} qty is quantity.
@param {Object} dateD is date.
@param {Object} givenPaymentType is payment type.
*/
function placeOrder(keyWordNm,packageNm,subPakNm,qty,dateD,givenPaymentType)
{   
try {
    Log.AppendFolder("PlaceOrder.placeOrder");
    OrderInfo.prototype.OrderID = 0;
    WrapperFunction.selectKeywordName(keyWordNm);
   // selectPackage(packageNm,subPakNm);
    aqUtils.Delay(3000);       
    /* if(datetimeformSubWindow.Exists){
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
    }*/
        SelectQuantityFromHeader.selectQuantity(qty);
        selectPackage(packageNm,subPakNm);
        if(datetimeformSubWindow.Exists){
          selectDateFromSubWindow(dateD);
          selectNextButtonFromSubWindow();
          }
        aqUtils.Delay(2000);
    finilizeOrder();
    aqUtils.Delay(2000);
    var settlementSubTotal = orderDetailsSubTotal.Caption;
    var settlementTotal =orderDetailsTotal.Caption;
    Log.Message("Verified order details on settlement page");
    selectPaymentTypeAddRequiredFields(givenPaymentType);
    applyAmount= aqString.Replace(settlementTotal,"$",""); 
    OrderInfo.prototype.OrderTotalAmount = applyAmount.trim();
    Log.Message("Order total amount is set:",OrderInfo.prototype.OrderTotalAmount);        
    if(applyAmount != 0){
      Log.Message("Apply amount");
      WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
      Button.clickOnButton(applyButton);
      if(givenPaymentType == "Cash" && applycashrespopupCashPaymentOKButton.Exists){
          Button.clickOnButton(applycashrespopupCashPaymentOKButton);
      }
      }
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(2000);
    validateTicket("Don't Validate");
    Log.Message("Don't Validate the order"); 
    //verifySubTotalOnConfirmationPage(settlementSubTotal);
    verifyTotalOnConfirmationPage(settlementTotal);
    //aqObject.CheckProperty(orderDetailsTotal,"Caption", cmpEqual, settlementTotal);  
    var orderId = cnf_orderID1.Caption;
    if (orderId == null){
      merlinLogError("Order id is not present");
    } 
    var OrderID= (orderId.split('#')[1]).trim();
    OrderInfo.prototype.OrderID = OrderID;
    Log.Message("Order id is set:"+OrderID); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
}
//function verifyPay(){
//ct = listCarttotalspaymentlist.ChildCount
//    for ( i=0 ;i<ct;i++){
//      if( listCarttotalspaymentlist.Child(i).Visible)
//      {
//     var d= listCarttotalspaymentlist.Child(i).Group(0).Child(0).Caption;
//     Log.Message("----",d) ;
//        if(listCarttotalspaymentlist.Child(i).Group(0).Child(0).Caption = givenPaymentType){
//           return true;
//        }
//      }
//    }
//}

/** @function
@name PlaceOrder.orderForAddReservationForMinimumAndNoPayment
@description place reservation order.
@param {Object} minimumPayRequired is flag true/false/
@param {Object} groupNm is group name.
@param {Object} keyWordNm is keyword name.
@param {Object} packageNm is package name.
@param {Object} subPakNm is subpackage name.
@param {Object} qtyT is quantity.
@param {Object} dateD is date.
*/
function orderForAddReservationForMinimumAndNoPayment(minimumPayRequired,groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD,paymentTypeForReservation){
try {
    Log.AppendFolder("PlaceOrder.orderForAddReservationForMinimumAndNoPayment");
    if(minimumPayRequired){
      placeROrderForMinimumPayment(groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD,paymentTypeForReservation)
    }else
    {
      placeROrderForNoMinimumPayment(groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD,paymentTypeForReservation)
    }
    selectReservationRecordToAddReservation(groupNm);
    aqUtils.Delay(5000); 
    selectQuantity(qtyT+1);
//    Keyword_Listgroup.MouseWheel(-1,0);
//    Keyword_Listgroup.MouseWheel(-1,0);
//    Keyword_Listgroup.MouseWheel(-1,0);
//    Keyword_Listgroup.MouseWheel(-1,0);
//    Keyword_Listgroup.Refresh();    
//    aqUtils.Delay(2000);
     WrapperFunction.selectKeyword(keyWordNm);
    if(minimumPayRequired){
    //addNewTicket(keyWordNm,"Minimum Payment Required Reservation 3",subPakNm,qtyT,dateD);
        selectPackage("Minimum Payment Required Reservation 3",subPakNm);
     }else{
     selectPackage(packageNm,subPakNm);
    //addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);
    }
    aqUtils.Delay(2000);
      if(datetimeformSubWindow.Exists){   
      selectDateFromSubWindow(dateD); //mm-dd-yyyy  
      selectNextButtonFromSubWindow(); }
      
    finilizeOrder();  
    aqUtils.Delay(3000);     
    verifyPrefixGreenColorReservation(packageNm);  
    var expectedSettlemtnttotal = orderDetailsTotal.Caption;
     if(minimumPayRequired){
        WrapperFunction.settlementCompleteOrder();
        aqUtils.Delay(1000);
          if(alertErrorWnd.Exists && alertErrorWnd.Visible){
           Log.Message("Must pay minimum balance alert is displayed");
           Button.clickOnButton(buttonOkOnError);
           aqUtils.Delay(1000);
          }
          else{
          merlinLogError("Must pay minimum balance alert is not displayed")
          }
          aqUtils.Delay(3000);
        var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
        paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");  
        selectPaymentTypeAddRequiredFields(paymentTypeForReservation);
        paymentTypeBal = parseInt(paymentTypeBal);
        WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
        Button.clickOnButton(applyButton);
        if(paymentTypeForReservation == "Cash" && applycashrespopupCashPaymentOKButton.Exists){
            Button.clickOnButton(applycashrespopupCashPaymentOKButton);
        }
    }
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    verifyOrderDetailsStoreOrderId(expectedSettlemtnttotal);
    } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally { 
		    Log.PopLogFolder();
	    }    
}

/** @function
@name PlaceOrder.placeResOrderQuick
@description place reservation order.
@param {Object} minimumPayRequired is flag true/false/
@param {Object} groupNm is group name.
@param {Object} keyWordNm is keyword name.
@param {Object} packageNm is package name.
@param {Object} subPakNm is subpackage name.
@param {Object} qtyT is quantity.
@param {Object} dateD is date.
@param {Object} paymentTypeForReservation is payment type.
*/
function placeResOrderQuick(minimumPayRequired,groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD,paymentTypeForReservation){
try {
  Log.AppendFolder("PlaceOrder.placeResOrderQuick");
  ReservationOrderInfo.prototype.ResOrderTotal = 0;
  ReservationOrderInfo.prototype.ResID = 0;
  selectGroupFromMainMenu(groupNm);
  clickBuyTicketsButton();
  WrapperFunction.selectKeywordName(keyWordNm);
  if( qtyT > 1){
    selectQuantity(qtyT);
  }
  selectPackage(packageNm,subPakNm);   
  selectDateFromSubWindow(dateD); //mm-dd-yyyy  
  selectNextButtonFromSubWindow();
  finilizeOrder();
  aqUtils.Delay(2000);
  clickConvertToReservation();
  aqUtils.Delay(5000);     
  var expectedSettlemtnttotal = orderDetailsTotal.Caption; 
  if (expectedSettlemtnttotal == null){
    merlinLogError("expectedSettlemtnttotal is not present");
  } 
  var orderTotal= (expectedSettlemtnttotal.split('$')[1]).trim();
  ReservationOrderInfo.prototype.ResOrderTotal = orderTotal;
  
  if(minimumPayRequired){
      var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
      paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");  
      selectPaymentTypeAddRequiredFields(paymentTypeForReservation);
      paymentTypeBal = parseInt(paymentTypeBal);
      WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
      Button.clickOnButton(applyButton);
      if(paymentTypeForReservation == "Cash" && applycashrespopupCashPaymentOKButton.Exists){
          Button.clickOnButton(applycashrespopupCashPaymentOKButton);
      }
  }
  Log.Message("Complete the order");
  WrapperFunction.settlementCompleteOrder();
  aqUtils.Delay(5000);   
  //aqObject.CheckProperty(orderDetailsTotal,"Caption", cmpEqual, expectedSettlemtnttotal);  
  verifyTotalOnConfirmationPageReservation(expectedSettlemtnttotal);
  var orderId = cnf_orderID.Caption;
  if (orderId == null){
    merlinLogError("Order id is not present");
  } 
  var reservationOrderID= (orderId.split('#')[1]).trim();
  ReservationOrderInfo.prototype.ResID = reservationOrderID;
  Log.Message("Reservation id is set:",reservationOrderID); 
  } catch (e) {
    merlinLogError("Oops! There's some glitch in the script: " + e.message);
    return;
  }
  finally { 
    Log.PopLogFolder();
  }    
}

/** @function
@name PlaceOrder.placeResOrderMultiTicketQuick
@description place reservation order.
@param {Object} minimumPayRequired is flag true/false
@param {Object} groupNm is group name.
@param {Object} keyWordNm is keyword name.
@param {Object} packageNm is package name.
@param {Object} subPakNm is subpackage name.
@param {Object} qtyT is quantity.
@param {Object} dateD is date.

@param {Object} packageNm1 is package name.
@param {Object} subPakNm1 is subpackage name.
@param {Object} qtyT1 is quantity.
@param {Object} dateD1 is date.
@param {Object} paymentTypeForReservation is payment type.
*/
function placeResOrderMultiTicketQuick(minimumPayRequired,groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD,packageNm1,subPakNm1,qtyT1,dateD1,paymentTypeForReservation){
 try {
  Log.AppendFolder("PlaceOrder.placeResOrderMultiTicketQuick");
  ReservationOrderInfo.prototype.ResOrderTotal = 0;
  ReservationOrderInfo.prototype.ResID = 0;
  
  selectGroupFromMainMenu(groupNm);
  clickBuyTicketsButton();
  WrapperFunction.selectKeywordName(keyWordNm);
  if( qtyT > 1){
    selectQuantity(qtyT);
  }
  selectPackage(packageNm,subPakNm);   
  selectDateFromSubWindow(dateD); //mm-dd-yyyy  
  selectNextButtonFromSubWindow();
  
   if( qtyT1 > 1){
    selectQuantity(qtyT1);
  }
  selectPackage(packageNm1,subPakNm1);   
  selectDateFromSubWindow(dateD1); //mm-dd-yyyy  
  selectNextButtonFromSubWindow(); 
  
  finilizeOrder();
  aqUtils.Delay(2000);
  clickConvertToReservation();
  aqUtils.Delay(3000);     
  var expectedSettlemtnttotal = orderDetailsTotal.Caption; 
  if (expectedSettlemtnttotal == null){
    merlinLogError("expectedSettlemtnttotal is not present");
  } 
  var orderTotal= (expectedSettlemtnttotal.split('$')[1]).trim();
  ReservationOrderInfo.prototype.ResOrderTotal = orderTotal;
  if(minimumPayRequired){
      var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
      paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");  
      selectPaymentTypeAddRequiredFields(paymentTypeForReservation);
      paymentTypeBal = parseInt(paymentTypeBal);
      WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
      Button.clickOnButton(applyButton);
      if(paymentTypeForReservation == "Cash" && applycashrespopupCashPaymentOKButton.Exists){
          Button.clickOnButton(applycashrespopupCashPaymentOKButton);
      }
  }
   Log.Message("Complete the order");
  WrapperFunction.settlementCompleteOrder();
  aqUtils.Delay(5000);   
  //aqObject.CheckProperty(orderDetailsTotal,"Caption", cmpEqual, expectedSettlemtnttotal);  
  verifyTotalOnConfirmationPageReservation(expectedSettlemtnttotal);
  var orderId = cnf_orderID.Caption;
  if (orderId == null){
    merlinLogError("Order id is not present");
  } 
  var reservationOrderID= (orderId.split('#')[1]).trim();
  ReservationOrderInfo.prototype.ResID = reservationOrderID;
  Log.Message("Reservation id is set:",reservationOrderID);
  } catch (e) {
    merlinLogError("Oops! There's some glitch in the script: " + e.message);
    return;
  }
  finally { 
    Log.PopLogFolder();
  }     
}

  