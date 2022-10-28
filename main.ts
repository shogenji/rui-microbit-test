//% weight=50 color=#ff8800 icon="\uf1b9"
//% block="Car"
//% block.loc.ja="走らせようキット"
namespace ruirui {

    let speedMax = 1023

    export enum Motors {
        //% blockId=both_motors block="both"
        Both = 2,
        //% blockId=left_motor block="left"
        Left = 0,
        //% blockId=right_motor block="right"
        Right = 1
    }

    export enum Dir {
        //% blockId=direction_forward
        //% block="Forward"
        Forward = 0,
        //% blockId=direction_backward
        //% block="Backward"
        Backward = 1
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
    function stopMotor(motors: Motors): void {
        motorOff(motors)
    }

    //% blockId="stop"
    //% block="stop"
    //% block.loc.ja="止まる"
    export function stop(): void {
        motorOff(Motors.Both)
    }


    //% blockId=move_motor
    //% weight=100 blockGap=8
    //% block="move %direction|at speed %speed"
    //% speed.min=0 speed.max=100
    export function move(direction: Dir, speed: number): void {
        motorOn(Motors.Both, Dir.Forward, speed)
    }

    //% blockId=stop_for_x100ms
    //% block="stop | for %duration x 0.1 seconds"
    //% block.loc.ja="止まる | %duration x 0.1 秒間"
    export function stopFor(duration: number): void {
        motorOff(Motors.Both)
        basic.pause(duration * 100)
    }

    //% blockId=move_forward_x100ms
    //% weight=100 blockGap=8
    //% block="move forward | for %duration x 0.1 seconds"
    //% block.loc.ja="すすむ | %duration x 0.1 秒間"
    export function moveForwardFor(duration: number): void {
        motorOn(Motors.Both, Dir.Forward, 50)
        basic.pause(duration * 100)
        stop()
    }

    //% blockId=move_backward_x100ms
    //% weight=100 blockGap=8
    //% block="move backward | for %duration x 0.1 seconds"
    //% block.loc.ja="さがる | %duration x 0.1 秒間"
    export function moveBackwardFor(duration: number): void {
        motorOn(Motors.Both, Dir.Backward, 50)
        basic.pause(duration * 100)
        stop()
    }

    //% blockId=rotate_ccw_x100ms
    //% weight=100 blockGap=8
    //% block="rotate counter-clockwise | for %duration x 0.1 seconds"
    //% block.loc.ja="左回転 | %duration x 0.1 秒間"
    export function rotateCcwFor(duration: number): void {
        let speed = 50

        motorOn(Motors.Left, Dir.Backward, speed)
        motorOn(Motors.Right, Dir.Forward, speed)
        basic.pause(duration * 100)
        stop()
    }

    //% blockId=rotate_cw_x100ms
    //% weight=100 blockGap=8
    //% block="rotate clockwise | for %duration x 0.1 seconds"
    //% block.loc.ja="右回転 | %duration x 0.1 秒間"
    export function turnCwFor(duration: number): void {
        let speed = 50

        motorOn(Motors.Left, Dir.Forward, speed)
        motorOn(Motors.Right, Dir.Backward, speed)
        basic.pause(duration * 100)
        stop()
    }

    //% blockId=move_forward
    //% weight=100 blockGap=8
    //% block="move forward at speed %speed"
    //% speed.min=0 speed.max=100
    export function moveForward(speed: number): void {
        motorOn(Motors.Both, Dir.Forward, speed)
    }

    //% blockId=move_backward
    //% weight=100 blockGap=8
    //% block="move backward at speed %speed"
    //% speed.min=0 speed.max=100
    export function moveBackward(speed: number): void {
        motorOn(Motors.Both, Dir.Backward, speed)
    }

    //% blockId=rotate_ccw_at
    //% weight=100 blockGap=8
    //% block="rotate counter-clockwise at speed %speed"
    //% speed.min=0 speed.max=100
    export function rotateCcwAt(speed: number): void {
        motorOn(Motors.Left, Dir.Backward, speed)
        motorOn(Motors.Right, Dir.Forward, speed)
    }

    //% blockId=rotate_cw_at
    //% weight=100 blockGap=8
    //% block="rotate counter-clockwise at speed %speed"
    //% speed.min=0 speed.max=100
    export function rotateCwAt(speed: number): void {
        motorOn(Motors.Left, Dir.Forward, speed)
        motorOn(Motors.Right, Dir.Backward, speed)
    }

    /**
     * Sets the requested motor running in chosen direction at a set speed.
     * If setup is not complete, calls the initialisation routine.
     * @param motor which motor to turn on
     * @param dir which direction to go
     * @param speed how fast to spin the motor
     */
    //% blockId=motor_on
    //% block="turn %motors|motor on direction %direction|at speed %speed"
    //% weight=75 blockGap=8
    //% speed.min=0 speed.max=100
    function motorOn(motors: Motors, direction: Dir, speed: number): void {
        /*convert 0-100 to 0-1023 by a simple multiple by (speedMax / 100) */
        let outputVal = Math.round(speed * speedMax / 100)
        if (outputVal > speedMax) {
            outputVal = speedMax
        }

        switch (motors) {
            case Motors.Left:
                pins.digitalWritePin(DigitalPin.P13, direction)
                pins.digitalWritePin(DigitalPin.P14, outputVal)
                break

            case Motors.Right:
                pins.digitalWritePin(DigitalPin.P15, direction)
                pins.digitalWritePin(DigitalPin.P16, outputVal)
                break

            case Motors.Both:
                pins.digitalWritePin(DigitalPin.P13, direction)
                pins.digitalWritePin(DigitalPin.P14, outputVal)
                pins.digitalWritePin(DigitalPin.P15, direction)
                pins.digitalWritePin(DigitalPin.P16, outputVal)
                break

            default:
            //Stop - something has gone wrong
        }
    }

    /**
     * Turns off the specified motor.
     * @param motor which motor to turn off
     */
    //% blockId=motor_off
    //% weight=70 blockGap=8
    //% block="turn off %motor| motor"
    function motorOff(motors: Motors): void {
        switch (motors) {
            case Motors.Left:
                pins.digitalWritePin(DigitalPin.P14, 0)
                break
            case Motors.Right:
                pins.digitalWritePin(DigitalPin.P16, 0)
                break
            case Motors.Both:
                pins.digitalWritePin(DigitalPin.P14, 0)
                pins.digitalWritePin(DigitalPin.P16, 0)
                break
            default:
            //Stop - something has gone wrong
        }
    }
}
