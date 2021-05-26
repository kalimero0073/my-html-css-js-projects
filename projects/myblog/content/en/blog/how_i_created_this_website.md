+++
title = "How I put this website online in a few hours"
subtitle = ""
tags = ['web', 'IT']
date = 2021-04-02
draft = false

# For description meta tag
description = "How I put this website online in a few hours"

# Comment next line and the default banner wil be used.
banner = '/img/laptop_hands.jpg'

+++
## Prerequisites:
- Hugo installation (https://gohugo.io/getting-started/quick-start/#step-1-install-hugo)
- Hosting platform (e.g. Github Pages)
- Terminal - e.g. Git Bash
- Code editor - e.g. VSCode
- Chrome developer tools knowledge
- Basic HTML, CSS, markdown knowledge

## Steps:
- Create an empty folder (e.g. myblog)
```
$ mkdir myblog
```
- Clone a hugo project including a theme (e.g. https://themes.gohugo.io/hugo-theme-pico/) into a temporary directory "temp"
```
$ git clone https://github.com/negrel/hugo-theme-pico.git temp
```
- Copy the projects exampleSite into the website folder myblog and delete temp
```
$ cp -r temp/exampleSite/* myblog
$ rm -rf temp
```
- Run the setup.sh
```
$ cd myblog
$ ./setup.sh
```
- Run the local server
```
$ hugo server
```
- Open project in your code editor, read hugo's documentation and play around
- Build the project
```
$ hugo
```
- Deploy using the instructions from the hosting platform - files to be deployed are in the directory public, e.g. myblog/public/*
## Further information
- https://pages.github.com/ (free deployment)
- https://www.youtube.com/watch?v=x4q86IjJFag (Chrome developer tools crash course)
- https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
- https://web.stanford.edu/group/csp/cs21/htmlcheatsheet.pdf
- https://adam-marsden.co.uk/css-cheat-sheet

## References :
- https://gohugo.io/documentation/
- https://github.com/negrel/hugo-theme-pico

## Acknowledgement :
- Big thanks to Alexandre Negrel (designer of the theme)