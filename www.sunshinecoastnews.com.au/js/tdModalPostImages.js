"use strict";
jQuery().ready(function () {
  tdModalImage();
});
function tdModalImage() {
  var e =
    "undefined" !== typeof window.tds_general_modal_image_disable_mob &&
    "" !== window.tds_general_modal_image_disable_mob;
  jQuery("figure.wp-caption").each(function () {
    var a = jQuery(this).children("figcaption").html();
    jQuery(this).children("a").data("caption", a);
  });
  jQuery("figure.wp-block-image, .wp-block-image figure").each(function () {
    var a = jQuery(this),
      b = a.children("figcaption").html();
    a = a.attr("class");
    var c = "";
    -1 < a.indexOf("td-caption-align-") &&
      jQuery(a.split(" ")).each(function () {
        -1 < this.indexOf("td-caption-align-") && (c = String(this));
      });
    jQuery(this)
      .parents("a.td-modal-image")
      .data({ caption: b, caption_align: c });
  });
  jQuery(".td-modal-image").each(function () {
    var a = jQuery(this),
      b = a.parent();
    a.find(".wp-block-image").length ||
      (b.addClass("td-modal-image"), a.removeClass("td-modal-image"));
  });
  jQuery("article").magnificPopup({
    type: "image",
    delegate: ".td-modal-image",
    gallery: {
      enabled: !0,
      tPrev: tdUtil.getBackendVar("td_magnific_popup_translation_tPrev"),
      tNext: tdUtil.getBackendVar("td_magnific_popup_translation_tNext"),
      tCounter: tdUtil.getBackendVar("td_magnific_popup_translation_tCounter"),
    },
    ajax: {
      tError: tdUtil.getBackendVar("td_magnific_popup_translation_ajax_tError"),
    },
    image: {
      tError: tdUtil.getBackendVar(
        "td_magnific_popup_translation_image_tError"
      ),
      titleSrc: function (a) {
        a = jQuery(a.el).data("caption");
        return "undefined" !== typeof a ? a : "";
      },
    },
    zoom: {
      enabled: !0,
      duration: 300,
      opener: function (a) {
        return a.find("img");
      },
    },
    disableOn: function () {
      return e && 0 === tdViewport.getCurrentIntervalIndex() ? !1 : !0;
    },
    callbacks: {
      beforeOpen: function () {
        var a = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
        a = a.defaultView || a.parentWindow;
        a !== a.parent &&
          jQuery(
            ".td-header-mobile-wrap, .td-header-mobile-sticky-wrap, .td-header-desktop-wrap, .td-header-desktop-sticky-wrap, .tdc-header-wrap",
            a.top.document
          ).css({ visibility: "hidden" });
      },
      open: function () {
        var a = jQuery.magnificPopup.instance.wrap.closest("html"),
          b = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
        b = b.defaultView || b.parentWindow;
        if (b !== b.parent) {
          b = b.top;
          var c = jQuery(b);
          a = jQuery("#" + a.attr("id"), b.document.body);
          if (a.length) {
            var d = !1;
            jQuery("html", b.document).scrollTop() < a.offset().top &&
              ((d = !0), jQuery("html", b.document).scrollTop(a.offset().top));
            a = {
              height: c.height() + (tdDetect.isMobileDevice ? 100 : 0),
              top: d ? 0 : c.scrollTop() - a.offset().top,
              overflow: "hidden",
            };
            jQuery.magnificPopup.instance.wrap.css(a);
            jQuery.magnificPopup.instance.bgOverlay.css(a);
            jQuery("html", b.document).css({ overflow: "hidden" });
          }
        }
        b = jQuery(this.currItem.el).data("caption_align");
        if ("undefined" !== typeof b)
          return jQuery(".mfp-figure").addClass(b), b;
      },
      imageLoadComplete: function () {
        var a = jQuery.magnificPopup.instance.wrap.closest("html"),
          b = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
        b = b.defaultView || b.parentWindow;
        if (b !== b.parent) {
          b = b.top;
          var c = jQuery(b);
          jQuery("#" + a.attr("id"), b.document.body).length &&
            jQuery(".mfp-img", a).css({
              "max-height": c.height(),
              visibility: "",
            });
        }
      },
      change: function (a) {
        window.tdModalImageLastEl = a.el;
        tdUtil.scrollIntoView(a.el);
      },
      beforeClose: function () {
        tdAffix.allow_scroll = !1;
        tdUtil.scrollIntoView(window.tdModalImageLastEl);
        var a = setInterval(function () {
          tdIsScrollingAnimation ||
            (clearInterval(a),
            setTimeout(function () {
              tdAffix.allow_scroll = !0;
            }, 100));
        }, 100);
      },
      close: function () {
        var a = jQuery.magnificPopup.instance.wrap.closest("html"),
          b = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
        b = b.defaultView || b.parentWindow;
        b !== b.parent &&
          ((b = b.top),
          jQuery("#" + a.attr("id"), b.document.body).length &&
            jQuery("html", b.document).css({ overflow: "" }));
      },
      afterClose: function () {
        var a = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
        a = a.defaultView || a.parentWindow;
        a !== a.parent &&
          jQuery(
            ".td-header-mobile-wrap, .td-header-mobile-sticky-wrap, .td-header-desktop-wrap, .td-header-desktop-sticky-wrap, .tdc-header-wrap",
            a.top.document
          ).css({ visibility: "" });
      },
    },
  });
  jQuery(
    ".td-main-content-wrap, .td-header-template-wrap, .td-footer-template-wrap"
  ).magnificPopup({
    type: "image",
    delegate: ".td-modal-image",
    gallery: {
      enabled: !0,
      tPrev: tdUtil.getBackendVar("td_magnific_popup_translation_tPrev"),
      tNext: tdUtil.getBackendVar("td_magnific_popup_translation_tNext"),
      tCounter: tdUtil.getBackendVar("td_magnific_popup_translation_tCounter"),
    },
    ajax: {
      tError: tdUtil.getBackendVar("td_magnific_popup_translation_ajax_tError"),
    },
    image: {
      tError: tdUtil.getBackendVar(
        "td_magnific_popup_translation_image_tError"
      ),
      titleSrc: function (a) {
        a = jQuery(a.el).data("caption");
        return "undefined" !== typeof a ? a : "";
      },
    },
    zoom: {
      enabled: !0,
      duration: 300,
      opener: function (a) {
        return a.find("img");
      },
    },
    disableOn: function () {
      return e && 0 === tdViewport.getCurrentIntervalIndex() ? !1 : !0;
    },
    callbacks: {
      change: function (a) {
        window.tdModalImageLastEl = a.el;
        tdUtil.scrollIntoView(a.el);
      },
      beforeClose: function () {
        tdAffix.allow_scroll = !1;
        tdUtil.scrollIntoView(window.tdModalImageLastEl);
        var a = setInterval(function () {
          tdIsScrollingAnimation ||
            (clearInterval(a),
            setTimeout(function () {
              tdAffix.allow_scroll = !0;
            }, 100));
        }, 100);
      },
    },
  });
  "undefined" === typeof jetpackCarouselStrings &&
    (jQuery("figure.gallery-item").each(function () {
      var a = jQuery(this).children("figcaption").html();
      jQuery(this).find("a").data("caption", a);
    }),
    jQuery(".blocks-gallery-item figure").each(function () {
      var a = jQuery(this).children("figcaption").html();
      jQuery(this).find("a").data("caption", a);
    }),
    jQuery(".tiled-gallery").magnificPopup({
      type: "image",
      delegate: "a",
      gallery: {
        enabled: !0,
        tPrev: tdUtil.getBackendVar("td_magnific_popup_translation_tPrev"),
        tNext: tdUtil.getBackendVar("td_magnific_popup_translation_tNext"),
        tCounter: tdUtil.getBackendVar(
          "td_magnific_popup_translation_tCounter"
        ),
      },
      ajax: {
        tError: tdUtil.getBackendVar(
          "td_magnific_popup_translation_ajax_tError"
        ),
      },
      image: {
        tError: tdUtil.getBackendVar(
          "td_magnific_popup_translation_image_tError"
        ),
        titleSrc: function (a) {
          a = jQuery(a.el).parent().find(".tiled-gallery-caption").text();
          return "undefined" !== typeof a ? a : "";
        },
      },
      zoom: {
        enabled: !0,
        duration: 300,
        opener: function (a) {
          return a.find("img");
        },
      },
      disableOn: function () {
        return e && 0 === tdViewport.getCurrentIntervalIndex() ? !1 : !0;
      },
      callbacks: {
        change: function (a) {
          window.tdModalImageLastEl = a.el;
          tdUtil.scrollIntoView(a.el);
        },
        beforeClose: function () {
          tdUtil.scrollIntoView(window.tdModalImageLastEl);
        },
      },
    }),
    jQuery(".gallery").magnificPopup({
      type: "image",
      delegate: ".gallery-icon > a",
      gallery: {
        enabled: !0,
        tPrev: tdUtil.getBackendVar("td_magnific_popup_translation_tPrev"),
        tNext: tdUtil.getBackendVar("td_magnific_popup_translation_tNext"),
        tCounter: tdUtil.getBackendVar(
          "td_magnific_popup_translation_tCounter"
        ),
      },
      ajax: {
        tError: tdUtil.getBackendVar(
          "td_magnific_popup_translation_ajax_tError"
        ),
      },
      image: {
        tError: tdUtil.getBackendVar(
          "td_magnific_popup_translation_image_tError"
        ),
        titleSrc: function (a) {
          a = jQuery(a.el).data("caption");
          return "undefined" !== typeof a ? a : "";
        },
      },
      zoom: {
        enabled: !0,
        duration: 300,
        opener: function (a) {
          return a.find("img");
        },
      },
      disableOn: function () {
        return e && 0 === tdViewport.getCurrentIntervalIndex() ? !1 : !0;
      },
      callbacks: {
        beforeOpen: function () {
          var a = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
          a = a.defaultView || a.parentWindow;
          a !== a.parent &&
            jQuery(
              ".td-header-mobile-wrap, .td-header-mobile-sticky-wrap, .td-header-desktop-wrap, .td-header-desktop-sticky-wrap, .tdc-header-wrap",
              a.top.document
            ).css({ visibility: "hidden" });
        },
        open: function () {
          var a = jQuery.magnificPopup.instance.wrap.closest("html"),
            b = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
          b = b.defaultView || b.parentWindow;
          if (b !== b.parent) {
            b = b.top;
            var c = jQuery(b);
            a = jQuery("#" + a.attr("id"), b.document.body);
            if (a.length) {
              var d = !1;
              jQuery("html", b.document).scrollTop() < a.offset().top &&
                ((d = !0),
                jQuery("html", b.document).scrollTop(a.offset().top));
              a = {
                height: c.height() + (tdDetect.isMobileDevice ? 100 : 0),
                top: d ? 0 : c.scrollTop() - a.offset().top,
                overflow: "hidden",
              };
              jQuery.magnificPopup.instance.wrap.css(a);
              jQuery.magnificPopup.instance.bgOverlay.css(a);
              jQuery("html", b.document).css({ overflow: "hidden" });
            }
          }
        },
        imageLoadComplete: function () {
          var a = jQuery.magnificPopup.instance.wrap.closest("html"),
            b = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
          b = b.defaultView || b.parentWindow;
          if (b !== b.parent) {
            b = b.top;
            var c = jQuery(b);
            jQuery("#" + a.attr("id"), b.document.body).length &&
              jQuery(".mfp-img", a).css({
                "max-height": c.height(),
                visibility: "",
              });
          }
        },
        change: function (a) {
          window.tdModalImageLastEl = a.el;
          tdUtil.scrollIntoView(a.el);
        },
        beforeClose: function () {
          tdUtil.scrollIntoView(window.tdModalImageLastEl);
        },
        close: function () {
          var a = jQuery.magnificPopup.instance.wrap.closest("html"),
            b = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
          b = b.defaultView || b.parentWindow;
          b !== b.parent &&
            ((b = b.top),
            jQuery("#" + a.attr("id"), b.document.body).length &&
              jQuery("html", b.document).css({ overflow: "" }));
        },
        afterClose: function () {
          var a = jQuery.magnificPopup.instance.wrap[0].ownerDocument;
          a = a.defaultView || a.parentWindow;
          a !== a.parent &&
            jQuery(
              ".td-header-mobile-wrap, .td-header-mobile-sticky-wrap, .td-header-desktop-wrap, .td-header-desktop-sticky-wrap, .tdc-header-wrap",
              a.top.document
            ).css({ visibility: "" });
        },
      },
    }));
}
