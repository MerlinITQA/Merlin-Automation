//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu

function C17367_Reservations_Annual_Passes_Blocked()
{
 try {
      Log.AppendFolder("C17367_Reservations_Annual_Passes_Blocked");
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
      var keyWordNm1 ="Annual Pass";
      var flag = false;
      var KeyWordList=passportPOS.listListgroup;
      var cnt = Keyword_Listgroup.ItemCount;
      for (i=0;i< cnt; i++) 
      {
        if(Keyword_Listgroup.Item(i) == keyWordNm1)
        {
          flag = true;
          break;
        }
      }
      if(flag){
          merlinLogError("Annual Pass keyword is displayed.")
      }else{
          Log.Message("Annual Pass keyword is not displayed.")
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