var Process = require("Process");
var Button = require("Button");
var InitializationEnviornment = require("InitializationEnviornment");
var TextBox = require("TextBox");

// Application initalization
  var app =  TestedApps.Items(0);
  wnd = Aliases.Passport_POS.wndApolloRuntimeContentWindow;
  var passportPOS = wnd.passportposPassportpos1;
  var usernameTxtBox= passportPOS.textinputTxtusername;
  var passwordTxtBox = passportPOS.textinputInputfield;
  var loginBtn = passportPOS.buttonLoginbtn;
  var logoutBtn = passportPOS.buttonLoginbtn;
  var hometBtn = passportPOS.buttonLoginbtn;
  
function LoginLogOut()
{

    InitializationEnviornment.initiliaze();
    TextBox.EnterText(usernameTxtBox,"MerlinQA");
    TextBox.EnterText(passwordTxtBox,"Qwerty6%");
    Button.click(loginBtn);
    Process.waitForElementEnable(hometBtn);
    passportPOS.Click(1250, 27);
}
