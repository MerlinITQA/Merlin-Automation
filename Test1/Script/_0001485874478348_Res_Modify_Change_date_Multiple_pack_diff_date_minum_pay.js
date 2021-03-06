﻿//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectDirectory
//USEUNIT SelectGroupFromMainMenu
//USEUNIT POSObjectMapping
function _0001485874478348_Res_Modify_Existing_Change_date_Multiple_pack_diff_date_minum_pay()
{  
try {
	Log.AppendFolder("_0001485874478348_Res_Modify_Existing_Change_date_Multiple_pack_diff_date_minum_pay");
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
  var groupNm=defaultGroupName;
 
  var keyWordNm ="Reservations";
  var packageNm ="Minimum Payment Required Reservation 1";
  var subPakNm ="Individual";
  var qtyT = 1;
  dt = CommonCalender.getTodaysDate(); 
  var dateD = aqConvert.DateTimeToFormatStr(dt, "%#m/%#d/%Y");
  newD = aqDateTime.AddDays(dateD, 1);
  var modifiedDate = aqConvert.DateTimeToFormatStr(newD, "%#m/%#d/%Y");         
  var verifyDateFormatPrefix = aqConvert.DateTimeToFormatStr(aqDateTime.AddDays(POSObjectMapping.dt, 1), "%#m/%#d/%Y");
  var paymentTypeForReservation = "Cash";
  
  var packageNm1 ="Minimum Payment Required Reservation 2";
  var subPakNm1 ="Individual";
  var qtyT1 = 1;
  dt = CommonCalender.getTodaysDate(); 
  var dateD1 = aqConvert.DateTimeToFormatStr(dt, "%#m/%#d/%Y");
  
  placeResOrderMultiTicketQuick(true,groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD,packageNm1,subPakNm1,qtyT1,dateD1,paymentTypeForReservation);
 
  if(ReservationOrderInfo.prototype.ResID != null){
    selectGroupFromMainMenu(groupNm);
    selectReservationRecord(groupUpdateDataGridReservation);
    Button.clickOnButton(checkboxReservationOrder);
    clickModifyReservationDate();  
    aqUtils.Delay(2000);     
    //  resModifyDatetextinputDate.Keys(modifiedDate);
    setTextBoxValue(resModifyDatetextinputDate,resModifyDatetextinputDateString);
    resModifyDatetextinputDate.Keys("[Enter]");
    aqUtils.Delay(2000);
    var tm;
    cnt = resModifyDateTimelist.ChildCount;
    for (var i =0;i<cnt;i++ ){
      if(resModifyDateTimelist.Child(i).Visible){
        resModifyDateTimelist.Child(i).Click();
        tm= resModifyDateTimelist.Child(i).Group(0).Child(0).Caption;     
        break;
      }
    }      
    aqUtils.Delay(2000);
    resModifyDateOkButton.Click();
    resmodwnd = false;
    aqUtils.Delay(3000);
        var cC = orderinfoResDataGrid.wColumnCount;
        var rC = 0;
		rC = orderinfoResDataGrid.wRowCount;
        aqUtils.Delay(2000);
        for ( rowC = 0 ; rowC <  rC ; rowC++){
            var displayDt = orderinfoResDataGrid.wValue(rowC ,3);
            if (displayDt.includes(verifyDateFormatPrefix) && displayDt.endsWith(tm)){                
                resmodwnd = true;
                break; 
            }else{
              resmodwnd = false;
            }
        } 
        if(resmodwnd){
           Log.Message("Date is updated on Reservation modification window");
        }else{
           merlinLogError("Date is not updated on Reservation modification window");
        }
	  aqUtils.Delay(3000);  
    clickLoadReservation();    
    temp =orderDetailsTotal.Caption;
    var settlementTotal = parseInt((temp.split('$')[1]).trim());    
       //observe settlement screen
    if(ReservationOrderInfo.prototype.ResOrderTotal == settlementTotal){
      Log.Message("Order details are correct on settlement page");
    }
    else{
      merlinLogError("Order details are not correct on settlement page");
    }
    SelectDirectory.selectDirectory(Directory_OrderHistory);
    clickSpecificViewOrder(ReservationOrderInfo.prototype.ResID);
      if(cashliftalertpopupCashLift.Exists && cashliftalertpopupCashLift.VisibleOnScreen){
             Log.Message("Cash Lift pop up alert is displayed.")
             Button.clickOnButton(cashLiftPopupClosebutton);
         }    
    //temp =orderDetailsTotal.Caption;
	 temp =confirmationPageTotalREZ.Caption;
    var confirmationTotal = parseInt((temp.split('$')[1]).trim());
    if(ReservationOrderInfo.prototype.ResOrderTotal == confirmationTotal){
      Log.Message("Order details are correct on confirmation page");
    }
    else{
      merlinLogError("Order details are not correct on confirmation page");
    }      
  }else{
    merlinLogError("Order is not placed.")
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