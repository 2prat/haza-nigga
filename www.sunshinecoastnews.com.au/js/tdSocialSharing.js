var tdSocialSharing = {};
(function () {
  tdSocialSharing = {
    init: function () {
      jQuery(".td-social-sharing-button").on("click", function (a) {
        var b = jQuery(this),
          e = "";
        if (
          !b.hasClass("td-social-mail") &&
          !b.hasClass("td-social-share-text")
        )
          if ((a.preventDefault(), b.hasClass("td-social-expand-tabs"))) {
            e = b.data("block-uid");
            a = jQuery("#" + e);
            var d = b.find(".td-social-expand-tabs-icon");
            if (a.hasClass("td-social-show-all")) {
              b.detach().appendTo(a.find(".td-social-sharing-hidden:first"));
              var c = a.find(".td-post-sharing-visible:first"),
                f = new tdPullDown.item();
              f.blockUid = a.attr("id");
              f.horizontal_jquery_obj = c;
              f.vertical_jquery_obj = a.find(".td-social-sharing-hidden:first");
              f.horizontal_element_css_class = "td-social-sharing-button-js";
              f.container_jquery_obj = c.parents(".td-post-sharing:first");
              tdPullDown.add_item(f);
              jQuery("#" + e).removeClass("td-social-show-all");
              d.removeClass("td-icon-minus");
              d.addClass("td-icon-plus");
            } else
              tdPullDown.unloadItem(e),
                jQuery("#" + e).addClass("td-social-show-all"),
                d.removeClass("td-icon-plus"),
                d.addClass("td-icon-minus"),
                b.detach().appendTo(a.find(".td-post-sharing-visible:first"));
          } else if (b.hasClass("td-social-print")) window.print();
          else if (b.hasClass("td-social-copy_url")) {
            if (navigator.clipboard && window.isSecureContext)
              navigator.clipboard.writeText(b.attr("href"));
            else {
              var g = jQuery(
                '<input type="text" style="position:fixed;top:-999999px;left:-999999px" value="' +
                  b.attr("href") +
                  '" />'
              );
              jQuery("body").append(g);
              g.focus();
              g.select();
              new Promise(function (b, a) {
                document.execCommand("copy") ? b() : a();
                g.remove();
              });
            }
            b.addClass("td-social-copy_url-disabled");
            b.addClass("td-social-copy_url-copied");
            setTimeout(function () {
              b.removeClass("td-social-copy_url-copied");
              setTimeout(function () {
                b.removeClass("td-social-copy_url-disabled");
              }, 200);
            }, 1e3);
          } else
            a.preventDefault(),
              (e = jQuery(window).width() / 2 - 450),
              (a = jQuery(window).height() / 2 - 300),
              window.open(
                b.attr("href"),
                "mywin",
                "left=" + e + ",top=" + a + ",width=900,height=600,toolbar=0"
              );
      });
      setTimeout(function () {
        var a = jQuery(".tdb_single_post_share");
        a.hasClass("td-post-sharing-show-all-icons")
          ? ((a = jQuery(a).data("td-block-uid")),
            jQuery("#" + a).addClass("td-social-show-all"))
          : jQuery(".td-post-sharing").each(function (b, a) {
              b = jQuery(this);
              a = jQuery(a);
              var d = a.find(".td-post-sharing-visible:first"),
                c = new tdPullDown.item();
              c.blockUid = a.attr("id");
              c.horizontal_jquery_obj = d;
              c.vertical_jquery_obj = a.find(".td-social-sharing-hidden:first");
              c.horizontal_element_css_class = "td-social-sharing-button-js";
              b.hasClass("tdb-block")
                ? (c.container_jquery_obj = d.parents(".wpb_wrapper:first"))
                : (c.container_jquery_obj = d.parents(
                    ".td-post-sharing:first"
                  ));
              tdPullDown.add_item(c);
            });
      }, 50);
    },
  };
  tdSocialSharing.init();
})();
