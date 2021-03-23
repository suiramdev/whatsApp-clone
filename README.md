# WHAT'S APP CLONE
A communication tool such as What's App with ReactJS and Firebase on web.
[Preview](https://suiramdev.github.io/whatsapp_clone)

## Built With
-   [ReactJS](https://reactjs.org)  - A JavaScript library for building user interfaces
-   [Material-UI](https://material-ui.com)  - A popular React UI framework
-   [Firebase](https://firebase.google.com)  - A real time database with no sql

## License
This project is licensed under the MIT License - see the LICENSE file for details

## Development note
### Firestore database lookup
```json
{
    "users": {
        uid: {
            "email": "",
            "id": XXXXXX
        }
    },

    "conversations": {
        uid: {
            "participants": {
                uid,
                ...
            },
            "messages": {
                {
                    "from": uid,
                    "content": "",
                    "date": XXXXXXX
                }
            }
        }
    }
