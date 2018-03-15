function Test1()
{
  TestedApps.Passport_POS.Run();
}

function Test2()
{
  var passportPOS;
  var textInput;
  TestedApps.Passport_POS.Run();
  passportPOS = Aliases.Passport_POS.wndApolloRuntimeContentWindow.passportposPassportpos1;
  textInput = passportPOS.textinputTxtusername;
  textInput.Click(31, 20);
  textInput.Keys("MerlinAq[Tab]");
  passportPOS.textinputInputfield.Keys("![Tab]");
}

function Test3()
{
  
}

function Test4()
{
  var textInput;
  TestedApps.Passport_POS.Run();
  textInput = Aliases.Passport_POS.wndApolloRuntimeContentWindow.passportposPassportpos1.textinputInputfield;
  textInput.Click(23, 12);
  textInput.Keys("qwert65");
}