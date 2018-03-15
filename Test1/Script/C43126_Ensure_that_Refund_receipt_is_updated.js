//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
function C43126_Ensure_that_Refund_receipt_is_updated()
{
try{
    Log.AppendFolder("C43126_Ensure_that_Refund_receipt_is_updated");
    InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
    var groupNm=defaultGroupName;
    var paymentTypeForReservation = "Cash";
    var keyWordNm ="Daily Admission";
    var packageNm ="Open Dated";
    var subPakNm ="Children (Ages 3-12)";
    var qtyT = 2;
    var dateD =CommonCalender.getTomorrowsDate();  
    aqUtils.Delay(2000);
   
    WrapperFunction.selectKeywordName(keyWordNm);  
    selectPackage(packageNm,subPakNm); 
    aqUtils.Delay(2000);
    
     var sSubTotal = subTotalOnOrderScreen.Caption;
     var sCartAdjustments =cartadjustmentsOnOrderScreen.Caption;
     var sTax =taxOnOrderScreen.Caption;
     var sFees =feesOnOrderScreen.Caption;
     var sTotal =(totalOnOrderScreen.Caption.split(':')[1]).trim();
    finilizeOrder();
     aqUtils.Delay(2000);    
     var settlementSubTotal = orderDetailsSubTotal.Caption;
     var settlementTotal =orderDetailsTotal.Caption; 
     var settlementCartAdjustments =orderDetailsCartAdjustment.Caption;
     var settlementTax =orderDetailsTax.Caption;
     var settlementFees =orderDetailsFees.Caption;  
     if(compareStringObj(settlementSubTotal,sSubTotal)
       && compareStringObj(settlementCartAdjustments,sCartAdjustments)
       && compareStringObj(settlementTax,sTax)
       && compareStringObj(settlementFees,sFees)
       && compareStringObj(settlementTotal,sTotal)
     ){
        Log.Message("Order details are matching on settlement page.");     
     }else{
        merlinLogError("Order details are not matching on settlement page.");
      }  
       
    Button.clickOnButton(selectablebuttonCustomerdetailsb);
    if(customerdetailspopup.Exists && customerdetailspopup.VisibleOnScreen){
       TextBox.setTextBoxValue(cdFirstnameti,"TestFName");
       TextBox.setTextBoxValue(cdLastnameti,"TestLName");      
       TextBox.setTextBoxValue(cdHomephoneti,"123456");
       TextBox.setTextBoxValue(cdCellphoneti,"123456");
       TextBox.setTextBoxValue(cdEmailti,"test@test.com");
        TextBox.setTextBoxValue(cdShippingaddressti,"address1");
         TextBox.setTextBoxValue(cdShippingaddressti2,"address2");
        TextBox.setTextBoxValue(cdShippingzipti,"01923");
        Sys.Keys("[Enter]")
        aqUtils.Delay(1000);  
        Button.clickOnButton(cdOkbutton);
        Button.clickOnButton(applyBalance);       
        var applyedAmt = paymentListFirstItem.PaymentListItem("payItem").HGroup(0).Label("amtLabel").Caption;
        if(compareStringObj(applyedAmt,sTotal)){
          Log.Message("Correct amount is applyed.");
        }else{
          merlinLogError("Wrong amount is is applyed.");
        }  
        OrderInfo.prototype.OrderTotalAmount = aqString.Replace(applyedAmt,"$","").trim();
        WrapperFunction.settlementCompleteOrder();
        Log.Message("Don't Validate the order");
        aqUtils.Delay(2000);
        validateTicket("Don't Validate");      
        aqUtils.Delay(3000);        
        verifyTotalOnConfirmationPage(applyedAmt);
        var verifyText ="Refund due: $"+OrderInfo.prototype.OrderTotalAmount;
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



    }else{
      merlinLogError("Customer details popup is not displayed.");
    }    
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
      AppLoginLogout.logout(); 
	    Log.PopLogFolder(); 
    }   
     
}