//% weight = 70 icon = "\uf075"
//% color = #ff8800 block = "blink LED"

let speedR = 30
let speedL = 30

// Left motor:  P13(Direction), P14(Speed: 0-1023)
// Right motor: P15(Direction), P16(Speed: 0-1023)

namespace ruirui {

    export enum Motors {
        //% blockId = "left motor"
        //% block = "left"
        Left = 0,
        //% blockId = "left motor" block = "right"
        Right = 1,
        //% blockId = "both motors" block = "both"
        Both = 2
    }

    export enum Dir {
        //% blockId = "Backward" block = "Backward"
        Backward = 0,
        //% blockId = "Forward" block = "Forward"
        Forward = 1
    }

    //% block="left to right"
    export function foo(): void {
        pins.digitalWritePin(DigitalPin.P0, 0)
    }

    //% blockId = "stopMotor"
    //% block="motor |%motors stop"
    //% motors.fieldEditor = "gridpicker"
    //% motors.fieldOptions.columns = 2
    export function stopMotor(motors: Motors): void {
        // Left motor
        if (motors == 0) {
            pins.digitalWritePin(DigitalPin.P14, 0)
        }
        // Right motor
        if (motors == 1) {
            pins.digitalWritePin(DigitalPin.P16, 0)
        }
        // Both motors
        if (motors == 2) {
            pins.digitalWritePin(DigitalPin.P14, 0)
            pins.digitalWritePin(DigitalPin.P16, 0)
        }
    }

    //% blockId=PLEN:bit_servo
    //% block="servo motor %num|number %degrees|degrees"
    //% num.min=0 num.max=11
    //% degrees.min=0 degrees.max=180
    export function servoWrite(num: number, degrees: number) {
        let highByte = false;
        let pwmVal = degrees * 100 * 226 / 10000;
        pwmVal = Math.round(pwmVal) + 0x66;
        if (pwmVal > 0xFF) {
            highByte = true;
        }
    }
}
