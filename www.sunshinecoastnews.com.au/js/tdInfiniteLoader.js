var tdInfiniteLoader = {};
(function () {
  tdInfiniteLoader = {
    hasItems: !1,
    items: [],
    item: function () {
      this.jqueryObj = this.uid = "";
      this.bottomTop = 0;
      this.isVisibleCallbackEnabled = !0;
      this.isVisibleCallback = function () {};
    },
    addItem: function (b) {
      tdInfiniteLoader.hasItems = !0;
      tdInfiniteLoader.items.push(b);
    },
    computeTopDistances: function () {
      !1 !== tdInfiniteLoader.hasItems &&
        (jQuery.each(tdInfiniteLoader.items, function (b, a) {
          a = tdInfiniteLoader.items[b].jqueryObj.offset().top;
          tdInfiniteLoader.items[b].bottomTop =
            a + tdInfiniteLoader.items[b].jqueryObj.height();
        }),
        tdInfiniteLoader.computeEvents());
    },
    computeEvents: function () {
      if (!1 !== tdInfiniteLoader.hasItems) {
        var b = jQuery(window).height() + jQuery(window).scrollTop();
        jQuery.each(tdInfiniteLoader.items, function (a, c) {
          tdInfiniteLoader.items[a].bottomTop < b + 700 &&
            !0 === tdInfiniteLoader.items[a].isVisibleCallbackEnabled &&
            ((tdInfiniteLoader.items[a].isVisibleCallbackEnabled = !1),
            tdInfiniteLoader.items[a].isVisibleCallback());
        });
      }
    },
    enable_is_visible_callback: function (b) {
      jQuery.each(tdInfiniteLoader.items, function (a, c) {
        if (c.uid === b)
          return (tdInfiniteLoader.items[a].isVisibleCallbackEnabled = !0), !1;
      });
    },
  };
  jQuery(".td_ajax_infinite").each(function () {
    var b = new tdInfiniteLoader.item();
    b.jqueryObj = jQuery(this);
    b.uid = jQuery(this).data("td_block_id");
    b.isVisibleCallback = function () {
      var a = tdBlocks.tdGetBlockObjById(b.jqueryObj.data("td_block_id"));
      "" === a.ajax_pagination_infinite_stop ||
      a.td_current_page < parseInt(a.ajax_pagination_infinite_stop) + 1
        ? (a.td_current_page++,
          tdBlocks.tdAjaxDoBlockRequest(a, "infinite_load"))
        : a.td_current_page < a.max_num_pages &&
          setTimeout(function () {
            jQuery("#infinite-lm-" + a.id)
              .css("display", "block")
              .css("visibility", "visible");
          }, 400);
    };
    tdInfiniteLoader.addItem(b);
  });
  jQuery(window).on("load", function () {
    tdInfiniteLoader.computeTopDistances();
  });
  jQuery().ready(function () {
    setTimeout(function () {
      tdInfiniteLoader.computeTopDistances();
    }, 500);
  });
})();