//% color="#03a5fc" weight=100 icon="\uf26c"
//% groups=['Data', 'DHT11', 'Project 3.03 Input', 'Project 3.03 Output']
namespace Bitlink {
    let _DHTtemperature: number = 0.0
    let _DHThumidity: number = 0.0
    let _DHTreadSuccessful: boolean = false
    
    //Copyright (c) 2019 Alan Wang
    //https://github.com/alankrantas/pxt-DHT11_DHT22
    //% block="Query DHT11 on pin %pin"
    //% group="DHT11"
    export function queryDht11(pin: DigitalPin) {
        if (input.runningTime() > 2000){
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
            }
            basic.pause(2000)
        }
    } 

    //% block="current temperature"
    //% group="DHT11"
    export function dht11Temperature(): number{
        if (_DHTreadSuccessful)
            return _DHTtemperature
        return -90
    }

    //% block="last read successful?"
    //% group="DHT11"
    export function dht11Successful(): boolean{
        return _DHTreadSuccessful
            
    }
    
    //% block="current humidity"
    //% group="DHT11"
    export function dht11Humidity(): number{
        if (_DHTreadSuccessful)
            return _DHThumidity
        return -90
    }

    //% weight=28
    //% group="Project 3.03 Input" blockExternalInputs=true
    //% block="add name %receivedName to %nameArray counting contacts with %numberOfPings"
    export function addIdToArrays(receivedName: string, nameArray: string[], numberOfPings: number[]): void {
        if (nameArray == null || numberOfPings == null)
            return;
        let index =  nameArray.indexOf(receivedName)
        if (index >= 0)
            numberOfPings[index]++;
        else{
            nameArray.push(receivedName)
            numberOfPings.push(1)
        }
    }

    //% weight=30
    //% group="Project 3.03 Input" blockExternalInputs=true
    //% block="add name $receivedName to array $nameArray"
    export function addIdToArray(receivedName: string, nameArray: string[]) : void {
        if (nameArray == null)
            return;
        if (nameArray.indexOf(receivedName) == -1){
            nameArray.push(receivedName)
        }
        return;
    }

    //%weight=27
    //% group="Project 3.03 Input" blockExternalInputs=true
    //% block="add ID $receivedNum to array $numArray counting contacts with $numPings"
    export function addSerialNumberToArrays(receivedNum: number, numArray: number[], numPings: number[]) : void {
        if (numArray == null || numPings == null)
            return;
        
        let index =  numArray.indexOf(receivedNum)
        if (index >= 0)
            numPings[index]++;
        else{
            numArray.push(receivedNum)
            numPings.push(1)
        }
        return;
    }

    //% weight=33
    //% group="Project 3.03 Input" blockExternalInputs=true
    //% block="add ID $receivedNumber to array $numberArray"
    export function addSerialNumberToArray(receivedNumber: number, numberArray: number[]) : void {
        if (numberArray == null)
            return;
        if (numberArray.indexOf(receivedNumber) == -1){
            numberArray.push(receivedNumber)
        }
        return;
    }
    
    //% block="scroll names from %nameArray with contacts from %numberOfPings"
    //% group="Project 3.03 Output" blockExternalInputs=true 
    //% weight=26
    export function printNamesAndPings(nameArray: string[], numberOfPings: number[]){
        if (nameArray == null || numberOfPings == null)
            return;
        
        for (let _i = 0; _i < nameArray.length; _i++){
            basic.showString(nameArray[_i])
            basic.showNumber(numberOfPings[_i])
        }
    }

    //% block="scroll IDs from %serialArray with contacts from %numberOfPings"
    //% group="Project 3.03 Output" blockExternalInputs=true 
    //% weight=25
    export function printSerialAndPings(serialArray: number[], numberOfPings: number[]){
        if (serialArray == null || numberOfPings == null)
            return;

        for (let _i = 0; _i < serialArray.length; _i++){
            basic.showNumber(serialArray[_i])
            basic.showNumber(numberOfPings[_i])
        }
    }

    //% block="scroll names from %nameArray"
    //% group="Project 3.03 Output" 
    //% weight=24
    export function printNames(nameArray: string[]){
        if (nameArray == null)
            return;
        for (let _i = 0; _i < nameArray.length; _i++){
            basic.showString(nameArray[_i])
        }
    }
}
