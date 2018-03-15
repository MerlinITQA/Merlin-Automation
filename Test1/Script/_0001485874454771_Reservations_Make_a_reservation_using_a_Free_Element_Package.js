//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder

function _0001485874454771_Reservations_Make_a_reservation_using_a_Free_Element_Package()
{
try{
      Log.AppendFolder("_0001485874454771_Reservations_Make_a_reservation_using_a_Free_Element_Package");
      InitializationEnviornment.initiliaze();
      AppLoginLogout.login();
      placeReservationOrderForMinimumPayment();
      AppLoginLogout.logout();
    } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);	    
    }
    finally { 
	    Log.PopLogFolder();
    }   
}
