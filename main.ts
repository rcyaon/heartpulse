input.onButtonPressed(Button.A, function () {
    heartbeat = true
})
input.onGesture(Gesture.Shake, function () {
    heartbeat = true
})
let time1 = 0
let delta_t = 0
let time2 = 0
let counter = 0
let pulsedet = 0
let heartbeat = false
let strip = neopixel.create(DigitalPin.P0, 24, NeoPixelMode.RGB)
strip.showRainbow(1, 360)
strip.show()
images.iconImage(IconNames.Heart).showImage(0)
basic.forever(function () {
    for (let i = 0; i <= 360; i++) {
        for (let j = 0; j <= 7; j++) {
            strip.setPixelColor(j, neopixel.hsl(i + j * 45, 100, 50))
        }
    }
})
basic.forever(function () {
    I2C_LCD1602.LcdInit(0)
})
basic.forever(function () {
    pulsedet = pins.analogReadPin(AnalogReadWritePin.P2)
})
basic.forever(function () {
    if (pulsedet >= 90) {
        I2C_LCD1602.ShowString("Breathe with me", 0, 0)
    } else {
        I2C_LCD1602.ShowString("Your pulse is normal!", 0, 0)
    }
})
basic.forever(function () {
    if (counter == 0 && counter == 0) {
        time2 = input.runningTime()
        delta_t = time2 - time1
        time1 = time2
        counter = 1
        pulsedet = 60000 - 60000 % delta_t / delta_t
    } else if (pulsedet <= 430 && counter == 1) {
        counter = 0
    }
})
basic.forever(function () {
    let pulse_out = 0
    if (heartbeat) {
        heartbeat = false
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    }
    basic.showNumber(pulse_out)
})
