# WHAT'S APP CLONE
A communication tool such as What's APP in ReactJS on web.
[Preview](https://suiramdev.github.io/whatsapp_clone)

## Built With
-   [ReactJS](https://reactjs.org)  - A JavaScript library for building user interfaces
-   [Material-UI](https://material-ui.com)  - A popular React UI framework
-   [Firebase](https://firebase.google.com)  - A real time database with no sql

## Authors
-   **Marius**  -  _Initial work_  -  [suiramdev](https://github.com/suiramdev)

## License
This project is licensed under the MIT License - see the LICENSE file for details

## Development note
### Firestore database lookup
```json
{
    "users": {
        "userID": {
            "email": "",
            "username": ""
        }
    },

    "conversations": {
        "conversationID": {
            "users": {
                "1": "referenceUser"
            },
            "messages": {
                "1": {
                    "sender": "referenceUser",
                    "text": "Hello world !",
                    "time": "timestamp"
                }
            }
        }
    }
}```