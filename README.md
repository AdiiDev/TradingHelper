# Trading Helper App

Welcome to the Trading Helper App repository! The application has been designed for traders who want to have a centralized platform for keeping track of their trades and analyzing them in real-time using various widgets.

**Important!**
This repository has been temporarily shared due to one of the developers actively seeking employment. It is not a public project, and therefore, commercial usage of this code is not permitted.

## Tech Stack

**Front-end:** JavaScript, React with Redux, Vite, Material UI, Electron, React-hook-form, i18n, Toast, Yup, TradingView Widgets

**Back-end:** ASP.NET Web API (C#), NHibernate/FluentNhibernate, Electron.NET, MySQL/MSSQL


## Authors

- Adrian Krysiak [@AdiiDev](https://github.com/AdiiDev)
- Jacek Wiśniewski [@roller0201](https://github.com/roller0201)

## Demo

Due to the nature of being a desktop application, the only way to experience a demo of the Numerology Application is by requesting access via email. Please reach out to numerologyapplicationhelp@gmail.com to request access and instructions on how to run the application in your own environment.

## App review

During the initial launch of the program at the client's end, a configuration page will be displayed. The client will be required to set up necessary components to proceed with the application. Once the configuration is completed, the client will be able to start using the application. Later on, the configuration can be modified in the application settings.

![Config Page](https://github.com/AdiiDev/TradingHelper/blob/main/Trading/docs/ConfigPage.png)

The Trades page is where we can add, edit, and delete trades. It serves as a centralized hub for storing all the data related to our trades. With the added functionalities of table configuration and filtering using the sidebar drawer, we can conveniently manage our trades. By adding a broker context to the application, we can make decisions throughout the entire application about which broker we want to trade with.

![Trades Table](https://github.com/AdiiDev/TradingHelper/blob/main/Trading/docs/TradesTable.png)

![Trades Table Config](https://github.com/AdiiDev/TradingHelper/blob/main/Trading/docs/TradesTableConfig.png)

![Trades Drawer](https://github.com/AdiiDev/TradingHelper/blob/main/Trading/docs/TradesFilterDrawer.png)

![Trades Form](https://github.com/AdiiDev/TradingHelper/blob/main/Trading/docs/TradesForm.png)

The dictionaries page allows the user to easily add, edit and delete records added by the user.

![Dictionaries Page](https://github.com/AdiiDev/TradingHelper/blob/main/Trading/docs/DictionariesPage.png)

The widget page is the centerpiece of this application, serving as the command center for every respectable trader. It offers the ability to view countless trades on a single screen. Furthermore, users can create custom page layouts and navigate between them seamlessly. Additional drawers provide quick access to essential data for trade analysis.

![Widget Page](https://github.com/AdiiDev/TradingHelper/blob/main/Trading/docs/WidgetsMultiView.png)

![Widget FullScreen](https://github.com/AdiiDev/TradingHelper/blob/main/Trading/docs/WidgetsPageFullScreen.png)

![Widget Functionality](https://github.com/AdiiDev/TradingHelper/blob/main/Trading/docs/WidgetsTradeMultiFunctionality.png)

![Widget Functionality v2](https://github.com/AdiiDev/TradingHelper/blob/main/Trading/docs/WidgetsTradeMultiFunctionality2.png)

Our application offers multiple options that allow users to customize its functionality according to their individual preferences. One of these features is the ability to choose between a dark or light theme, allowing users to adjust the app's appearance to their visual preferences. Additionally, the application provides the option to switch between English and Polish languages, enabling users to use the app in their preferred language. This flexibility allows users to personalize the application according to their needs and preferences.

![Preferences](https://github.com/AdiiDev/TradingHelper/blob/main/Trading/docs/ChangeThemeAndLanguage.png)

## Optimizations

By migrating our application from Create React App (CRA) to Vite, we have significantly optimized its performance. Vite's fast build times and efficient development server have greatly improved our development workflow. The instant hot module replacement and on-demand compilation provided by Vite have resulted in faster reloading and quicker feedback during development. 

## Getting Started

Clone the project

```bash
  git clone https://github.com/AdiiDev/TradingHelper/tree/main/Trading
```

Go to the project directory

```bash
  cd Trading/clientApp
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run win
```

## Debugging Numerology App


**Front-end:**

```
npm run win,  debugger,  console.log()
```
**Back-end:**

```
breakpoint
```

**Back-end-WIN:** 
While debugging the Windows version of the application on the backend side, it was necessary to use Visual Studio's debugging features. 

```
 This involved selecting "Debug" from the menu, then choosing "Attach to Process," and finally selecting the specific process to attach to.
```

## Build

To build application for windows use command

```
electronize build /target win /PublishSingleFile false /PublishReadyToRun false
```


## Feedback

If you have any feedback, please reach out to us at numerologyapplicationhelp@gmail.com


## Support

For support, email - numerologyapplicationhelp@gmail.com


