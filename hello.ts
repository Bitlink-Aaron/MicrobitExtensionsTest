/**
 * Functions are mapped to blocks using various macros
 * in comments starting with %. The most important macro
 * is "block", and it specifies that a block should be
 * generated for an **exported** function.
 */

//% color="#AA278D" weight=100
//% groups=['Project 3.03', 'Data']
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
}
