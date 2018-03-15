//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT WrapperFunction
//USEUNIT VerifyCheckProperty

function C16108_Scroll_bar_removed_from_the_Order_Information()
{
 try {
    Log.AppendFolder("C16108_Scroll_bar_removed_from_the_Order_Information");
     InitializationEnviornment.initiliaze();
    AppLoginLogout.login(); 
    var myGroupsName = defaultGroupName;
    aqUtils.Delay(2000);
    selectGroupFromMainMenu(myGroupsName);
    aqUtils.Delay(2000);
    groupUpdateDatagridOrderHistory.ClickCell(0,0);
    aqUtils.Delay(2000);
    if(orderinfoResDataGridScroller.VScrollBar("verticalScrollBar").Visible ||
          orderinfoResDataGridScroller.HScrollBar("horizontalScrollBar").Visible ){
      merlinLogError("A scroll bar is present");
    }else{
      Log.Message("A scroll bar is Not present");
    }
    Button.clickOnButton(resOrderInfoClosebutton); 
       
    AppLoginLogout.logout(); 
  } catch (e) {
	    merlinLogError("Oops! There's some glitch in the script: " + e.message);
	    return;
    }
    finally {
	    Log.PopLogFolder();
    } 
}