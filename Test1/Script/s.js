//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder

function s()
{
try{
     Log.AppendFolder("s");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
     
          Log.AppendFolder("PlaceReservationOrder.placeMixROrder");
          var groupNm=defaultGroupName;  
          var keyWordNm ="Reservations";
          var packageNm ="Minimum Payment Required Reservation 2";
          var subPakNm ="Individual";
          var qtyT = 1;
          var dateD =CommonCalender.getTodaysDate();
          var keyWordNm1 = "Reservations"
          var packageNM1 = "No Payment Required Reservation 1"
          var subPakNm1 ="Individual";

          selectGroupForReservation(groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD);
         
          addNewTicket(keyWordNm1,packageNm1,subPakNm1,qtyT,dateD);
  
          finilizeOrder();
          aqUtils.Delay(3000);
          clickConvertToReservation();
          aqUtils.Delay(4000);  
  
          verifyPrefixColorNonReservation(packageNM1);
          verifyPrefixGreenColorReservation(packageNm);   
   
          var expectedSettlemtnttotal = orderDetailsTotal.Caption;
          var paymentTypeBal=WrapperFunction.getTextValue(orderDetailsMinimumPayment);
          paymentTypeBal= aqString.Replace(paymentTypeBal,"$","");
          applyAmount("MinimumPaymentExact",paymentTypeBal);
  
          Log.Message("Complete the order");
          WrapperFunction.settlementCompleteOrder();
          aqUtils.Delay(3000);
          validateTicket("Don't Validate"); 
          var expectedT= (expectedSettlemtnttotal.split('$')[1]).trim();
          var temp = cnf_orderDetailsTotal.Caption;
          var cnf_Ord = (temp.split('$')[1]).trim();
           temp = orderDetailsTotal.Caption ;
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
            var orderId = cnf_orderID.Caption;
            if (orderId == null){
              merlinLogError("Order id is not present");
            } 
            var reservationOrderID= (orderId.split('#')[1]).trim();
            ReservationOrderInfo.prototype.ResID = reservationOrderID; 
            
            selectReservationRecordToCancelReservation(groupNm);
              aqUtils.Delay(3000);  
              if(alertCancelReservation.Exists){
                  Button.clickOnButton(alertCancelReservationYes);       
                  WrapperFunction.setTextValue(refundReservationConfReasontext,"Test Cancel and refund amount");
                  Button.clickOnButton(refundReservationConfOK);          
                  aqUtils.Delay(3000);  
                  var cancelStatus = false;
                  var cC = orderinfoResDataGrid.wColumnCount;
                  var rC = 0;
                  rC = orderinfoResDataGrid.wRowCount;
                  for ( rowC = 0 ; rowC <  rC ; rowC++){
                      var displayDt = orderinfoResDataGrid.wValue(rowC ,6);
                      if (displayDt == "Cancelled"){                
                          cancelStatus = true;
                          break; 
                      }else{
                        cancelStatus = false;
                      }
                  } 
                  if(cancelStatus){
                     Log.Message("The Reservation details are correctly reflected to the cancellation status");
                  }else{
                     merlinLogError("The Reservation details are not correctly reflected to the cancellation status");
                  }
                  resOrderInfoClosebutton.Click();   
                  }
                else{
                    merlinLogError("Pop-up is not displayed asking user to confirm about cancel the order");
                    return;
                }    
              
      AppLoginLogout.logout(); 
   } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    }     
}
