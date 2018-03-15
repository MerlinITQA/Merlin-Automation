function Test1()
{
  var passportPOS;
  var textInput;
  TestedApps.Passport_POS.Run();
  passportPOS = Aliases.Passport_POS.wndApolloRuntimeContentWindow.passportposPassportpos1;
  aqUtils.Delay(20000);
  textInput = passportPOS.textinputTxtusername;
  textInput.Click(34, 11);
  textInput.Keys("MerlinQA");
  textInput = passportPOS.textinputInputfield;
  textInput.Click(56, 18);
  textInput.Keys("Qe[BS]werty6%");
  passportPOS.buttonLoginbtn.ClickButton();
  passportPOS.Click(1331, 19);
}