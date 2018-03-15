function GetCurrentFolderExample()
{
   // Obtains the name of the current folder
   var sCurFold = aqFileSystem.GetCurrentFolder();
   Log.Message("sCurFold"+sCurFold);
   
   // Obtains information about the folder
   var FoldInfo = aqFileSystem.GetFolderInfo(sCurFold);
   
   // Gets the collection of the files located in the folder
   var FileCol = FoldInfo.Files;
   
   // Posts the file names to the test log
   while ( FileCol.HasNext() )
   {
     var aFile = FileCol.Next();
     Log.Message(aFile.Name)
   }
}