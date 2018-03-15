//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectDirectory
//USEUNIT SelectGroupFromMainMenu

function C43093_Receipts_Refund_order_receipt_formats()
{  
try{
    Log.AppendFolder("C43093_Receipts_Refund_order_receipt_formats");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();  
    var keyWordNm ="Daily Admission";
    var packageNm ="3 site Combi";
    var subPakNm ="Adult";
    var qtyT = 2;
    dt = CommonCalender.getTodaysDate(); 
    var dateD = aqConvert.DateTimeToFormatStr(dt, "%#m/%#d/%Y");
       
    addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);
    aqUtils.Delay(3000);    
    finilizeOrder();
    aqUtils.Delay(3000);
    var expectedSettlemtnttotal = orderDetailsTotal.Caption;
    var applyAmount= (expectedSettlemtnttotal.split('$')[1]).trim(); 
    selectPaymentTypeAddRequiredFields("Cash");
    var halfAmt = parseInt(applyAmount)/2 ;
    remainingAmt = applyAmount - halfAmt;
    WrapperFunction.setTextValue(PayamountTextBox,halfAmt);
    Log.Message("Apply remaining amount"); 
    Button.clickOnButton(applyButton); 
    selectPaymentTypeAddRequiredFields("Voucher");
    WrapperFunction.setTextValue(PayamountTextBox,remainingAmt);            
    Button.clickOnButton(applyButton);
    Log.Message("Complete the order");
    WrapperFunction.settlementCompleteOrder();
    aqUtils.Delay(2000);
    validateTicket("Don't Validate");      
    aqUtils.Delay(3000);        
    verifyTotalOnConfirmationPage(expectedSettlemtnttotal);
    var orderId = cnf_orderID.Caption;
    if (orderId == null){
        merlinLogError("Order id is not present");
    }
    
    var verifyText ="Refund due: $"+applyAmount;
    Button.clickOnButton(Refund_Button);
    WrapperFunction.setTextValue(refundReservationConfReasontext,"Test Cancel and refund amount");  
    Button.clickOnButton(refundReservationConfOK);      
    aqUtils.Delay(3000);
    if(cashliftalertpopupCashLift.Exists && cashliftalertpopupCashLift.VisibleOnScreen){
     Log.Message("Cash Lift pop up alert is displayed.")
     Button.clickOnButton(cashLiftPopupClosebutton);
    }
    var refundText = confirmationChangeDue.Caption;
    if(refundText.startsWith(verifyText)){
       Log.Message("The payment summary on the bottom right shows correct values.");
    }
    else{
       merlinLogError("The payment summary is not correctly displayed.");
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