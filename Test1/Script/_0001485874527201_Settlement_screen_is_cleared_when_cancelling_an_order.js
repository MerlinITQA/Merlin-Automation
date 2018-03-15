//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectDirectory
//USEUNIT SelectGroupFromMainMenu

function _0001485874527201_Settlement_screen_is_cleared_when_cancelling_an_order()
{  
try{
      Log.AppendFolder("_0001485874527201_Settlement_screen_is_cleared_when_cancelling_an_order");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();  
    var keyWordNm ="Daily Admission";
    var packageNm ="3 site Combi";
    var subPakNm ="Adult";
    var qtyT = 2;
    dt = CommonCalender.getTodaysDate(); 
    var dateD = aqConvert.DateTimeToFormatStr(dt, "%#m/%#d/%Y");
       
    var keyWordNm1 ="Daily Admission";
    var packageNm1 ="Date/Time";
    var subPakNm1 ="Adult";
    var qtyT1 = 2;
    dt = CommonCalender.getTomorrowsDate(); 
    var dateD1 = aqConvert.DateTimeToFormatStr(dt, "%#m/%#d/%Y");
    addNewTicket(keyWordNm,packageNm,subPakNm,qtyT,dateD);
    aqUtils.Delay(3000);
    var temp =totalOnOrderScreen.Caption;
    var firstOrderTotal = parseInt((temp.split('$')[1]).trim());
    addNewTicket(keyWordNm1,packageNm1,subPakNm1,qtyT1,dateD1);
	  aqUtils.Delay(3000);
    temp =totalOnOrderScreen.Caption;
    var secondOrderTotal = parseInt((temp.split('$')[1]).trim()) - firstOrderTotal;
    finilizeOrder();
    aqUtils.Delay(3000);
    var expectedSettlemtnttotal = orderDetailsTotal.Caption;
    var applyAmount= (expectedSettlemtnttotal.split('$')[1]).trim(); 
    selectPaymentTypeAddRequiredFields("Cash");
    var halfAmt = parseInt(applyAmount)/2 ;
    WrapperFunction.setTextValue(PayamountTextBox,halfAmt);
    Log.Message("Apply remaining amount"); 
    Button.clickOnButton(applyButton); 
    selectPaymentTypeAddRequiredFields("Voucher");
    WrapperFunction.setTextValue(PayamountTextBox,halfAmt);            
    Button.clickOnButton(applyButton);
    SelectDirectory.selectDirectory(Directory_CancelOrder);
    aqUtils.Delay(2000);
    
    if(finilizeOrder_button.Visible  && allPackages.Visible ) {
      Log.Message("All payment details are cleared from the Settlement screen.");
    }else{
      merlinLogError("All payment details are not cleared from the Settlement screen.");
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