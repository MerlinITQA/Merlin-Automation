//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder

function C43095_Res_nonReservation_items_can_be_refunded()
{
try{
      Log.AppendFolder("C43095_Res_nonReservation_items_can_be_refunded");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
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
      
      
      addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);
  
      finilizeOrder();
      aqUtils.Delay(3000);
      clickConvertToReservation();
      aqUtils.Delay(4000);  
  
      verifyPrefixColorNonReservation(packageNM1);
      verifyPrefixGreenColorReservation(packageNm);   
   
      var expectedSettlemtnttotal = orderDetailsTotal.Caption;
//      var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
//          paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");
//          paymentTypeBal = parseInt(paymentTypeBal) + 1;
//          WrapperFunction.setTextValue(PayamountTextBox,paymentTypeBal);
//          Button.clickOnButton(applyButton);
          // aqUtils.Delay(2000);
           
         applyAmount= aqString.Replace(expectedSettlemtnttotal,"$",""); 
         OrderInfo.prototype.OrderTotalAmount = applyAmount.trim();
          Button.clickOnButton(applyBalance);
          Button.clickOnButton(applycashrespopupCashPaymentOKButton);
//      var totalAmt=(expectedSettlemtnttotal.split('$')[1]).trim()
//   
//      var balance = parseFloat(totalAmt) - parseFloat(paymentTypeBal);
//       var remBalance= PaymentType_BalanceLabel.Caption;
//           remBalance=(remBalance.split('$')[1]).trim();  
//      if(balance == remBalance ){
//          Log.Message("The Balance Due amount is calculated incorrectly.");
//      }
//      else{
//          merlinLogError("The Balance Due amount is calculated incorrectly.");
//      }
      Log.Message("Complete the order");
      WrapperFunction.settlementCompleteOrder();
      aqUtils.Delay(3000);
      validateTicket("Don't Validate"); 
//      var expectedT= (expectedSettlemtnttotal.split('$')[1]).trim();
//      var temp = cnf_orderDetailsTotal.Caption;
//      var cnf_Ord = (temp.split('$')[1]).trim();
////       temp = orderDetailsTotal.Caption ;
////      var ord_details = (temp.split('$')[1]).trim();
////      var total = parseFloat(cnf_Ord) + parseFloat(ord_details);
//        //verifyOrderDetailsStoreOrderId(expectedSettlemtnttotal);
//        if( total == expectedT){
//            Log.Message("Total is matching");
//        }
//        else{
//           merlinLogError("Total is not matching");
//           Log.Message("Actual Total",total);
//           Log.Message("Expected Total",expectedSettlemtnttotal);  
//        }

        var resrvationOrderAmount = confirmationPageTotalNormal.Caption;
        resrvationOrderAmount = (resrvationOrderAmount.split('$')[1]).trim();
        var normalOrderAmount = confirmationPageTotalREZ.Caption;
        normalOrderAmount = (normalOrderAmount.split('$')[1]).trim();
        var totalAmount = parseFloat(resrvationOrderAmount) + parseFloat(normalOrderAmount);
        if( totalAmount == applyAmount){
            Log.Message("Total is matching");
        }
        else{
           merlinLogError("Total is not matching");         
        }
        
        aqUtils.Delay(2000);  
        var orderId = cnf_orderID.Caption;
        if (orderId == null){
          merlinLogError("Order id is not present");
        } 
        var reservationOrderID= (orderId.split('#')[1]).trim();
        ReservationOrderInfo.prototype.ResID = reservationOrderID;   
        OrderInfo.prototype.OrderID = reservationOrderID;
        selectGroupFromMainMenuWithReservationRecord(groupNm);
        aqUtils.Delay(3000);     
        Log.Message("Complete the order");
        WrapperFunction.settlementCompleteOrder();
        aqUtils.Delay(2000);
        validateTicket("Don't Validate");
        Log.Message("Don't Validate the order"); 
         verifyTotalOnConfirmationPage(expectedSettlemtnttotal); 
        selectGroupFromMainMenuWithOrderedRecord(groupNm);
        aqUtils.Delay(3000);
         var displayPkg = orderinfoResDataGrid.wValue(0,1);           
            if(displayPkg == packageNm){
            Button.clickOnButton(checkboxReservationOrder);
            }
            displayPkg = orderinfoResDataGrid.wValue(1,1);
            if(displayPkg == packageNm){
            Button.clickOnButton(checkboxReservationOrderRow2);
            }
        Button.clickOnButton(orderWndRefund);  
        
        var verifyText ="Refund due: $"+totalAmount;        
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
         selectGroupFromMainMenuWithOrderedRecord(groupNm);
         aqUtils.Delay(3000);
        s= orderinfopopupReservation.Height
        s4 =orderinfopopupReservation.Top
        s3 = orderWndRefund.Top
        if(!(orderRefundButton.Visible) && !(orderRefundButton.VisibleOnScreen)){
            Log.Message("Order can be Refunded.");         
        }else{
            merlinLogError("Refund button is not displayed."); 
        }
         Button.clickOnButton(resOrderInfoClosebutton);
   
   } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally {  
      AppLoginLogout.logout();  
	    Log.PopLogFolder();
    }     
}