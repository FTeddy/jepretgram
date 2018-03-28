# Jepretgram - A simple photo sharing app
Upload photo and share it with others!

# Server dev
Run this code on terminal in server folder
```
npm run dev
```

# Client dev
run this on terminal in client folder
```
npm run dev

// to make production files
npm run build
```

# Server Api

| Route          | HTTP   | Description  |
| -------------- |:------:| ------------:|
| /fb/    | GET   | Signup with new user |
| /pics/    | GET   | get recent images |
| /pics/:userId    | GET   | get user's pic |
| /pics/:picId    | GET   | get one pic |
| /pics/post/:userId    | POST   | post new image and caps |
| /pics/edit/:picId/:userId    | PUT   | edit image caps |
| /pics/delete/:picId/userId    | DELETE   | delete image |
| /vote/up/:picId/:userId    | POST   | voteup image |
| /vote/down/:picId/:userId    | POST   | delete vote of user in image |
