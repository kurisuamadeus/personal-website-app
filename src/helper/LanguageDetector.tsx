import { useGlobalState } from "../components/GlobalStateProvider";

export function UpdateLanguageParams(lang: string | undefined): string {
    if (lang == 'ja') {
        lang = 'jp'
    }
    if (lang === undefined || lang == '') {
        console.log(sessionStorage.getItem('lang'))
        if (sessionStorage.getItem('lang') === undefined || sessionStorage.getItem('lang') == '' || sessionStorage.getItem('lang') == null) {
            lang = navigator.language.split('-')[0] != 'ja' ? 'en' : 'jp';
            console.log(lang)
            sessionStorage.setItem('lang', lang)
        } else {
            lang = sessionStorage.getItem('lang')?.toString()
        }
    } else if (lang.split('-').length > 1) {
        if (lang.split('-')[0] == 'ja') {
            lang = 'jp'
        } else {
            lang = 'en'
        }
    }

    if (lang != sessionStorage.getItem('lang')) {
        sessionStorage.setItem('lang', String(lang))
    }
    console.log(lang)
    return String(lang)

}

export function GetLanguageFromUrlPath(): string | null {
    const currentUrl = window.location.href.split('/')
    if (currentUrl[3] == '' || currentUrl[3] == null || currentUrl[3] == undefined) {
        return null;
    } else {
        return currentUrl[3]
    }
}

export function GetLanguageFromNavigator() {
    if (navigator.language.split('-')[0] == 'ja') {
        return 'jp'
    } else {
        return 'en'
    }

}
