//% weight=10 color=#ff8800 icon="\uf5e4" block="Car"
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
        //% blockId=direction_forward block="Forward"
        Forward = 0,
        //% blockId=direction_backward block="Backward"
        Backward = 1
    }

    //% subcategory=Motors
    //% group="Motor Control"
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

    //% subcategory=Motors
    //% group="Motor Control"
    //% blockId="stop_motor"
    //% block="motor | %motors stop"
    export function stopMotor(motors: Motors): void {
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
        switch (direction) {
            case Dir.Forward:
                motorOn(Motors.Both, Dir.Forward, speed)
                break

            case Dir.Backward:
                motorOn(Motors.Both, Dir.Backward, speed)
                break

            default: //just in case. Should never get here
                motorOff(Motors.Both)
                break
        }
    }

    //% blockId=move_forward
    //% weight=100 blockGap=8
    //% block="move forward for |number %duration x 0.1 seconds"
    //% block.loc.ja="|number %duration x 0.1 秒間進む"
    //% speed.min=0 speed.max=100
    export function moveForwardFor(duration: number): void {
        motorOn(Motors.Both, Dir.Forward, 50)
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

    //% blockId=turn_left
    //% weight=100 blockGap=8
    //% block="turn left at speed %speed"
    //% speed.min=0 speed.max=100
    export function turnLeft(speed: number): void {
        motorOn(Motors.Left, Dir.Backward, speed)
        motorOn(Motors.Right, Dir.Forward, speed)
    }

    //% blockId=turn_right
    //% weight=100 blockGap=8
    //% block="turn right at speed %speed"
    //% speed.min=0 speed.max=100
    export function turnRight(speed: number): void {
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
