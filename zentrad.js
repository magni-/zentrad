$(function() {
  var languages = {
    "Afrikaans": "af",
    "Albanian": "sq",
    "Amharic": "am",
    "Arabic": "ar",
    "Armenian": "hy",
    "Azeerbaijani": "az",
    "Basque": "eu",
    "Belarusian": "be",
    "Bengali": "bn",
    "Bosnian": "bs",
    "Bulgarian": "bg",
    "Catalan": "ca",
    "Cebuano": "ceb",
    "Chichewa": "ny",
    "Chinese (Simplified)": "zh-CN",
    "Chinese (Traditional)": "zh-TW",
    "Corsican": "co",
    "Croatian": "hr",
    "Czech": "cs",
    "Danish": "da",
    "Dutch": "nl",
    "English": "en",
    "Esperanto": "eo",
    "Estonian": "et",
    "Filipino": "tl",
    "Finnish": "fi",
    "French": "fr",
    "Frisian": "fy",
    "Galician": "gl",
    "Georgian": "ka",
    "German": "de",
    "Greek": "el",
    "Gujarati": "gu",
    "Haitian Creole": "ht",
    "Hausa": "ha",
    "Hawaiian": "haw",
    "Hebrew": "iw",
    "Hindi": "hi",
    "Hmong": "hmn",
    "Hungarian": "hu",
    "Icelandic": "is",
    "Igbo": "ig",
    "Indonesian": "id",
    "Irish": "ga",
    "Italian": "it",
    "Japanese": "ja",
    "Javanese": "jw",
    "Kannada": "kn",
    "Kazakh": "kk",
    "Khmer": "km",
    "Korean": "ko",
    "Kurdish": "ku",
    "Kyrgyz": "ky",
    "Lao": "lo",
    "Latin": "la",
    "Latvian": "lv",
    "Lithuanian": "lt",
    "Luxembourgish": "lb",
    "Macedonian": "mk",
    "Malagasy": "mg",
    "Malay": "ms",
    "Malayalam": "ml",
    "Maltese": "mt",
    "Maori": "mi",
    "Marathi": "mr",
    "Mongolian": "mn",
    "Burmese": "my",
    "Nepali": "ne",
    "Norwegian": "no",
    "Pashto": "ps",
    "Persian": "fa",
    "Polish": "pl",
    "Portuguese": "pt",
    "Punjabi": "ma",
    "Romanian": "ro",
    "Russian": "ru",
    "Samoan": "sm",
    "Scots Gaelic": "gd",
    "Serbian": "sr",
    "Sesotho": "st",
    "Shona": "sn",
    "Sindhi": "sd",
    "Sinhala": "si",
    "Slovak": "sk",
    "Slovenian": "sl",
    "Somali": "so",
    "Spanish": "es",
    "Sundanese": "su",
    "Swahili": "sw",
    "Swedish": "sv",
    "Tajik": "tg",
    "Tamil": "ta",
    "Telugu": "te",
    "Thai": "th",
    "Turkish": "tr",
    "Ukrainian": "uk",
    "Urdu": "ur",
    "Uzbek": "uz",
    "Vietnamese": "vi",
    "Welsh": "cy",
    "Xhosa": "xh",
    "Yiddish": "yi",
    "Yoruba": "yo",
    "Zulu": "zu",
  };

  var selected = [];

  $("#add-language").autocomplete({
    source: Object.keys(languages),
    delay: 0,
    autoFocus: true,
    select: function(event, ui) {
      if (event.keyCode === 9) { // tab
        event.preventDefault();
        this.value = "";
        var language = ui.item.value;
        if (selected.indexOf(language) < 0) {
          selected.push(language);
          addNewRow(language);
        }
      }
    }
  });

  function addNewRow(language) {
    var newRow = $("#row-template").clone(true, true).appendTo($("#languages"));
    newRow.children().first().text(language);
    newRow.attr("id", language);
  };

  $("#languages input").keyup(function(event) {
    if (event.keyCode === 13) { // enter
      var language = this.closest("tr").id;
      translateToAll(this.value, language);
    }
  });

  $("#languages button").click(function(event) {
    var language = this.closest("tr");
    var index = selected.indexOf(language.id);
    if (index > -1) {
      selected.splice(index, 1);
    }
    language.remove()
  });

  function translateToAll(text, from) {
    for (var i = 0; i < selected.length; ++i) {
      var to = selected[i];
      if (to !== from) {
        translate(text, from, to);
      }
    }
  };

  function translate(text, from, to) {
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + languages[from] + "&tl=" + languages[to] + "&dt=t&q=" + encodeURI(text);
    $.get(url, {}, function(data) {
      var translated = data.match(/\[\[\["([^"]*)"/);
      if (translated) {
        var translated_text = translated[1];
        $("#" + to + " input").val(translated_text);
      }
    }, "text");
  };
});
