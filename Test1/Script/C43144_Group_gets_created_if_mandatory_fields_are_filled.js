﻿//USEUNIT AppLoginLogout
//USEUNIT InitializationEnviornment
//USEUNIT PlaceOrder
//USEUNIT SelectGroupFromMainMenu
//USEUNIT WrapperFunction

function C43144_Group_gets_created_if_mandatory_fields_are_filled()
{
  
   try {
      	Log.AppendFolder("C43144_Group_gets_created_if_mandatory_fields_are_filled");
        InitializationEnviornment.initiliaze();
        AppLoginLogout.login();
        WrapperFunction.selectMainMenu(Groups_MainMenu);  
        Button.click(groupsCreateButton);
        aqUtils.Delay(1000);
        var currentDateAndTime =aqConvert.DateTimeToFormatStr( aqDateTime.Now(), "%#m/%#d/%Y %H:%M");
        var myGroupsName ="Name_test" + currentDateAndTime;  
        var externalSysRefCode = "Test" + currentDateAndTime;
        SelectGroupFromMainMenu.createNewTestGroup(myGroupsName,externalSysRefCode);
        groupsSearchOnUpdate.Click();
        Button.click(groupsClearButton);
        TextBox.setTextBoxValue(groupsNameti,myGroupsName);
        Button.click(groupsSerarchButton);    
        aqUtils.Delay(2000);
        groupsGride.scroller.Grid("grid").AccDataGridSkinInnerClass9(0).GridLayer("rendererLayer").FindChild("Caption",myGroupsName,0,true).Click();
        SelectGroupFromMainMenu.verifyCreatedNewGroup(myGroupsName,externalSysRefCode);
        AppLoginLogout.logout();      
    } catch (e) {
		    merlinLogError("Oops! There's some glitch in the script: " + e.message);
		    return;
	    }
	    finally {
		    Log.PopLogFolder();
	    } 
   
}