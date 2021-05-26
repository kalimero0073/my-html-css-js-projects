var langButtonClosed = true;

function languageId(id) {
    var translator = new Translator();
    translator.execute(id);
}

function languageKeyUp(keyEvent, obj) {
    if(keyEvent.code === 'Space' || keyEvent.code === 'Enter') {
        if(langButtonClosed) {
            $('.dropdown-content').css({
            display: "flex",
            "flex-direction": "column"
            });
            langButtonClosed = !langButtonClosed;
        } else {
            $('.dropdown-content').css({
                display: "none"
            });
            langButtonClosed = !langButtonClosed;
        }
    }       
}

async function renderLanguages() {
    const response = await fetch("./i18n/en.json");
    const data = await response.json();
    const languages = data.generic.languages;

    let keys = Object.keys(languages);
    // access dynamically object properties
    // render list of languages
    for (const key of keys) {
        console.log(languages[key]);
        var template = await $.get("./html/lang.html");
        var rendered = Mustache.render(template, { value: { lang: languages[key], key: key } });
        $(".dropdown-content").append(rendered);
    } 
}

// constructor function for creating translator
function Translator() {
    let langs = ["en", "de", "sr", "it", "es", "ru"];
    let defaultLang = "en";
    let fileDirPath = "/i18n";
    let langSettable = true;
    let elements = document.querySelectorAll("[data-i18n]");

    let findLanguage = function() {
        if (!langSettable) {
            return defaultLang;
        }
        // navigator.language to find out the browser language (tested in chrome)
        let browserLang = navigator.language.substring(0, 2);
        let isSupported = langs.includes(browserLang);

        if (isSupported) {
            return browserLang;
        }

        return defaultLang;
    };

    let lang = findLanguage();

    let toggleLangAttr = function() {
        if (document.documentElement.lang !== this._lang) {
            document.documentElement.lang = this._lang;
        }
    }

    let translate = function(translation) {
        function replace(element) {
            var text = element.dataset.i18n.split('.').reduce((obj, i) => obj[i], translation);

            if (text) {
                element.innerHTML = text;
            }
        }

        elements.forEach(replace);
    }

    this.execute = function(langIn = null) {
        if (langIn) {
            if (!langs.includes(langIn)) {
                return;
            }
            lang = langIn;
        }

        var path = `${fileDirPath}/${lang}.json`;

        fetch(path)
            .then((response) => response.json())
            .then((translation) => {
                translate(translation);
                toggleLangAttr();
            })
            .catch(() => {
                console.error(`Error while loading ${path}. Check path or file correctness.`);
            });
    }
}

//

$(document).ready(async function () {
    // translate
    const translator = new Translator();
    // execute translation
    translator.execute();
    // for each entry create a html and append it to the language picker
    await renderLanguages();
});