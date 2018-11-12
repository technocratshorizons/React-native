import firebase from 'firebase';
import { AsyncStorage } from 'react-native'


export function addKilometers(data) {

    return new Promise((resolve, reject) => {
        firebase.database().ref().child('/kiloMeters').push().then(function (insertedData) {
            console.log(insertedData.key, "insertedData.key")
            data['key'] = insertedData.key
            console.log("data", data)
            firebase.database().ref('/kiloMeters/' + insertedData.key).update(data).then(function () {
                resolve(insertedData.key);
            }, function (err) {
                reject(err);
            });
        }, function (err) {
            console.log(err.message, "fgdgfdg")
            reject(err);
        });
    });
}

export function getKilometers(VehicleNumber) {

    return new Promise((resolve, reject) => {
        firebase.database().ref().child('/kiloMeters').orderByChild('VehicleNumber').equalTo(VehicleNumber).once('value').then(function (snapshot) {
            let getKilometerArr = []
            snapshot.forEach(element => {
                let item = element.val();
                item['key'] = element.key;
                getKilometerArr.push(item)
                console.log(getKilometerArr)
            });
            console.log("getLeadsListArr", getKilometerArr)
            if (getKilometerArr && getKilometerArr.length > 0) {
                resolve(getKilometerArr);
            } else {
                //reject('User LeadList not exist');
                resolve(getKilometerArr);
            }
        }, function (err) {
            console.log(err.message, "fgdgfdg")
            reject(err);
        })

    });
}
