
function Test1()
{
  var wnd;
  var passportPOS;
  var textInput;
  TestedApps.Passport_POS.Run();
  wnd = Aliases.Passport_POS.wndApolloRuntimeContentWindow;
  passportPOS = wnd.passportposPassportpos1;
  textInput = passportPOS.textinputTxtusername;
  textInput.Click(46, 19);
  textInput.Keys("MerlinAQ");
  textInput = passportPOS.textinputInputfield;
  textInput.Click(44, 5);
  textInput.Keys("Qwerty6%");
  passportPOS.buttonLoginbtn.ClickButton();
  wnd.alertError.alertform0.buttonOk.ClickButton();
}
module.exports.Test1 = Test1;

function Test2()
{
  Aliases.explorer.wndShell_TrayWnd.ReBarWindow32.MSTaskSwWClass.MSTaskListWClass.Click(697, 14);
  Aliases.Passport_POS.wndApolloRuntimeContentWindow.passportposPassportpos1.Click(1250, 27);
}