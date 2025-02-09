jQuery(function () {
    const $ = jQuery;

    $('head').append(`
    <style>.pk-media-wrap{background:#fff;border: 1px solid #ccc;box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.24);padding: 10px;position: absolute;top: 60px;
    width: 380px}.cur.pk-media-wrap{display:block!important;}#insert-smiley-wrap img{width:20px;cursor: pointer}
    #insert-smiley-wrap img:hover{opacity: 0.7;transition: all .3s}
    </style>
    `)

    function mediaButtonEventHandle(buttonId, wrapId) {
        $(document).on("click", buttonId, function () {
            const shortCodeWrapEl = $(wrapId);
            if (shortCodeWrapEl.hasClass("cur")) {
                shortCodeWrapEl.removeClass("cur");
            } else {
                shortCodeWrapEl.addClass("cur");
            }
        });
    }

    function putTextToEditor(content) {
        if (puock_admin_setting.compatible.githubermd) {
            window.githuber_md_editor.insertValue(content)
            return
        }
        send_to_editor(content)
    }

    mediaButtonEventHandle('#insert-smiley-button', '#insert-smiley-wrap');
    mediaButtonEventHandle('#insert-shortcode-button', '#insert-shortcode-wrap');

    $(document).on("click", ".add-smily", function () {
        putTextToEditor($(this).attr("data-smilies"))
        $('#insert-smiley-wrap').removeClass('cur')
    });

    $(document).on("click", ".add-shortcode", function () {
        const _this = $(this)
        const key = _this.attr("data-key")
        const attrStr = _this.attr("data-attr")
        let out = `[${key}`
        if (attrStr) {
            const attr = JSON.parse(attrStr)
            for (const attrKey in attr) {
                out += ` ${attrKey}='${attr[attrKey]}'`
            }
        }
        out += `][/${key}]`
        putTextToEditor(out)
        $('#insert-shortcode-wrap').removeClass('cur')
    });
})
