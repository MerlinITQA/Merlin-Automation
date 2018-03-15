//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
function C43121_Ensure_that_relevant_data_is_auto_populated()
{
try{
    Log.AppendFolder("C43121_Ensure_that_relevant_data_is_auto_populated");
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
      TextBox.setTextBoxValue(cdShippingzipti,"01923");
      Sys.Keys("[Enter]")
      aqUtils.Delay(2000);    
      var cityName = cdShippingcityti.Caption;
      var stateName =cdstateddShipping.DropDownList("stateDDL").Label("labelDisplay").Caption;
      var countryName = cdcountriesddShipping.Label("labelDisplay").Caption;
      if(compareStringObj(cityName,"Danvers")
       && compareStringObj(stateName,"Massachusetts")
       && compareStringObj(countryName,"United States")){
           Log.Message("Details are auto populated."); 
           Button.clickOnButton(cdOkbutton);
           aqUtils.Delay(2000);
            Button.clickOnButton(selectablebuttonCustomerdetailsb);
              if(compareStringObj(cityName,"Danvers")
               && compareStringObj(stateName,"Massachusetts")
               && compareStringObj(countryName,"United States")){
                  Log.Message("Details are auto populated.");    
                  Button.clickOnButton(cdOkbutton);
               }
               else{
                    merlinLogError("Details are not auto populated.");                
               }
       }
       else{
        merlinLogError("Details are not auto populated.");
        return;
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