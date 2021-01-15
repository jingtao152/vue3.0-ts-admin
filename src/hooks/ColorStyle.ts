// const version = require('element-plus/package.json').version
const ORIGINAL_THEME = '#409EFF'
export const ColorStyle = (store) => {
    const result = {
        chalk: ''
    }
    const defaultColor = store.getters['base/colorStyle']

    const updateStyle = (style, oldCluster, newCluster) => {
        let newStyle = style
        oldCluster.forEach((color, index) => {
            if (newStyle) {
                newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index]).replace(/<br>/, '')
            }
        })
        return newStyle
    }

    const getCSSString = (url, callback, variable) => {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (variable) {
                    result[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
                }
                callback()
            }
        }
        xhr.open('GET', url)
        xhr.send()
    }

    const getThemeCluster = (theme) => {
        const tintColor = (color, tint) => {
            let red: number | string = parseInt(color.slice(0, 2), 16)
            let green: number | string = parseInt(color.slice(2, 4), 16)
            let blue: number | string = parseInt(color.slice(4, 6), 16)

            if (tint === 0) {
                // when primary color is in its rgb space
                return [red, green, blue].join(',')
            } else {
                red += Math.round(tint * (255 - red))
                green += Math.round(tint * (255 - green))
                blue += Math.round(tint * (255 - blue))

                red = red.toString(16)
                green = green.toString(16)
                blue = blue.toString(16)

                return `#${red}${green}${blue}`
            }
        }

        const shadeColor = (color, shade) => {
            let red: number | string = parseInt(color.slice(0, 2), 16)
            let green: number | string = parseInt(color.slice(2, 4), 16)
            let blue: number | string = parseInt(color.slice(4, 6), 16)

            red = Math.round((1 - shade) * red)
            green = Math.round((1 - shade) * green)
            blue = Math.round((1 - shade) * blue)

            red = red.toString(16)
            green = green.toString(16)
            blue = blue.toString(16)

            return `#${red}${green}${blue}`
        }

        const clusters = [theme]
        for (let i = 0; i <= 9; i++) {
            clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
        }
        clusters.push(shadeColor(theme, 0.1))
        return clusters
    }

    const updateTheme = (val, oldVal) => {
        if (typeof val !== 'string') return
        const head = document.getElementsByTagName('head')[0]
        const themeCluster = getThemeCluster(val.replace('#', ''))
        const originalCluster = getThemeCluster(oldVal.replace('#', ''))
        const getHandler = (variable, id) => {
            return () => {
                const originalCluster = getThemeCluster(ORIGINAL_THEME.replace('#', ''))
                const newStyle = updateStyle(result[variable], originalCluster, themeCluster)
                let styleTag = document.getElementById(id)
                if (!styleTag) {
                    styleTag = document.createElement('style')
                    styleTag.setAttribute('id', id)
                    head.appendChild(styleTag)
                }
                styleTag.innerText = newStyle
            }
        }

        const chalkHandler = getHandler('chalk', 'chalk-style')
        if (!result.chalk) {
            const url = `/css/test.css`
            getCSSString(url, chalkHandler, 'chalk')
        } else {
            chalkHandler()
        }

        const link = [].slice.call(
            document.getElementsByTagName('head')[0].getElementsByTagName('link')
        )

        for (let i = 0; i < link.length; i++) {
            const style: any = link[i]
            if (style.href.includes('css')) {
                getCSSString(style.href, (innerText) => {
                    const originalCluster = getThemeCluster(
                        ORIGINAL_THEME.replace('#', '')
                    )
                    const newStyle = updateStyle(innerText, originalCluster, themeCluster)
                    let styleTag = document.getElementById(i.toString())
                    if (!styleTag) {
                        styleTag = document.createElement('style')
                        styleTag.id = i.toString()
                        styleTag.innerText = newStyle
                        head.appendChild(styleTag)
                    }
                }, null)
            }
        }


        const styles = [].slice.call(document.querySelectorAll('style'))

        styles.forEach((style: HTMLElement) => {
            const {innerText} = style
            if (typeof innerText !== "string") return;
            style.innerText = updateStyle(
                innerText,
                originalCluster,
                themeCluster
            );
        })
    }

    const changeColor = () => {
        updateTheme(defaultColor, ORIGINAL_THEME)
    }
    return {
        changeColor
    }
}
