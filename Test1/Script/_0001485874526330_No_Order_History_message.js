//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT SelectDirectory


function _0001485874526330_No_Order_History_message()
{  
try{
      Log.AppendFolder("_0001485874526330_No_Order_History_message");
    InitializationEnviornment.initiliaze();
    AppLoginLogout.login(); 
    SelectDirectory.selectDirectory(Directory_OrderHistory);   
    if(labelNoOrderHistoryFound.Exists && !(aqString.Compare(labelNoOrderHistoryFound.Caption,"No Order History Found",true))){
        Log.Message("No Order History Found Message is displayed.");
    }else{
      merlinLogError("Message is not displyed");
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