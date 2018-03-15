//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectDirectory
//USEUNIT SelectGroupFromMainMenu

function C43098_Package_list_is_resetting_position()
{  
try{
    Log.AppendFolder("C43098_Package_list_is_resetting_position");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();  
    var keyWordNm ="Daily Admission";
     var packageNm ="Non Merlin Combo";
    var subPakNm ="Individual";
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
    WrapperFunction.setTextValue(PayamountTextBox,applyAmount);
    Log.Message("Apply remaining amount"); 
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
    Button.clickOnButton(NewOrder_Button);
    aqUtils.Delay(3000);
    allPackages.Refresh();
     aqUtils.Delay(1000);
   Log.Message("var");
        childCount =  allPackages.ChildCount;   
        aqUtils.Delay(1000);    
        for (var i=0;i<childCount; i++){
          if((allPackages.Child(i).Top + allPackages.Child(i).FlexObject.contentHeight) < groupXmccollectionscrollgroup.Top)
          { 
            var packageCaption = allPackages.Child(i).VGroup("labelAndRatesGroup").Group(0).Label("pkgLabel").Caption;
            aqUtils.Delay(500)
            if(packageCaption.includes(packageNm) && packageCaption.startsWith(packageNm))
            {           
                      merlinLogError("Package list is reset to the default position");                    
            }
           }        
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