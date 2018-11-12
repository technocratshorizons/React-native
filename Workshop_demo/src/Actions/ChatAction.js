import * as firebase from "firebase";
import getStore from '../../src/Store';
let store = getStore()


//send message to an order using orderNumber
export const sendMessage = (message, notification) => {
    firebase.database().ref(`messages/${message.orderId}`).push(message)
    updateAdminCount(notification)
}

export const getMessageNotifications = () => {

    return new Promise((resolve, reject) => {
    let uid = '_qweqwe23423533453455';

       // let uid = firebase.auth().currentUser.uid;
        firebase.database().ref("notifications").orderByChild('uid').equalTo(uid).on('value', (snapshot) => {

            let getMessageNotifications = []

            if (snapshot.exists()) {

                getMessageNotifications = Object.values(snapshot.val())

                resolve(getMessageNotifications)
            } else {

                resolve(getMessageNotifications)
            }
        })
    })
}


export const updateAdminCount = (notification) => {
    return new Promise((resolve, reject) => {

        firebase.database().ref(`notifications/${notification.orderNumber}`).once("value", snpashort => {

            let getUnReadMessage = []

            if (snpashort.exists()) {



                firebase.database().ref(`notifications/${notification.orderNumber}`).update({ adminCount: snpashort.val().adminCount + 1, clientCount: 0 }).then(res => {


                })
                // getUnReadMessage = Object.values(snpashort.val())
                resolve(getUnReadMessage)
            } else {

                firebase.database().ref(`notifications/${notification.orderNumber}`).update(notification).then(res => {


                })

                resolve(getUnReadMessage)
            }
        })
    })
}



export const updateAdminCountNavigate = (notification) => {
    return new Promise((resolve, reject) => {

        firebase.database().ref(`notifications/${notification.orderNumber}`).once("value", snpashort => {

            let getUnReadMessage = []

            if (snpashort.exists()) {

                firebase.database().ref(`notifications/${notification.orderNumber}`).update({ clientCount: 0 }).then(res => {
                })
                resolve(getUnReadMessage)
            }
            else {
                resolve(getUnReadMessage)
            }

        })
    })
}

export const sendEmail = (email) => {

    return new Promise((resolve, reject) => {

        let key = firebase.database().ref('emails').push().key
        firebase.database().ref('emails').push().then(function (insertedData) {

            email['key'] = insertedData.key

            firebase.database().ref(`emails/${insertedData.key}`).set(email).then(function () {
                debugger
                resolve(insertedData.key);
            }, function (err) {
                reject(err);
            });
        }, function (err) {
            console.log(err.message, "fgdgfdg")
            reject(err);
        });
    })
}


// export const getAllNofication = (userId) => {
//     debugger
//     return new Promise((resolve, reject) => {
//         firebase.database().ref(`notifications`).orderByChild('uid').equalTo(userId).on("value", snapshot => {
//             let totalNotification = []
//             let totalCountForNotification = 0
//             if (snapshot.exists()) {

//                 totalNotification = Object.values(snapshot.val())
//                 console.log("totalNotification", totalNotification)
//                 // totalCountForNotification = totalNotification.map((item, index) => {
//                 //     return item.clientCount
//                 // })
//                 for (var i = 0; i < totalNotification.length; i++) {
//                     console.log(totalNotification[i].clientCount)
//                     let value = totalNotification[i]
//                     totalCountForNotification = totalCountForNotification + value.clientCount
//                 }
//                 store.dispatch({ type: 'NOTIFICATION_COUNT', notification_count: totalCountForNotification })
//                 resolve(totalNotification)
//                 debugger
//             }
//             else {
//                 debugger
//                 resolve(totalNotification)
//             }
//         })
//     })
// }
