//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu

function _0001485874470574_Res_Modify_Increase_tickets_no_minimum_pay()
{
try{
      Log.AppendFolder("_0001485874470574_Res_Modify_Increase_tickets_no_minimum_pay");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      aqUtils.Delay(2000);
      var groupNm=defaultGroupName;
      var paymentTypeForReservation = "Cash";
      var keyWordNm ="Reservations";
      var packageNm ="No Payment Required Reservation 2";
      var subPakNm ="Individual";
      var qtyT = 1;
      var dateD =CommonCalender.getTodaysDate();  
  
      orderForAddReservationForMinimumAndNoPayment(false,groupNm,keyWordNm,packageNm,subPakNm,qtyT,dateD,paymentTypeForReservation);
      AppLoginLogout.logout();
   } catch (e) {
  	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
      }
      finally { 
  	    Log.PopLogFolder();
      }    
}