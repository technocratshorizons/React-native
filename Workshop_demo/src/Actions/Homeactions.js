import firebase from 'firebase';
import { AsyncStorage } from 'react-native'
export const addVehicles = (uid, data) => {

    return new Promise((resolve, reject) => {
        firebase.database().ref(`users/${uid}/vehicles`).push(data).then(function () {
            resolve("success");
        }, function (err) {
            reject(err);
        });
    })
}

export const getVehicles = (uid) => {
    return new Promise((resolve, reject) => {
        firebase.database().ref().child('/userVehicles').orderByChild('uid').equalTo(uid).once('value').then(function (snapshot) {
            let vehicleList = []
            snapshot.forEach(element => {
                let item = element.val();
                item['key'] = element.key;
                vehicleList.push(item)
                console.log(vehicleList)
            });

            console.log("vehicleList", vehicleList)
            if (vehicleList && vehicleList.length > 0) {

                resolve(vehicleList);
            } else {

                //reject('User LeadList not exist');
                resolve(vehicleList);
            }
        }).catch((err) => {

            console.log(err)
        })
    });
}

export const getVehiclesByNotification = (vehicleNumber) => {
    debugger
    return new Promise((resolve, reject) => {
        firebase.database().ref().child('/userVehicles').orderByChild('vehicleNumber').equalTo(vehicleNumber).once('value').then(function (snapshot) {
            let vehicleList = []
            snapshot.forEach(element => {
                let item = element.val();
                item['key'] = element.key;
                vehicleList.push(item)
                console.log(vehicleList)
            });

            console.log("vehicleList", vehicleList)
            if (vehicleList && vehicleList.length > 0) {
                debugger
                resolve(vehicleList);
            } else {
                debugger
                //reject('User LeadList not exist');
                resolve(vehicleList);
            }
        }).catch((err) => {
            debugger
            console.log(err)
        })
    });
}


export const deleteVehicles = (key, uid) => {

    return new Promise((resolve, reject) => {
        firebase.database().ref(`users/${uid}/vehicles/${key}`).remove().then((res) => {

            resolve("success");
        }, function (err) {
            reject(err);
        })
    })
}


// export const editVehicles = (vehicleInfo, key, userId) => {
//     return new Promise((resolve, reject) => {
//         firebase.database().ref(`users/${userId}/vehicles/${key}`).update(vehicleInfo).then((res) => {
//             resolve("success");
//         }, function (err) {
//             reject(err);
//         })
//     })
// }

export const editVehicles = (vehicleInfo, key, userId) => {

    return new Promise((resolve, reject) => {
        firebase.database().ref(`userVehicles/${key}`).update(vehicleInfo).then((res) => {
            resolve("success");
        }, function (err) {
            reject(err);
        })
    })
}


export const addPaymentData = (userId, data) => {

    return new Promise((resolve, reject) => {
        firebase.database().ref(`invoices/`).push().then((insertedData) => {
            data['key'] = insertedData.key;
            firebase.database().ref(`invoices/${insertedData.key}`).set(data).then(function () {
                resolve("success");
            }, function (err) {
                reject(err);
            });
        })
    })
}

//get paid payments
export const getPayments = (userId) => {
    return new Promise((resolve, reject) => {
        firebase.database().ref(`/invoices/`).orderByChild('uid').equalTo(userId).once('value', (snapshot) => {
            let myPayments = []
            if (snapshot.exists()) {

                snapshot.forEach(element => {
                    let item = element.val();
                    item['key'] = element.key;
                    myPayments.push(item)
                    console.log(myPayments)
                });
                console.log("myPayments", myPayments)
                if (myPayments && myPayments.length > 0) {
                    resolve(myPayments);
                } else {
                    resolve(myPayments);
                }
            }
            else {
                resolve(myPayments)
            }


        }, function (err) {

            reject(err);
        })
    })
}


//get pending payments
export const getPyamentsPending = (userId) => {
    return new Promise((resolve, reject) => {
        firebase.database().ref(`/repairOrder/`).orderByChild('uid').equalTo(userId).once('value', (snapshot) => {
            let myPendingPayments = []
            if (snapshot.exists()) {
                snapshot.forEach(element => {
                    let item = element.val();
                    item['key'] = element.key;
                    myPendingPayments.push(item)
                    console.log(myPendingPayments)
                });
                console.log("myPendingPayments", myPendingPayments)
                if (myPendingPayments && myPendingPayments.length > 0) {
                    resolve(myPendingPayments);
                } else {
                    resolve(myPendingPayments);
                }
            }
            else {
                resolve(myPendingPayments)
            }
        }, function (err) {

            reject(err);
        })
    })
}

export const getInvoices = (userId) => {
    return new Promise((resolve, reject) => {

        firebase.database().ref(`/invoices`).orderByChild('uid').equalTo(userId).once('value', (snapshot) => {

            let myInvoices = []
            if (snapshot.exists()) {
                snapshot.forEach(element => {
                    let item = element.val();
                    item['key'] = element.key;
                    myInvoices.push(item)
                    console.log(myInvoices)
                });
                console.log("myInvoices", myInvoices)
                if (myInvoices && myInvoices.length > 0) {
                    resolve(myInvoices);
                } else {
                    resolve(myInvoices);
                }
            }
            else {
                resolve(myInvoices)
            }


        }, function (err) {

            reject(err);
        })
    })
}