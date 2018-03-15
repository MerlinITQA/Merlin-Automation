//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT SelectGroupFromMainMenu

function C37627_Reservations_Confirm_Cancellations_NO_Supervisor()
{
 try {
    Log.AppendFolder("C37627_Reservations_Confirm_Cancellations_NO_Supervisor");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    var groupNm=defaultGroupName;
    var paymentTypeForReservation = "Cash";
    placeROrderForPaymentType(groupNm,paymentTypeForReservation);
    selectReservationRecordToCancelReservation(groupNm);
      aqUtils.Delay(1000);   
    if(alertCancelReservation.Exists){
      Button.clickOnButton(alertCancelReservationNo);
      aqUtils.Delay(3000);  
      var cancelStatus = false;
      var cC = orderinfoResDataGrid.wColumnCount;
      var rC = 0;
      rC = orderinfoResDataGrid.wRowCount;
      for ( rowC = 0 ; rowC <  rC ; rowC++){
          var displayDt = orderinfoResDataGrid.wValue(rowC ,6);
          if (displayDt == "Reserved"){                
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
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }      
}