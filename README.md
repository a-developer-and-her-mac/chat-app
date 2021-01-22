# Chatter

Chatter is a simple chat application, built with React Native. 

### Installation

Chatter requires a few things to make it run. 
Clone the repo, install the dependencies and get started!

```sh
$ mkdir chatter_app && cd chatter_app
$ git clone https://github.com/a-developer-and-her-mac/chat-app.git
$ npm install expo-cli --global
$ npm install 
$ expo start
```

### Data Storage
The messages in this app are stored in Google Firebase, so running this project will require you to create a project in Google Firebase. Make sure you choose "Firestore Database" and not "Realtime Database", and you'll need to replace my credentials in `Chat.js` with your own before trying to run the app. Follow the initial steps in [this article](https://codinglatte.com/posts/how-to/how-to-create-a-firebase-project/) to create a project. Once you create the project choose "add firebase to your web app" and take the firebase config info from that to replace my credentials. 

### Errors with `npm install`?
If you are getting weird errors with `npm install` try installing watchman with homebrew first.
`$ brew install watchman`
Then, if it still acts weird, try following the steps in [this article](https://medium.com/@mrjohnkilonzi/how-to-resolve-no-xcode-or-clt-version-detected-d0cf2b10a750)



