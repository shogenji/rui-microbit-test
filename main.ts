namespace ruirui {

    export enum Motors {
        //% blockId = left_motor block = "left"
        Left = 0,
        //% blockId = right_motor block = "right"
        Right = 1,
        //% blockId = both_motors block = "both"
        Both = 2
    }

    //% blockId = stop_motor
    //% block = "motor | %motors stop"
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
