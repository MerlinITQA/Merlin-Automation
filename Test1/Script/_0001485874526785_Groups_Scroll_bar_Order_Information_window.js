//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT WrapperFunction
//USEUNIT VerifyCheckProperty

function _0001485874526785_Groups_Scroll_bar_Order_Information_window()
{
	try {
    Log.AppendFolder("_0001485874526785_Groups_Scroll_bar_Order_Information_window"); 
   InitializationEnviornment.initiliaze();
  AppLoginLogout.login(); 
  var myGroupsName = defaultGroupName;
  var keyWordNm ="Daily Admission";
  var packageNm ="3 site Combi";
  var subPakNm ="Children (Ages 3-12)";
  var qtyT = 2;
  dt = CommonCalender.getTodaysDate(); 
  var dateD = aqConvert.DateTimeToFormatStr(dt, "%#m/%#d/%Y"); 
  var verifyDateFormatPrefix = aqConvert.DateTimeToFormatStr(dateD, "%#m/%#d/%Y");
  var givenPaymentType ="Cash";
  selectGroupFromMainMenu(myGroupsName);
  clickBuyTicketsButton();
  placeOrder(keyWordNm,packageNm,subPakNm,qtyT,dateD,givenPaymentType); 
  selectGroupFromMainMenuWithOrderedRecord(myGroupsName);
  aqUtils.Delay(3000);
        var cC = orderinfoResDataGrid.wColumnCount;
        var rC = 0;
		    rC = orderinfoResDataGrid.wRowCount;
        for ( rowC = 0 ; rowC <  rC ; rowC++){
            var displayPkg = orderinfoResDataGrid.wValue(rowC ,1);           
            var displaySubPkg =  orderinfoResDataGrid.wValue(rowC ,2);
            var displayDt = orderinfoResDataGrid.wValue(rowC ,3);            
            var displayQty = orderinfoResDataGrid.wValue(rowC ,4);
            var displayTotal =  orderinfoResDataGrid.wValue(rowC ,5);
            var displayStatus =  orderinfoResDataGrid.wValue(rowC ,6);
             compareStringObj(packageNm,displayPkg);
              compareStringObj(subPakNm,displaySubPkg);
              if (displayDt.includes(verifyDateFormatPrefix) /*&& displayDt.endsWith(tm)*/){                
                    Log.Message("Dates are equal"); 
              }else{
                  merlinLogError("Date is not matching");
              }
              compareStringObj(qtyT,displayQty);
               compareStringObj("In Process",displayStatus);            
        }    
  Button.clickOnButton(resOrderInfoClosebutton);  
  AppLoginLogout.logout();
} catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }     
}