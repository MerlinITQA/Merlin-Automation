//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceReservationOrder
//USEUNIT ConvertReservationsToPurchase

function _0001485874440504_Reservations_Convert_to_Purchase_Ticket_Payment()
{
  InitializationEnviornment.initiliaze();
  AppLoginLogout.login();
  placeReservationOrderForMinimumPayment();
  convertReservationsToPurchase(defaultGroupName,"Ticket");
  AppLoginLogout.logout(); 
}
