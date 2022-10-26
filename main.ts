//% block = "Ruirui"
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
