var tdAjaxVideoModal = {};
jQuery().ready(function () {
  tdAjaxVideoModal.init();
});
(function () {
  tdAjaxVideoModal = {
    _is_modal_open: !1,
    init: function () {
      jQuery(document).on("click", function (a) {
        ("td-vm-overlay" !== a.target.className &&
          "td-vm-close" !== a.target.className) ||
          !0 !== tdAjaxVideoModal._is_modal_open ||
          (a.preventDefault(), tdAjaxVideoModal.destroy_modal());
      });
      jQuery("body").on(
        "click",
        ".td-module-video-modal, .td-image-video-modal",
        function (a) {
          a.preventDefault();
          a.stopPropagation();
          a = jQuery(this);
          var b = {
            block_class:
              a.parents(".td_block_wrap").attr("data-td-block-uid") + "_m",
            video_source: a.attr("data-video-source"),
            video_url: a.attr("data-video-url"),
            video_autoplay: a.attr("data-video-autoplay"),
            video_ad: "",
          };
          a.hasClass("td_block_single_image") &&
            (b.block_class = a.attr("data-td-block-uid") + "_m");
          a.hasClass("tdb_module_img") &&
            (b.block_class = a.attr("data-tdb-module-template-class") + "_m");
          a.hasClass("td-module-video-modal")
            ? ((b.type = "module"),
              (b.post_url = a.attr("href")),
              (b.post_title = a.attr("title")))
            : (b.type = "image");
          void 0 !== a.attr("data-video-rec") &&
            (b.video_ad = JSON.parse(atob(a.attr("data-video-rec"))));
          tdAjaxVideoModal.build_modal(b);
        }
      );
    },
    build_modal: function (a) {
      jQuery("body").prepend(
        '<div id="td-video-modal" class="td-vm-wrap td-vm-' +
          a.video_source +
          " " +
          a.block_class +
          '"><div class="td-vm-overlay"></div><div class="td-vm-content-wrap"><div class="td-vm-content"><div class="td-vm-content-loading"></div></div></div><a href="#" class="td-vm-close"><i class="td-icon-modal-close"></i></a></div>'
      );
      var b = jQuery("#td-video-modal");
      "module" === a.type &&
        "" !== a.post_title &&
        b
          .find(".td-vm-content-wrap")
          .prepend(
            '<h3 class="td-vm-title"><a href="' +
              a.post_url +
              '" title="' +
              a.post_title +
              '">' +
              a.post_title +
              "</a></h3>"
          );
      "" !== a.video_ad &&
        (b
          .find(".td-vm-content-wrap")
          .append('<div class="td-vm-rec-wrap"></div>'),
        a.video_ad.disable
          ? b
              .find(".td-vm-rec-wrap")
              .append(
                '<div class="td-spot-id-video_modal"><div class="tdc-placeholder-title"></div></div>'
              )
          : b
              .find(".td-vm-rec-wrap")
              .append(
                '<div class="td-vm-rec-code">' + a.video_ad.code + "</div>"
              ),
        "" !== a.video_ad.title &&
          b
            .find(".td-vm-rec-wrap")
            .prepend(
              '<div class="td-vm-rec-title">' + a.video_ad.title + "</div>"
            ),
        "undefined" !== typeof window.tdAnimationStack &&
          !0 === window.tdAnimationStack.activated &&
          window.tdAnimationStack.reinit());
      setTimeout(function () {
        b.addClass("td-vm-open");
        b.find(".td-vm-content-wrap").addClass("td-vm-content-wrap-visible");
        jQuery.ajax({
          type: "POST",
          url: td_ajax_url,
          data: {
            action: "td_ajax_video_modal",
            td_video_url: a.video_url,
            td_video_autoplay: a.video_autoplay,
          },
          success: function (a) {
            a = jQuery.parseJSON(a);
            b.find(".td-vm-content").append(a.video_embed);
            setTimeout(function () {
              b.find(".td-vm-content-loading").remove();
              b.find(".wpb_video_wrapper").addClass("td-vm-iframe-visible");
            }, 200);
          },
        });
      }, 50);
      tdAjaxVideoModal._is_modal_open = !0;
    },
    destroy_modal: function () {
      var a = jQuery("#td-video-modal");
      a.removeClass("td-vm-open");
      setTimeout(function () {
        a.remove();
      }, 500);
      tdAjaxVideoModal._is_modal_open = !1;
    },
  };
})();
