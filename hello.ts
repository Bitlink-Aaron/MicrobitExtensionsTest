/**
 * Functions are mapped to blocks using various macros
 * in comments starting with %. The most important macro
 * is "block", and it specifies that a block should be
 * generated for an **exported** function.
 */

//% color="#AA278D" weight=100
namespace bitlink {
    
    //%block
    export function helloWorld() {
        radio.sendString("Hello")
        pause(10000)
    }

    //%block
    export function addIdToArrays(receivedName: string, nameArray: string[], numberOfPings: number[]) {
        for (var _i = 0; _i < nameArray.length; _i++){
            if (receivedName == nameArray[_i]) {
                numberOfPings[_i]++;
                return
            }
        }
        nameArray.push(receivedName)
        numberOfPings.push(1)
    }

    // note that Caml casing yields lower case
    // block text with spaces

    //% block
    export function camlCaseTwo() {

    }
}
