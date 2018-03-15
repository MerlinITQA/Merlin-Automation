//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu

function C43125_Error_does_not_trigger_cancellation_of_a_Reservation()
{
 try {
    Log.AppendFolder("C43125_Error_does_not_trigger_cancellation_of_a_Reservation");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var groupNm=defaultGroupName;
    var paymentTypeForReservation = "Cash";
    placeROrderForPaymentType(groupNm,paymentTypeForReservation);
    selectReservationRecordToCancelReservation(groupNm);
   
    if(alertCancelReservation.Exists){
      Button.clickOnButton(alertCancelReservationYes);       
//      Button.clickOnButton(refundReservationConfOK);
//      aqUtils.Delay(500);
//      if(!errorindicatorCancelTicket.Exists && !errorindicatorCancelTicket.VisibleOnScreen){      
//        merlinLogError("Error Indicator is not displayed.");
//        return;
//      }
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
//     var resOrderID = ReservationOrderInfo.prototype.ResID ;
//        if(resOrderID == 0){
//          merlinLogError("resOrderId is not set");
//        }else{ 
//          var cC = groupUpdateDataGridReservation.wColumnCount;
//          var rC =0;
//		     rC = groupUpdateDataGridReservation.wRowCount;		  
//          for ( rowC = 0 ; rowC <  rC ; rowC++){
//              var orderID = dataGridTable.wValue(rowC ,0);
//              if (resOrderID  == orderID){
//                  dataGridTable.ClickCell(rowC,0);
//                  setReservationRecordDetailsforVerification(dataGridTable,rowC);
//                  break; 
//              }
//          } 
//        }
//         resOrderInfoClosebutton.Click();       
    
    
  AppLoginLogout.logout();  
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
}