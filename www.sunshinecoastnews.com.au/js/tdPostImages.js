"use strict";
jQuery().ready(function () {
  tdUtil.imageMoveClassToFigure("td-post-image-full");
  tdUtil.imageMoveClassToFigure("td-post-image-right");
  tdUtil.imageMoveClassToFigure("td-post-image-left");
  "undefined" !== typeof window.tds_general_modal_image &&
    "" !== window.tds_general_modal_image &&
    (jQuery(".single .td-post-content a > img").filter(function (a, b) {
      if (-1 !== b.className.indexOf("wp-image")) {
        a = jQuery(b);
        b = a.parent();
        var d = b.attr("href"),
          c = a.attr("src").match(/-\d+[Xx]\d+\./);
        c
          ? ((c = c.pop()), (c = a.attr("src").replace(c, ".")))
          : (c = a.attr("src"));
        d !== c ||
          (-1 === d.indexOf("uploads") && -1 === d.indexOf("attachment")) ||
          (a.addClass("td-modal-image"),
          -1 !== d.indexOf("attachment") && b.attr("href", a.attr("src")));
      }
    }),
    jQuery(".single .td-post-content p img").filter(function (a, b) {
      if (-1 !== b.className.indexOf("wp-image")) {
        a = jQuery(b);
        b = a.parent().attr("href");
        var d = a.attr("src"),
          c = a.attr("src").match(/-\d+[Xx]\d+\./),
          e = a.parent().children("figcaption").html();
        c && ((c = c.pop()), (d = d.replace(c, ".")));
        (void 0 !== b && b !== d) ||
          1 === a.closest(".td-modal-image").length ||
          (a.wrap("<a href='" + d + "' class=''></a>"),
          a.addClass("td-modal-image"),
          jQuery(a).parents("a").data({ caption: e }));
      }
    }),
    jQuery(".single .td-post-content figure img").filter(function (a, b) {
      if (-1 !== b.className.indexOf("wp-image")) {
        a = jQuery(b);
        b = a.parent().attr("href");
        var d = a.attr("src"),
          c = a.attr("src").match(/-\d+[Xx]\d+\./),
          e = a.parent().children("figcaption").html();
        c && ((c = c.pop()), (d = d.replace(c, ".")));
        (void 0 !== b && b !== d) ||
          1 === a.closest(".td-modal-image").length ||
          (a.wrap("<a href='" + d + "' class=''></a>"),
          a.addClass("td-modal-image"),
          jQuery(a).parents("a").data({ caption: e }));
      }
    }));
  jQuery(
    ".single .td-post-content .wp-block-gallery.td-modal-on-gallery .wp-block-image img"
  ).filter(function (a, b) {
    if (-1 !== b.className.indexOf("wp-image")) {
      a = jQuery(b);
      b = a.attr("src");
      var d = a.parent().children("figcaption").html();
      1 !== a.closest(".td-modal-image").length &&
        (a.wrap("<a href='" + b + "' class=''></a>"),
        a.addClass("td-modal-image"),
        jQuery(a).parents("a").data({ caption: d }));
    }
  });
  jQuery(
    ".single .td-post-content .wp-block-gallery .td-modal-image .wp-block-image img"
  ).filter(function (a, b) {
    if (-1 !== b.className.indexOf("wp-image")) {
      a = jQuery(b);
      b = a.parent();
      var d = a.attr("src"),
        c = a.parent().children("figcaption").html();
      b.parent().hasClass("td-modal-image") &&
        (b.parent().unwrap(),
        b.unwrap(),
        a.wrap("<a href='" + d + "' class=''></a>"),
        a.addClass("td-modal-image"),
        jQuery(a).parents("a").data({ caption: c }));
    }
  });
});
var tdModalImageLastEl = "";
