/**
 * Functions are mapped to blocks using various macros
 * in comments starting with %. The most important macro
 * is "block", and it specifies that a block should be
 * generated for an **exported** function.
 */

//% color="#00AD0F" weight=100
//% groups=['Project 3.03', 'Data', 'Components']
namespace bitlink {

    //% block
    //% group="Project 3.03"
    export function addIdToArrays(receivedName: string, nameArray: string[], numberOfPings: number[]) {
        if (nameArray.length > 0) {
            for (let _i = 0; _i < nameArray.length; _i++) {
                if (receivedName == nameArray[_i]) {
                    numberOfPings[_i]++;
                    return
                }
            }
        }
        nameArray.push(receivedName)
        numberOfPings.push(1)
    }

    

    //% block
    //% group="Project 3.03"
    export function printNamesAndPings(nameArray: string[], numberOfPings: number[]){
        for (let _i = 0; _i < nameArray.length; _i++){
            basic.showString(nameArray[_i])
            basic.showNumber(numberOfPings[_i])
        }
    }

    //% block
    //% group="Data"
    export function emptyStringArray() : string[]{
        let array: string[] = []
        return array
    }

    //% block
    //% group="Data"
    export function pushValue(value: string, array: string[]) {
        array.push(value);
    } 

    let _DHTtemperature: number = 0.0
    let _DHThumidity: number = 0.0
    let _DHTreadSuccessful: boolean = false

    //% block
    //% group="Components"
    export function queryDht11(pin: DigitalPin) {
        let checksum: number = 0
        let checksumTmp: number = 0
        let dataArray: boolean[] = []
        let resultArray: number[] = []
        for (let index = 0; index < 40; index++)
            dataArray.push(false)
        for (let index = 0; index < 5; index++)
            resultArray.push(0)

        pins.digitalWritePin(pin, 0) //begin protocol
        basic.pause(18)
        pins.setPull(pin, PinPullMode.PullUp) //pull up data pin if needed
        pins.digitalReadPin(pin)
        control.waitMicros(20)
        while (pins.digitalReadPin(pin) == 1);
        while (pins.digitalReadPin(pin) == 0); //sensor response
        while (pins.digitalReadPin(pin) == 1); //sensor response

        //read data (5 bytes)
        for (let index = 0; index < 40; index++) {
            while (pins.digitalReadPin(pin) == 1);
            while (pins.digitalReadPin(pin) == 0);
            control.waitMicros(28)
            //if sensor pull up data pin for more than 28 us it means 1, otherwise 0
            if (pins.digitalReadPin(pin) == 1) dataArray[index] = true
        }

        //convert byte number array to integer
        for (let index = 0; index < 5; index++)
            for (let index2 = 0; index2 < 8; index2++)
                if (dataArray[8 * index + index2]) resultArray[index] += 2 ** (7 - index2)

        //verify checksum
        checksumTmp = resultArray[0] + resultArray[1] + resultArray[2] + resultArray[3]
        checksum = resultArray[4]
        if (checksumTmp >= 512) checksumTmp -= 512
        if (checksumTmp >= 256) checksumTmp -= 256
        if (checksum == checksumTmp) _DHTreadSuccessful = true

        //read data if checksum ok
        if (_DHTreadSuccessful) {
                _DHThumidity = resultArray[0] + resultArray[1] / 100
            _DHTtemperature = resultArray[2] + resultArray[3] / 10;
            basic.showNumber(_DHTtemperature)
        }
        basic.pause(2000)
    } 

    //% block
    //% group="Components"
    export function dht11GetTemperature(): number{
        if (_DHTreadSuccessful)
            return _DHTtemperature
        return -90
    }
}
