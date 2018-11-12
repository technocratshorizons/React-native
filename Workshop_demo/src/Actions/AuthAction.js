import * as firebase from "firebase";
import { AsyncStorage } from "react-native";
// Count User Api 
export const addCountUser = (count) => {

    return new Promise((resolve, reject) => {
        firebase.database().ref(`counts/`).update({ totalUser: count }).then((res) => {
            resolve('Add count Successfully')
        })
    })
}
// Get User Count Api 
export const getCountUser = () => {

    return new Promise((resolve, reject) => {
        firebase.database().ref(`counts/`).child('totalUser').once('value', (snapshot) => {
            resolve(snapshot.val())
        })
    })
}

export const doCreateUser = (userId, data) => {

    return new Promise((resolve, reject) => {
        firebase.database().ref().child("/users/" + userId).set(data).then(function () {
            resolve("success");
        }, function (err) {
            reject(err);
        });
    })
}

export const userStatusCheck = (email) => {
    return new Promise((resolve, reject) => {

        firebase.database().ref(`users/`).orderByChild('email').equalTo(email).once('value', (snapshot) => {
            let user
            if (snapshot.exists()) {
                user = Object.values(snapshot.val());
                resolve(user[0])
            } else {
                user = null
                resolve(user)
            }
        }, function (err) {

            reject("please check your credential");
        });
    })
}


export const getUserExits = (uid) => {
    return new Promise((resolve, reject) => {
        
        firebase.database().ref(`users/`).orderByChild('uid').equalTo(uid).once('value', (snapshot) => {
            let user
            if (snapshot.exists()) {
                user = Object.values(snapshot.val());
                resolve(user[0])
                
            } else {
                
                user = null
                resolve(user)
            }
        }, function (err) {
            
            reject("please check your credential");
        });
    })
}

export const CreateUserWithEmailAndPassword = (user, password) => {
    return firebase.auth().createUserWithEmailAndPassword(user.email, password)
        .then(authUser => {
            if (authUser.user) {
                user['uid'] = authUser.user.uid;
                firebase.auth().doCreateUser(authUser.user.uid, user)
                    .then(() => {
                        firebase.auth().getCountUser().then((count) => {
                            count++

                            firebase.auth().addCountUser(count).then((resCount) => {
                                return 'add counts succefully'
                            }).catch((err) => {
                                console.log('eorrr count add 11111', err.message)
                            })
                        }).catch((err) => {
                            console.log('eorrr succefully 11111', err.message)
                        })
                    })
                    .catch(error => {
                        console.log('eorrr succefully 11111', error.message)
                        return 'sucess from api'
                    });
            } else {
                alert('User not exits')
            }

        })
        .catch(error => {
            console.log('eorrr succefully', error.message)
        });
}

// Get Edit profile Api 
export const getEditUser = (userId, data) => {

    return new Promise((resolve, reject) => {
        firebase.database().ref().child("/users/" + userId).once(data).then(function () {
            resolve("success");
        }, function (err) {
            reject(err);
        });
    })
}

export async function removeDeviceToken(uid) {
    let self = this;
    var i = 0, j = 0;
    var delete_data = [];
    return new Promise(async (resolve, reject) => {

        var devce_token = await AsyncStorage.getItem('devicetoken');
        let device_db = firebase.database().ref('/users/' + uid + '/device_tokens/')
            .orderByChild("deviceToken").equalTo(devce_token);
        device_db.once("value", function (snapshot) {
            var device_data = snapshot.val();
            for (let data in device_data) {

                i = i + 1;
                delete_data.push({ id: data });
            }

            if (delete_data.length != 0) {
                for (let delete_id of delete_data) {
                    firebase.database().ref('/users/' + uid + '/device_tokens/' + delete_id.id).remove().then(function () {
                        j = j + 1;

                        console.log('i', i);
                        console.log('j', j);
                        if (i == j) {
                            i = 0;
                            j = 0;
                            resolve('removed all device token');
                        }

                    }, function (err) {

                        reject(error);
                    });
                }
            } else {
                resolve('removed all device token');
            }
        }, function (error) {

            console.log("Error: " + error.code);
            reject(error);
        });
    });
}