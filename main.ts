//% weight = 10 icon = "\uf123"
//% color = #ff8800 block = "ruirui test"

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

    //% blockId = run_motor
    //% block = "motor %motors move %direction at speed %speed"
    export function runMotor(motors: Motors, direction: Dir, speed: number): void {
        // Left motor
        if (motors == 0) {
            pins.digitalWritePin(DigitalPin.P13, direction)
            pins.digitalWritePin(DigitalPin.P14, speed)
        }
        // Right motor
        if (motors == 1) {
            pins.digitalWritePin(DigitalPin.P15, direction)
            pins.digitalWritePin(DigitalPin.P16, speed)
        }
        // Both motors
        if (motors == 2) {
            pins.digitalWritePin(DigitalPin.P13, direction)
            pins.digitalWritePin(DigitalPin.P14, speed)
            pins.digitalWritePin(DigitalPin.P15, direction)
            pins.digitalWritePin(DigitalPin.P16, speed)
        }
    }

    //% blockId = stop_motor
    //% block = "motor |%motors stop"
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

}

/*

https://github.com/shogenji/rui-microbit-test

Left motor:  P13(Direction), P14(Speed: 0-1023)
Right motor: P15(Direction), P16(Speed: 0-1023)

*/

