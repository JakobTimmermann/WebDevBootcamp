## Commands to not forget
### Start server.js in node watch mode
```bash
node --watch server.js
```
By running in watch mode, closing and restarting the server is obsolete.  
This is the (more up-to-date) alternative to the nodemon package, yet with a couple of features missing&nbsp;[[1]](https://levelup.gitconnected.com/you-might-not-need-nodemon-anymore-fbf33939adc3)

### Provide node.js (packages) autocomplection in VSCode 
```bash
npm install --save-dev @types/node
```

## Shortcut for Visual Studio Code
- Ctrl + k (switch to terminal)
- Ctrl + j (switch to editor)


## Div Layout
### CSS Flexbox 
<img src="css-flexbox.png" alt= “” width="70%" height="70%" style="width: calc(25rem + 10vw) ">

[Cheatsheet](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)  
[CSS Frog Game](https://appbrewery.github.io/flexboxfroggy/)  
Works good when divs have to be ordered in one dimension (horizontal or vertical).  
Some features to know: 
- flex-wrap: wrap/nowrap --> Make sure items are wrapped if they don't fit on screen. (set on parent/container)
- justify-content: flex-start/flex-end/center/space-between/space-around --> align flexbox elements along main axis. (set on parent/container)
- align-items: flex-start/.. --> align elements along the cross axis only affects the layout if height of container is set. (set on parent/containter)  
### CSS Grid 
Good for tables with rows and columns ![](./css-grid.png)
- Bootstrap Framework predefined CSS classes built on top of Flexbox  