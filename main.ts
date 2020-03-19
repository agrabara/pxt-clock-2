input.onButtonPressed(Button.A, function () {
    //ustawienie jednorazowe daty i godziny
    clock.DateTime(
        2020,
        3,
        19,
        4,
        10,
        48,
        30
    )
    basic.showIcon(IconNames.Heart)
})
let sekunda = 0
let minuta = 0
let godzina = 0
let day = 0
let month = 0
let clock: DS1302.DS1302RTC = null
I2C_LCD1602.LcdInit(63)
I2C_LCD1602.BacklightOff()
I2C_LCD1602.ShowString("Hello", 0, 0)
I2C_LCD1602.BacklightOn()
basic.pause(2000)
I2C_LCD1602.ShowString("Realtime Clock", 0, 0)
basic.pause(2000)
I2C_LCD1602.clear()
//
// podlaczenie:
// P13 - CLK
// P14 - DAT
// P15 - RST
clock = DS1302.create(DigitalPin.P13, DigitalPin.P14, DigitalPin.P15)
basic.forever(function () {
    basic.showLeds(`
        . . . . .
        . . # . .
        . . . . .
        . . # . .
        . . . . .
        `)
    I2C_LCD1602.ShowNumber(clock.getYear(), 0, 0)
    I2C_LCD1602.ShowString("-", 4, 0)
    month = clock.getMonth()
    if (month > 9) {
        I2C_LCD1602.ShowNumber(month, 5, 0)
    } else {
        I2C_LCD1602.ShowString("0", 5, 0)
        I2C_LCD1602.ShowNumber(month, 6, 0)
    }
    I2C_LCD1602.ShowString("-", 7, 0)
    day = clock.getDay()
    if (day > 9) {
        I2C_LCD1602.ShowNumber(day, 8, 0)
    } else {
        I2C_LCD1602.ShowString("0", 8, 0)
        I2C_LCD1602.ShowNumber(month, 9, 0)
    }
    I2C_LCD1602.ShowString("    ", 13, 0)
    if (clock.getWeekday() == 1) {
        I2C_LCD1602.ShowString("Pon.", 13, 0)
    } else if (clock.getWeekday() == 2) {
        I2C_LCD1602.ShowString("Wt.", 13, 0)
    } else if (clock.getWeekday() == 3) {
        I2C_LCD1602.ShowString("Śr.", 13, 0)
    } else if (clock.getWeekday() == 4) {
        I2C_LCD1602.ShowString("Czw.", 13, 0)
    } else if (clock.getWeekday() == 5) {
        I2C_LCD1602.ShowString("Pt.", 13, 0)
    } else if (clock.getWeekday() == 6) {
        I2C_LCD1602.ShowString("Sob.", 13, 0)
    } else if (clock.getWeekday() == 7) {
        I2C_LCD1602.ShowString("Ndz.", 13, 0)
    }
    I2C_LCD1602.ShowString("Gdz.", 0, 1)
    I2C_LCD1602.ShowString(":", 3, 1)
    godzina = clock.getHour()
    if (godzina > 9) {
        I2C_LCD1602.ShowNumber(godzina, 4, 1)
    } else {
        I2C_LCD1602.ShowString("0", 4, 1)
        I2C_LCD1602.ShowNumber(godzina, 5, 1)
    }
    I2C_LCD1602.ShowString(":", 6, 1)
    minuta = clock.getMinute()
    if (minuta > 9) {
        I2C_LCD1602.ShowNumber(minuta, 7, 1)
    } else {
        I2C_LCD1602.ShowString("0", 7, 1)
        I2C_LCD1602.ShowNumber(minuta, 8, 1)
    }
    I2C_LCD1602.ShowString(":", 9, 1)
    sekunda = clock.getSecond()
    if (sekunda > 9) {
        I2C_LCD1602.ShowNumber(sekunda, 10, 1)
    } else {
        I2C_LCD1602.ShowString("0", 10, 1)
        I2C_LCD1602.ShowNumber(sekunda, 11, 1)
    }
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.pause(500)
})
