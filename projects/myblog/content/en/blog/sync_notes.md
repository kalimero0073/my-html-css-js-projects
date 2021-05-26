+++
title = "How I tried automating the synchronization of my KeepNote files between my office and home computer using Github"
subtitle = "Tools: Win10, Git with Github, Terminal"
tags = ['git', 'automation', 'IT']
date = 2021-04-01
draft = false

# For description meta tag
description = "(Unstable) automated sync of keepNote files using GitHub"

# Comment next line and the default banner wil be used.
banner = 'img/automation.jpg'

+++
## Open Issues:
- With Win UAC (User Account Control) enabled, the logoff or logon script may block -> as a solution one may fetch/push the keepnote files manually via the terminal.

## Prerequisites :
- Github account
- Windows 10
- Terminal (e.g. Git Bash)

## Steps :

- Go into the folder where you keep your files: e.g. \<path\>/_keepnote and initialize a git repository via e.g. Git Bash terminal:

```
$ cd <path>/_keepnote
$ git init
```

- Then create a repository on Github (https://docs.github.com/en/github/getting-started-with-github/create-a-repo) and connect your local folder with the remote repository using:

```
$ git remote add origin https://github.com/<your_username>/<your_repo>.git
```

- Add and upload your file to the remote repository:

```
$ git add .
$ git commit -m "initial commit"
$ git push origin master
```
- Create a PowerShell file "keepnotescript-office-push.ps1" in your repository (you can place it actually anywhere, but I prefer it placed within the repository as no sensitive data is included) and write a script that commits and pushes changes. Attention: this script applies only to the computer you are working on, except you keep the same directory structure on both. Here is the script content:
```
cd <path>\_keepnote 
git add .
git commit -m "made changes"
git push origin master
```
- Create a PowerShell file "keepnotescript-office-pull.ps1" in your repository (you can place it actually anywhere, but I prefer it placed within the repository as no sensitive data is included) and write a script that pulls changes. Attention: this script applies only to the computer you are working on, except you keep the same directory structure on both. Here is the script content:
```
cd <path>\_keepnote 
git pull origin master
```
- Add the references to the powershell files respectively to the Win10 logon and logoff by opening "gpedit.msc" - "Local Group Policy Editor". I followed the instructions on https://lifehacker.com/use-group-policy-editor-to-run-scripts-when-shutting-do-980849001. I added the "keepnotescript-office-pull.ps1" to the User Configuration > Windows Settings > Scripts (Logon/Logoff) > Logon and the "keepnotescript-office-push.ps1" to the User Configuration > Windows Settings > Scripts (Logon/Logoff) > Logoff. So every time when I logon to my computer the latest changes are pulled from Github, whereas when I logoff any changes in my local repository are pushed to Github. 
![*Local Group Policy Editor*](/img/blogposts/202104/add_logon_script.png)

- If you managed to configure it on your computer you can do the same on any other Win10 computer. As a result, you will have your notes nicely synchronized and you will not have to bother about their completeness when changing from home to office or vice versa. Keep in mind that if you change the path of your note files you will have to update the path in the scripts as well.
- For testing, update your notes, logoff and logon on your computer and see if your changes were pushed to Github. Furthermote, add a file (e.g. test.txt) in Github, logoff and logon and see if the file was pulled from Github to your local repository.

## Troubleshooting :
- If you run into issues (e.g. mmc.exe has been blocked) then google solutions - in most of the cases you will find a satisfying answer (e.g. https://www.wintips.org/fix-mmc-exe-this-app-has-been-blocked-for-your-protection/). I disabled the UAC in Win10, added the files and then reactived it again as it is a Win10 security feature.
- For issues with PowerShell scripts you may wrap your code in a try-catch and log to see what happens: 
```
$ErrorActionPreference = "Stop"
try {
    Start-Transcript -Path "C:\Users\<user>\<path>\transcript0.txt"
    cd <path>\_keepnote 
    git add .
    git commit -m "made changes"
    git push origin master
} 
catch { "An error occurred." }
```
- Attention: Place the PowerShell script from within the tab "PowerShell Scripts" within the "Local Group Policy Editor".

## Additional information :
- If you wish to synchronize your notes between different OS, e.g. Linux and Win10 you can google how to run scripts on logon or logoff on the respective OS. For Ubuntu 20.04 for example I can recommend following link (however, I did not test it myself): https://linuxconfig.org/how-to-run-script-on-startup-on-ubuntu-20-04-focal-fossa-server-desktop

## References :
- https://docs.github.com/en/github/getting-started-with-github/create-a-repo
- https://lifehacker.com/use-group-policy-editor-to-run-scripts-when-shutting-do-980849001
- https://www.wintips.org/fix-mmc-exe-this-app-has-been-blocked-for-your-protection/
- https://linuxconfig.org/how-to-run-script-on-startup-on-ubuntu-20-04-focal-fossa-server-desktop