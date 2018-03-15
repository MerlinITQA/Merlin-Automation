//USEUNIT ApplicationOpen
//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT SelectGroupFromMainMenu
//USEUNIT SelectPaymentType
//USEUNIT WrapperFunction
//USEUNIT SelectSubPackagesFromWindow
//USEUNIT SelectPackageAndSubPackage
//USEUNIT POSObjectMapping
//USEUNIT OrderDetails
//USEUNIT VerifyCheckProperty
//USEUNIT ConvertReservationsToPurchase
//USEUNIT SelectQuantityFromHeader
/**
 * @author mnpatil
 */

/** @function
@name PlaceReservationOrder.placeROrder
@description place reservation order.
@param {Object} oVariation is TestComplets object.
*/
function placeROrder(oVariation)
{
try {
  Log.AppendFolder("PlaceReservationOrder.placeROrder");
  ReservationOrderInfo.prototype.ResTotal = 0;
  ReservationOrderInfo.prototype.ResID = 0;
  var groupNm=defaultGroupName;
  var keyWordNm ="Reservations";
  var packageNm ="Minimum Payment Required Reservation 2";
  var subPakNm ="Individual";
  var qtyT = 1;
  var dateD =CommonCalender.getTodaysDate();
  selectGroupFinilizeOrderForReservation(groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD);
  aqUtils.Delay(4000);  
  verifyPrefixGreenColorReservation(packageNm);  
  var expectedSettlemtnttotal = orderDetailsTotal.Caption;
  var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
  paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");
  ReservationOrderInfo.prototype.ResTotal = paymentTypeBal;
  applyAmount(oVariation,paymentTypeBal); 
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
@name PlaceReservationOrder.placeROrderForPaymentType
@description place reservation order.
@param {Object} groupNm is TestComplets object.
@param {Object} paymentTypeForReservation is TestComplets object.

*/
function placeROrderForPaymentType(groupNm,paymentTypeForReservation)
{
try {
  Log.AppendFolder("PlaceReservationOrder.placeROrderForPaymentType");
  ReservationOrderInfo.prototype.ResID = 0;
  var keyWordNm ="Reservations";
  var packageNm ="Minimum Payment Required Reservation 2";
  var subPakNm ="Individual";
  var qtyT = 1;
  var dateD =CommonCalender.getTodaysDate();
  selectGroupFinilizeOrderForReservation(groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD);
  aqUtils.Delay(4000);  
  verifyPrefixGreenColorReservation(packageNm);  
  var expectedSettlemtnttotal = orderDetailsTotal.Caption;
  var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
  paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");  
  selectPaymentTypeAddRequiredFields(paymentTypeForReservation);
  paymentTypeBal = parseInt(paymentTypeBal) + 1;
  WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
  Button.clickOnButton(applyButton);
  aqUtils.Delay(1000);
  if(paymentTypeForReservation == "Cash" && applycashrespopupCashPaymentOKButton.Exists){
    Button.clickOnButton(applycashrespopupCashPaymentOKButton);
    aqUtils.Delay(1000);
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
@name PlaceReservationOrder.placeROrderForMinimumPayment
@description place reservation order.
@param {Object} oVariation is TestComplets object.
*/
function placeROrderForMinimumPayment(groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD,paymentTypeForReservation)
{
try {
  Log.AppendFolder("PlaceReservationOrder.placeROrderForMinimumPayment");
  selectGroupFromMainMenu(groupNm);
  clickBuyTicketsButton();
  addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);
  finilizeOrder();
  aqUtils.Delay(3000);
  clickConvertToReservation();
  aqUtils.Delay(4000);  
  verifyPrefixGreenColorReservation(packageNm);  
  var expectedSettlemtnttotal = orderDetailsTotal.Caption;
  var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
  paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");  
  selectPaymentTypeAddRequiredFields(paymentTypeForReservation);
  paymentTypeBal = parseInt(paymentTypeBal);
  WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
  Button.clickOnButton(applyButton);
  if(paymentTypeForReservation == "Cash" && applycashrespopupCashPaymentOKButton.Exists){
      Button.clickOnButton(applycashrespopupCashPaymentOKButton);
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
@name PlaceReservationOrder.addNewTicket
@description place reservation order.
@param {Object} keyWordNm is TestComplets object.
@param {Object} packageNm is TestComplets object.
@param {Object} subPakNm is TestComplets object.
@param {Object} qtyT is TestComplets object.
@param {Object} dateD is TestComplets object.
*/
function addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD){
try {
  Log.AppendFolder("PlaceReservationOrder.addNewTicket");
  WrapperFunction.selectKeywordName(keyWordNm);
  selectQuantity(qtyT);
  selectPackage(packageNm,subPakNm);
  aqUtils.Delay(5000);
  if(datetimeformSubWindow.Exists && datetimeformSubWindow.VisibleOnScreen){   
    selectDateFromSubWindow(dateD); //mm-dd-yyyy  
    selectNextButtonFromSubWindow();
    aqUtils.Delay(2000);     
      if(selectablebuttonClosebutton.Exists && selectablebuttonClosebutton.VisibleOnScreen){   
      Button.clickOnButton(selectablebuttonClosebutton);
     }
    }  
   } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }    
}
/** @function
@name PlaceReservationOrder.placeROrderForNoMinimumPayment
@description place reservation order.
@param {Object} oVariation is TestComplets object.
*/
function placeROrderForNoMinimumPayment(groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD,paymentTypeForReservation)
{
try {
  Log.AppendFolder("PlaceReservationOrder.placeROrderForNoMinimumPayment");
  selectGroupFromMainMenu(groupNm);
  clickBuyTicketsButton();
  addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);
  finilizeOrder();
  aqUtils.Delay(3000);
  clickConvertToReservation();
  aqUtils.Delay(4000);  
  verifyPrefixGreenColorReservation(packageNm);  
  var expectedSettlemtnttotal = orderDetailsTotal.Caption;
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
@name PlaceReservationOrder.placeROrderMultiPayment
@description place reservation order.
@param {Object} oVariation is TestComplets object.
*/
function placeROrderMultiPayment(oVariation)
{
try {
  Log.AppendFolder("PlaceReservationOrder.placeROrderMultiPayment");
  var groupNm=defaultGroupName;
  var keyWordNm ="Reservations";
  var packageNm ="Minimum Payment Required Reservation 2";
  var subPakNm ="Individual";
  var qtyT = 1;
  var dateD =CommonCalender.getTodaysDate();
  selectGroupFinilizeOrderForReservation(groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD);
  aqUtils.Delay(4000);  
  verifyPrefixGreenColorReservation(packageNm);  
  var expectedSettlemtnttotal = orderDetailsTotal.Caption;
  var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
  paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");
  selectPaymentTypeAddRequiredFields("Cash");
  var halfAmt = parseInt(paymentTypeBal)/2 ;
  applyAmount("",halfAmt); 
  Log.Message("Apply remaining amount");  
  selectPaymentTypeAddRequiredFields("Voucher");     
    switch(oVariation){
      case "MinimumPaymentOver":  
            halfAmt = parseInt(halfAmt) + 1;
            WrapperFunction.setTextValue(PayamountTextBox,halfAmt);
            break;
               
      case "MinimumPaymentExact":                      
            WrapperFunction.setTextValue(PayamountTextBox,halfAmt);
            break;
     }
     Button.clickOnButton(applyButton);
  
  Log.Message("Complete the order");
  WrapperFunction.settlementCompleteOrder();
  aqUtils.Delay(3000);
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
@name PlaceReservationOrder.placeMixROrder
@description place reservation order.
@param {Object} oVariation is TestComplets object.
*/
function placeMixROrder(oVariation)
{
try {
  Log.AppendFolder("PlaceReservationOrder.placeMixROrder");
  var groupNm=defaultGroupName;  
  var keyWordNm ="Reservations";
  var packageNm ="Minimum Payment Required Reservation 2";
  var subPakNm ="Individual";
  var qtyT = 1;
  var dateD =CommonCalender.getTodaysDate();
  var keyWordNm1 = "Daily Admission"
  var packageNM1 = "3 site Combi"
  var subPakNm1 ="Children (Ages 3-12)";

  selectGroupForReservation(groupNm,keyWordNm1,packageNM1,subPakNm1,qtyT,dateD);
  aqUtils.Delay(3000);
  addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);
  
  finilizeOrder();
  aqUtils.Delay(3000);
  clickConvertToReservation();
  aqUtils.Delay(4000);  
  
  verifyPrefixColorNonReservation(packageNM1);
  verifyPrefixGreenColorReservation(packageNm);   
   
  var expectedSettlemtnttotal = orderDetailsTotal.Caption;
  var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
  paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");
  applyAmount(oVariation,paymentTypeBal);
  
  Log.Message("Complete the order");
  WrapperFunction.settlementCompleteOrder();
  aqUtils.Delay(3000);
  validateTicket("Don't Validate"); 
  var expectedT= (expectedSettlemtnttotal.split('$')[1]).trim();
  var temp = confirmationPageTotalREZ.Caption;
  var cnf_Ord = (temp.split('$')[1]).trim();
   temp = confirmationPageTotalNormal.Caption ;
  var ord_details = (temp.split('$')[1]).trim();
  var total = parseFloat(cnf_Ord) + parseFloat(ord_details);
    //verifyOrderDetailsStoreOrderId(expectedSettlemtnttotal);
    if( total == expectedT){
        Log.Message("Total is matching");
    }
    else{
       merlinLogError("Total is not matching");
       Log.Message("Actual Total",total);
       Log.Message("Expected Total",expectedSettlemtnttotal);  
    }   
    } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }    
}

/** @function
@name PlaceReservationOrder.applyAmount
@description place reservation order.
@param {Object} oVariation is TestComplets object.
@param {Object} paymentTypeBal is TestComplets object.
*/
function applyAmount(oVariation,paymentTypeBal){
try {
  Log.AppendFolder("PlaceReservationOrder.applyAmount");
 var expectedSettlemtnttotal = orderDetailsTotal.Caption;
 if(paymentTypeBal != 0){
    Log.Message("Apply remaining amount");     
    switch(oVariation){
      case "MinimumPaymentOver":  
            paymentTypeBal = parseInt(paymentTypeBal) + 1;
            WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
            break;
               
      case "MinimumPaymentFull":
            tTotal= aqString.Replace(expectedSettlemtnttotal,"$","");  
            WrapperFunction.setTextValue(PayamountTextBox,tTotal);
            break;
           
      case "ExceedingFullPayment": 
            tTotal= aqString.Replace(expectedSettlemtnttotal,"$",""); 
            tTotal = parseInt(tTotal)+1; 
            WrapperFunction.setTextValue(PayamountTextBox,tTotal);
            break;
     
      case "MinimumPaymentExact": 
      default:
            WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
            break;
    }       
    Button.clickOnButton(applyButton);
    // aqUtils.Delay(2000);
    Button.clickOnButton(applycashrespopupCashPaymentOKButton);
  }
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }   
}
/** @function
@name PlaceReservationOrder.verifyOrderDetailsStoreOrderId
@description place reservation order.
@param {Object} expectedSettlemtnttotal is TestComplets object.
*/
function verifyOrderDetailsStoreOrderId(expectedSettlemtnttotal){
try {
  Log.AppendFolder("PlaceReservationOrder.verifyOrderDetailsStoreOrderId");
  ReservationOrderInfo.prototype.ResID = 0;
  aqUtils.Delay(5000);   
  //aqObject.CheckProperty(orderDetailsTotal,"Caption", cmpEqual, expectedSettlemtnttotal);
  //aqObject.CheckProperty(confirmationPageTotalREZ,"Caption", cmpEqual, expectedSettlemtnttotal);   
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
@name PlaceReservationOrder.placeReservationOrderForNoPayment
@description place reservation order.
*/
function placeReservationOrderForNoPayment()
{
try {
  Log.AppendFolder("PlaceReservationOrder.placeReservationOrderForNoPayment");
  ReservationOrderInfo.prototype.ResID = 0;
  selectGroupFinilizeOrderForReservation(defaultGroupName,"Reservations","No Payment Required Reservation 1","Individual",1,CommonCalender.getTodaysDate())
  aqUtils.Delay(4000);
  var expectedSettlemtnttotal = orderDetailsTotal.Caption;
  var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
  paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");
  if(paymentTypeBal != 0){
    Log.Message("Apply remaining amount");
    WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
    Button.clickOnButton(applyButton);
    // aqUtils.Delay(2000);
    Button.clickOnButton(applycashrespopupCashPaymentOKButton);
  }
  Log.Message("Complete the order");
  WrapperFunction.settlementCompleteOrder();
  aqUtils.Delay(5000);   
 // aqObject.CheckProperty(orderDetailsTotal,"Caption", cmpEqual, expectedSettlemtnttotal);
 //aqObject.CheckProperty(confirmationPageTotalREZ,"Caption", cmpEqual, expectedSettlemtnttotal);  
  verifyTotalOnConfirmationPageReservation(expectedSettlemtnttotal);
  var temp = cnf_orderID.Caption; 
  if (temp == null){
    merlinLogError("Order id is not present");
  } 
  var reservationOrderID= (temp.split('#')[1]).trim();
  ReservationOrderInfo.prototype.ResID = reservationOrderID ;
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }   
}

/** @function
@name PlaceReservationOrder.enterResonaOnConfirmationCancleARefundwnd
@description place reservation order.
*/
function enterResonaOnConfirmationCancelARefundwnd(){
try{
   Log.AppendFolder("PlaceReservationOrder.enterResonaOnConfirmationCancleARefundwnd");
   WrapperFunction.setTextValue(refundReservationConfReasontext,"Test Cancel and refund amount");
   enterSupervisorCred()
   } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }   
}
/** @function
@name PlaceReservationOrder.enterSupervisorCred
@description place reservation order.
*/
function enterSupervisorCred(){
   WrapperFunction.setTextValue(refundReservationConf,"MerlinQA");
   WrapperFunction.setTextValue(refundReservationConfPassword,"Merlin17");
   Button.click(refundReservationConfOK);
}
/** @function
@name PlaceReservationOrder.enterResonaOnConfirmationCancleARefundwnd
@description place reservation order.
*/
function enterResonaOnConfirmationRefundCashier(){
   WrapperFunction.setTextValue(refundReservationConfReasontext,"Test Cancel and refund amount");   
   WrapperFunction.setTextValue(refundReservationConf,"MerlinQACash");
   WrapperFunction.setTextValue(refundReservationConfPassword,"Merlin17");
   Button.click(refundReservationConfOK);
}
/** @function
@name PlaceReservationOrder.placeReservationOrderForMinimumPayment
@description place reservation order.
*/
function placeReservationOrderForMinimumPayment(){
    placeROrder("MinimumPaymentExact");
}

/** @function
@name PlaceReservationOrder.placeReservationOrderForMinimumPaymentExact
@description place reservation order.
*/
function placeReservationOrderForMinimumPaymentExact(){
    placeROrder("MinimumPaymentExact");
}

/** @function
@name PlaceReservationOrder.placeReservationOrderForMinimumPaymentOver
@description place reservation order.
*/
function placeReservationOrderForMinimumPaymentOver(){
    placeROrder("MinimumPaymentOver");
}

/** @function
@name PlaceReservationOrder.placeReservationOrderForMinimumPaymentFull
@description place reservation order.
*/
function placeReservationOrderForMinimumPaymentFull(){
    placeROrder("MinimumPaymentFull");
}

/** @function
@name PlaceReservationOrder.placeReservationOrderForExceedingFullPayment
@description place reservation order.
*/
function placeReservationOrderForExceedingFullPayment(){
    placeROrder("ExceedingFullPayment");
}

/** @function
@name PlaceReservationOrder.placeMixReservationOrderForPaymentExact
@description place reservation order.
*/
function placeMixReservationOrderForPaymentExact(){
    placeMixROrder("MinimumPaymentExact");
}

/** @function
@name PlaceReservationOrder.placeMixReservationOrderForPaymentOver
@description place reservation order.
*/
function placeMixReservationOrderForPaymentOver(){
    placeMixROrder("MinimumPaymentOver");
}

/** @function
@name PlaceReservationOrder.placeReservationOrderForMultiPaymentExact
@description place reservation order.
*/
function placeReservationOrderForMultiPaymentExact(){
     placeROrderMultiPayment("MinimumPaymentExact");
}

/** @function
@name PlaceReservationOrder.placeReservationOrderForMultiPaymentOver
@description place reservation order.
*/
function placeReservationOrderForMultiPaymentOver(){
     placeROrderMultiPayment("MinimumPaymentOver");
}