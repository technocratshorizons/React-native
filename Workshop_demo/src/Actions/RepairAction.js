
import * as firebase from "firebase";

//get repair detail by OrderNumber
export function getRepairDatailByOrderNumber(orderNumber) {
    return new Promise((resolve, reject) => {
        firebase.database().ref(`repairOrder/`).orderByChild('orderNumber')
            .equalTo(orderNumber)
            .once('value', (snapshot) => {
                console.log(Object.values(snapshot.val()), "Object.values(snapshot.val())Object.values(snapshot.val())")
                let data
                if (snapshot.exists()) {

                    data = Object.values(snapshot.val());
                    resolve(data[0])

                } else {
                    data = null
                    resolve(data)
                }
            }, function (err) {

                reject("please check your credential");
            });

    })

}

//get  repair data
export function getRepairDatail() {
    return new Promise((resolve, reject) => {
    let uid = '_qweqwe23423533453455';

       // let uid = firebase.auth().currentUser.uid;
        let repairArr = []
        firebase.database().ref(`repairOrder/`).orderByChild('uid').equalTo(uid).on('value', (snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((element, index) => {
                    let value = element.val()
                    repairArr.push(value)
                    //  console.log(repairArr)
                })
                if (repairArr && repairArr.length > 0) {
                    resolve(repairArr)
                }
            }
            else {
                reject("No list found")
            }
        }, (error) => {
            console.log(error, "error occur")
            reject(error)
        })
    })
}

//Get repair detail by vehicle number

export function getRepairDatailParticular(vehicleNumber) {
    return new Promise((resolve, reject) => {
    let uid = '_qweqwe23423533453455';

      //  let uid = firebase.auth().currentUser.uid;
        let repairArr = []
        firebase.database().ref(`repairOrder/`).orderByChild('vehicleNumber').equalTo(vehicleNumber).on('value', (snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val(), "element.val()element.val()element.val()")
                snapshot.forEach((element, index) => {
                    let value = element.val()
                    repairArr.push(value)
                    //  console.log(repairArr)
                })
                if (repairArr && repairArr.length > 0) {
                    resolve(repairArr)
                }
            }
            else {
                reject("No list found")
            }
        }, (error) => {
            console.log(error, "error occur")
            reject(error)
        })
    })
}


// Get repair detail for particular vehicle

export function getRepairDatailForParticular(vehicleNumber) {

    return new Promise((resolve, reject) => {
    let uid = '_qweqwe23423533453455';

      //  let uid = firebase.auth().currentUser.uid;
        //let value = {}
        firebase.database().ref(`repairOrder/`).orderByChild('vechicleNumber').equalTo(vehicleNumber).limitToLast(1).on('value', (snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
                snapshot.forEach((element, index) => {
                    //value = { id: element.val().key, workStatus: element.val().workStatus };
                    resolve(element.val())
                })
            }
            else {

                resolve(null)
            }
        }, (error) => {
            console.log(error, "error occur")
            resolve(null)
        })

    })
}


export function getNotes(orderNumber) {
    return new Promise((resolve, reject) => {
        let noteList = []
        let count = 0
        firebase.database().ref(`repairOrderNotes/`).orderByChild('orderNumber').equalTo(Number(orderNumber)).on('value', (snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
                snapshot.forEach((element, index) => {
                    count++
                    let value = element.val()
                    value['documents'] = element.val().documents ? Object.values(element.val().documents) : []
                    noteList.push(value)
                })
                if (noteList && noteList.length > 0 && count == snapshot.numChildren()) {
                    resolve(noteList)
                }
            }
            else {
                resolve(noteList)
            }
        }, (error) => {
            console.log(error, "error occur")
            reject(error)
        })
    })

}
