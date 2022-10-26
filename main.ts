//% weight=10 color=#ff8800 icon="\uf1b9" block="Car"
namespace ruirui {

    export enum Motors {
        //% blockId=left_motor block="left"
        Left = 0,
        //% blockId=right_motor block="right"
        Right = 1,
        //% blockId=both_motors block="both"
        Both = 2
    }

    export enum Dir {
        //% blockId=direction_backward block="Backward"
        Backward = 0,
        //% blockId=direction_forward block="Forward"
        Forward = 1
    }

    //% blockId=run_motor
    //% block="run %motors motor %direction at speed %speed"
    //% speed.min=0 speed.max=1023
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
    //% blockId="stop_motor"
    //% block="motor | %motors stop"
    export function stopMotor(motors: Motors): void {
        if (motors == 0) {
            pins.digitalWritePin(DigitalPin.P14, 0)
        }
        if (motors == 1) {
            pins.digitalWritePin(DigitalPin.P16, 0)
        }
        if (motors == 2) {
            pins.digitalWritePin(DigitalPin.P14, 0)
            pins.digitalWritePin(DigitalPin.P16, 0)
        }
    }

}
