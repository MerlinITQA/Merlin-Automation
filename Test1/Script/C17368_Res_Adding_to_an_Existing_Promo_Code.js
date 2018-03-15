//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu

function C17368_Res_Adding_to_an_Existing_Promo_Code()
{
 try {
      Log.AppendFolder("C17368_Res_Adding_to_an_Existing_Promo_Code");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      var groupNm=defaultGroupName;
      var paymentTypeForReservation = "Cash";
      var keyWordNm ="Reservations";
      var packageNm ="No Payment Required Reservation 2";
      var subPakNm ="Individual";
      var qtyT = 1;
      var dateD =CommonCalender.getTodaysDate();
      placeROrderForNoMinimumPayment(groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD,paymentTypeForReservation)
      selectReservationRecordToAddReservation(groupNm);
      aqUtils.Delay(5000); 
      var keyWordNm1 ="Promo Codes";
      var packageNm = "Trade Group (RateV1)";
      var flag = false;
//       Keyword_Listgroup.MouseWheel(-1,0);
//      Keyword_Listgroup.MouseWheel(-1,0);
//      Keyword_Listgroup.MouseWheel(-1,0);
//      Keyword_Listgroup.MouseWheel(-1,0);
//      Keyword_Listgroup.Refresh();
//      WrapperFunction.selectKeywordName(keyWordNm1);    
//      WrapperFunction.setTextValue(PromoCodes_EnterPromoCodes,"RateV1");
//      PromoCodes_EnterPromoCodes.Keys("[Enter]");   
        WrapperFunction.setTextValue(textinputPromocodeinput,"RateV1");
        Button.clickOnButton(selectablebuttonSearchbutton);
        aqUtils.Delay(3000);     
     // aqUtils.Delay(2000);
      aqUtils.Delay(3000); 
      allPackages.Refresh();             
      var flag = false;
      var packageArray = new Array();      
      var childCount =  allPackages.ChildCount;         
      for (var i=0;i<childCount; i++){                    
        packageCaption= allPackages.Child(i).RichText("descLabel").Caption;
          if(packageCaption.includes(packageNm) && packageCaption.startsWith(packageNm))
          {
              flag = true;              
              merlinLogError("Promo code packages are displayed for reservation.");
          } 
      }
      if(flag){
          merlinLogError("Promo code packages are displayed for reservation.");
      }else{
          Log.Message("Promo code packages are not displayed.");
      }     
   } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally { 
	    Log.PopLogFolder();
    }
    AppLoginLogout.logout();        
}



