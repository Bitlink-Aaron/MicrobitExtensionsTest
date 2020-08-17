/**
 * Functions are mapped to blocks using various macros
 * in comments starting with %. The most important macro
 * is "block", and it specifies that a block should be
 * generated for an **exported** function.
 */

//% color="#AA278D" weight=100
namespace bitlink {
    
    //% block
    export function helloWorld() {
        radio.sendString("Hello")
        pause(10000)
    }

    //% block
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
    export function pushValue(value: string, array: string[]) {
        array.push(value);
    } 

    //% block
    export function printNamesAndPings(nameArray: string[], numberOfPings: number[]){
        for (let _i = 0; _i < nameArray.length; _i++){
            basic.showString(nameArray[_i])
            basic.showNumber(numberOfPings[_i])
        }
    }

    //% block
    export function emptyStringArray() : string[]{
        let array: string[] = []
        return array
    }
}
