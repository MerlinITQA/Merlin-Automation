//USEUNIT InitializationEnviornment 
//USEUNIT AppLoginLogout
//USEUNIT POSObjectMapping
//USEUNIT PlaceReservationOrder
//USEUNIT WrapperFunction
//USEUNIT OrderDetails
//USEUNIT VerifyCheckProperty
//USEUNIT PlaceOrder 
//USEUNIT SelectQuantityFromHeader
//USEUNIT PlaceReservationOrder


function _0001485874524824_UpdateCartItems_Large_Orders()
{  
try {
  Log.AppendFolder("_0001485874524824_UpdateCartItems_Large_Orders");
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
  var keyWordNm ="Daily Admission";
  var packageNm ="Open Dated";
  var subPakNm ="Children (Ages 3-12)";
  var qtyT = 110;
  dt = CommonCalender.getTodaysDate(); 
  var dateD = aqConvert.DateTimeToFormatStr(dt, "%#m/%#d/%Y"); 
  var givenPaymentType ="Cash";
  try {
    Log.AppendFolder("PlaceOrder.placeOrder");
    OrderInfo.prototype.OrderID = 0;
    WrapperFunction.selectKeywordName(keyWordNm);
    SelectQuantityFromHeader.selectQuantity(qtyT);
    selectPackage(packageNm,subPakNm);
    aqUtils.Delay(3000);       
 
     finilizeOrder();
    aqUtils.Delay(2000);
    var settlementSubTotal = orderDetailsSubTotal.Caption;
    var settlementTotal =orderDetailsTotal.Caption;
    Log.Message("Verified order details on settlement page");
    selectPaymentTypeAddRequiredFields(givenPaymentType);
    applyAmount= aqString.Replace(settlementTotal,"$",""); 
    OrderInfo.prototype.OrderTotalAmount = applyAmount.trim();
    applyAmount = aqConvert.StrToFloat(applyAmount);
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
    if(cashliftalertpopupCashLift.Exists && cashliftalertpopupCashLift.VisibleOnScreen){
       Log.Message("Cash Lift pop up alert is displayed.")
       Button.clickOnButton(cashLiftPopupClosebutton);
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