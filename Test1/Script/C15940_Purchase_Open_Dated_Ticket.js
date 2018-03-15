//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder

function C15940_Purchase_Open_Dated_Ticket()
{ 
  try{
    Log.AppendFolder("C15940_Purchase_Open_Dated_Ticket");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login();
    placeOrder("Daily Admission","Open Dated","Children (Ages 3-12)",2,CommonCalender.getTodaysDate(),"Cash");
    AppLoginLogout.logout();
  }catch(e){
      merlinLogError("Exception occoured");
  } 
   finally { 
	    Log.PopLogFolder();     
    }
}