﻿//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT POSObjectMapping
//USEUNIT ConvertReservationsToPurchase

function C37511_Payment_Types_Credit_Card_required_fields_Zip_Code()
{
try {
    Log.AppendFolder("C37511_Payment_Types_Credit_Card_required_fields_Zip_Code");
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
    CC_StreetAddress.Keys("Pune");
    CC_ZipCode.Keys("123AB");      
    aqUtils.Delay(2000);
    Button.clickOnButton(applyBalance);
       aqUtils.Delay(2000);
     if(!zipCodeErrorindicator.Exists){
        merlinLogError("Zip code error indicator is not displayed");
        return;
     }
     aqUtils.Delay(2000);
//     CC_ZipCode.Keys("1234");
//     aqUtils.Delay(2000);
//     Button.clickOnButton(applyBalance);
//     aqUtils.Delay(2000);
//     if(!zipCodeErrorindicator.Exists && zipCodeErrorindicator.VisibleOnScreen){
//        merlinLogError("Zip Code error indicator is not displayed");
//        return;
//     }
     CC_ZipCode.Keys("12345");
     aqUtils.Delay(2000);
      Button.clickOnButton(applyBalance);
     var cardLastDigit = paymentListFirstItem.PaymentListItem("payItem").HGroup(0).RichText("descLabel").Caption;
     if( !VerifyCheckProperty.compareStringObj(cardLastDigit,"Visa 1111")){
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
 
    