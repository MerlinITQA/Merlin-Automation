//USEUNIT Button
//USEUNIT Listbox
//USEUNIT POSObjectMapping
//USEUNIT Process
//USEUNIT TextBox
//USEUNIT XMLHandler

/** @function
@name AppLoginLogout.login
@description Login into the application.
*/

function login()
{  
  try{
   if(!userNameTxtBox.Exists)
   {
      var POSApp = Sys.WaitProcess("Passport POS");
       if(POSApp.Exists)
       {
          POSApp.Terminate();
       } 
      TestedApps.Passport_POS.Run();
      aqUtils.Delay(10000);
   }
   
   TextBox.setTextBoxValue(userNameTxtBox,"MerlinQA");
   TextBox.setTextBoxValue(passwordTxtBox,"Merlin17")
   Button.clickOnButton(loginBtn);
   Process.waitForElementEnable(homeButton);
   aqUtils.Delay(15000);
  }catch(e)
  { 
      Log.Message("Unable to login in to the application.");
  }
}
/***************************************************************************************/
/** @function
@name AppLoginLogout.loginCashier
@description Login into the application.
*/

function loginCashier()
{ 
   TextBox.setTextBoxValue(userNameTxtBox,"MerlinQACash");
   TextBox.setTextBoxValue(passwordTxtBox,"Merlin17")
   Button.clickOnButton(loginBtn);
   Process.waitForElementEnable(homeButton);
   aqUtils.Delay(15000);
 
}

/** @function
@name AppLoginLogout.superVisorCredentialsOffline
@description Login into the application.
*/

function superVisorCredentialsOffline()
{ 
   TextBox.setTextBoxValue(authorizationpopupUsernametext,"MerlinQA");
   TextBox.setTextBoxValue(authorizationpopupPasswordtext,"Merlin17")
   Button.clickOnButton(authorizationpopupOk); 
   aqUtils.Delay(5000);
 
}
/** @function
@name AppLoginLogout.loginSupportManager
@description Login into the application.
*/

function loginSupportManager()
{ 
   if(!SupportmanagerUsernameTextBox.Exists)
     {
        logOutButton.Click();
     }
   
   TextBox.setTextBoxValue(SupportmanagerUsernameTextBox,"MerlinQA");
   TextBox.setTextBoxValue(SupportmanagerPasswordTextBox,"Merlin17")
   Button.clickOnButton(SupportmanagerLoginButton);
   aqUtils.Delay(5000);
 
}
/***************************************************************************************/
/** @function
@name AppLoginLogout.logout
@description Logout from the application.
*/

function logout()
{
    //Process.waitForElementEnable(homeButton);
    //passportPOS.Click(1250, 27);
    try{
    logOutButton.Click();
    aqUtils.Delay(1000);
    if(Aliases.Passport_POS.wndApolloRuntimeContentWindow.alertCashOut.buttonNo.Exists){
      Aliases.Passport_POS.wndApolloRuntimeContentWindow.alertCashOut.buttonNo.Click();
      }
    if(Aliases.Passport_POS.wndApolloRuntimeContentWindow.alertLogOut.buttonYes.Exists){      
      Aliases.Passport_POS.wndApolloRuntimeContentWindow.alertLogOut.buttonYes.Click();
    }
    Log.Message("Logout successfully");
    }catch (e) {
	    merlinLogError("unable to logout");	    
    }
}

/*************************************************************************************/

/** @function
@name AppLoginLogout.loginSupportManger
@description Login into the loginSupportManger.
*/

function loginSupportManger()
{ 
  aqUtils.Delay(5000);
   TextBox.setTextBoxValue(supportmanagerUsernameTextBox,"MerlinQA");
   TextBox.setTextBoxValue(supportmanagerPasswordTextBox,"Merlin17")
   Button.clickOnButton(SupportmanagerLoginButton);
   Process.waitForElementEnable(OrderSearchWindow);
   
 
}

/***************************************************************************************/
/** @function
@name AppLoginLogout.login
@description Login into the application.
*/

function invalidloginCheck()
{ 
   if(!userNameTxtBox.Exists)
   {
      logOutButton.Click();
   }
   
   TextBox.setTextBoxValue(userNameTxtBox,"MerlinQAa");
   TextBox.setTextBoxValue(passwordTxtBox,"Merlin17a")
   Button.clickOnButton(loginBtn);
  
   if(loginErrorMessage.Exists)
   {
    Log.Message("Invalid login credentials");
    Button.clickOnButton(ErrorMessageButtonOk);
   }
   
   //aqUtils.Delay(15000);
 
} 
function savePrintFile()
{
  try{
  aqUtils.Delay(7000);
  var POSPrint;
  var dlgSaveTheFileAs;
  var progress;
  var comboBox;
  var edit;
  var projectPath =  ProjectSuite.Variables.Path ;
 // var FileName = (projectPath + "\printfiles\");
    
  var tcName =ProjectSuite.Variables.testCaseName; 
  
  POSPrint = Aliases.POSPrint;
  dlgSaveTheFileAs = POSPrint.dlgSaveTheFileAs;
  btnSaveFile = Aliases.POSPrint.dlgSaveTheFileAs.btnSaveFile;
//  progress = dlgSaveTheFileAs.WorkerW.ReBarWindow32.AddressBandRoot.progress;
// // progress.BreadcrumbParent.toolbarAddressLibrariesDocuments.Click(286, 9);
//  aqUtils.Delay(1000);
//   progress.BreadcrumbParent.toolbarAddressLibrariesDocuments.Click(286, 9);
//  progress.BreadcrumbParent.toolbarAddressLibrariesDocuments.Keys("c:\\mm");
//  aqUtils.Delay(1000);
//  progress.BreadcrumbParent.toolbarAddressLibrariesDocuments.Keys("[Enter]");
//  comboBox = progress.comboBox;  
//  comboBox.SetText("C:\\mm");
    var str = Project.TestItems.Current.ElementToBeRun.Caption;    
    var tcName =(str.split('-')[1]).trim(); 
    Log.Message("testCase name -- "+tcName);  
  comboBox = dlgSaveTheFileAs.DUIViewWndClassName.Explorer_Pane.FloatNotifySink.ComboBox;
  comboBox.editFileNameTextBox.Click(41, 7);
   aqUtils.Delay(500);
  comboBox.SetText("C:\\mm\\Make Reg Pack\\trunk\\Merlin_TestSuite\\Test1\\printfiles\\"+tcName+".xps");
  //dlgSaveTheFileAs.Click(260, 464);
   aqUtils.Delay(1000);
  btnSaveFile.Click();
  aqUtils.Delay(1000);
  if(Aliases.POSPrint.dlgSaveTheFileAs.btnCancel.Exists){
    Aliases.POSPrint.dlgSaveTheFileAs.btnCancel.Click();  
  }
  aqUtils.Delay(3000);
  
  }catch(e){
      Log.Warning("Unable to create print file");
  }
  
}