var tdAjaxSearch = {};
jQuery().ready(function () {
  tdAjaxSearch.init();
});
(function () {
  tdAjaxSearch = {
    _current_selection_index: 0,
    _last_request_results_count: 0,
    _first_down_up: !0,
    _is_search_open: !1,
    _is_mob_live_search_active: !0,
    _blockAtts: void 0,
    init: function () {
      jQuery(document).on("click", function (a) {
        "td-icon-search" !== a.target.className &&
          "td-header-search" !== a.target.id &&
          "td-header-search-top" !== a.target.id &&
          !0 === tdAjaxSearch._is_search_open &&
          tdAjaxSearch.hide_search_box();
      });
      jQuery("#td-header-search-button").on("click", function (a) {
        a.preventDefault();
        a.stopPropagation();
        !0 === tdAjaxSearch._is_search_open
          ? tdAjaxSearch.hide_search_box()
          : tdAjaxSearch.show_search_box();
      });
      jQuery("#td-header-search-button-mob, .tdb-header-search-button-mob").on(
        "click",
        function (a) {
          if ("disabled" !== window.tdMobileSearch) {
            jQuery("body").addClass("td-search-opened");
            var b = jQuery("#td-header-search-mob");
            setTimeout(function () {
              b.focus();
              var a = b.val();
              b.val("");
              b.val(a);
            }, 1300);
            tdAjaxSearch._is_mob_live_search_active &&
              0 < b.val().trim().length &&
              tdAjaxSearch.do_ajax_call_mob();
          }
        }
      );
      jQuery(".td-search-close span").on("click", function () {
        jQuery("body").removeClass("td-search-opened");
      });
      jQuery("#td-header-search").keydown(function (a) {
        if (
          (a.which && 39 === a.which) ||
          (a.keyCode && 39 === a.keyCode) ||
          (a.which && 37 === a.which) ||
          (a.keyCode && 37 === a.keyCode)
        )
          tdAjaxSearch.td_aj_search_input_focus();
        else {
          if ((a.which && 13 === a.which) || (a.keyCode && 13 === a.keyCode))
            return (
              (a = jQuery(".td-aj-cur-element")),
              0 < a.length
                ? ((a = a.find(".entry-title a").attr("href")),
                  (window.location = a))
                : jQuery(this).parent().parent().submit(),
              !1
            );
          if ((a.which && 40 === a.which) || (a.keyCode && 40 === a.keyCode))
            return tdAjaxSearch.move_prompt_down(), !1;
          if ((a.which && 38 === a.which) || (a.keyCode && 38 === a.keyCode))
            return tdAjaxSearch.move_prompt_up(), !1;
          ((a.which && 8 === a.which) || (a.keyCode && 8 === a.keyCode)) &&
            1 === jQuery(this).val().length &&
            jQuery("#td-aj-search").empty();
          tdAjaxSearch.td_aj_search_input_focus();
          setTimeout(function () {
            tdAjaxSearch.do_ajax_call();
          }, 100);
          return !0;
        }
      });
      jQuery("#td-header-search-mob").keydown(function (a) {
        if ((a.which && 13 === a.which) || (a.keyCode && 13 === a.keyCode))
          return (
            (a = jQuery(".td-aj-cur-element")),
            0 < a.length
              ? (window.location = a.find(".entry-title a").attr("href"))
              : jQuery(this).parent().parent().submit(),
            !1
          );
        ((a.which && 8 === a.which) || (a.keyCode && 8 === a.keyCode)) &&
          1 === jQuery(this).val().length &&
          jQuery("#td-aj-search-mob").empty();
        tdAjaxSearch._is_mob_live_search_active &&
          setTimeout(function () {
            tdAjaxSearch.do_ajax_call_mob();
          }, 100);
        return !0;
      });
    },
    show_search_box: function () {
      jQuery(".td-drop-down-search").addClass("td-drop-down-search-open");
      !0 !== tdDetect.isIos &&
        setTimeout(function () {
          document.getElementById("td-header-search").focus();
        }, 200);
      tdAjaxSearch._is_search_open = !0;
    },
    hide_search_box: function () {
      jQuery(".td-drop-down-search").removeClass("td-drop-down-search-open");
      tdAjaxSearch._is_search_open = !1;
    },
    move_prompt_up: function () {
      !0 === tdAjaxSearch._first_down_up
        ? ((tdAjaxSearch._first_down_up = !1),
          0 === tdAjaxSearch._current_selection_index
            ? (tdAjaxSearch._current_selection_index =
                tdAjaxSearch._last_request_results_count - 1)
            : tdAjaxSearch._current_selection_index--)
        : 0 === tdAjaxSearch._current_selection_index
        ? (tdAjaxSearch._current_selection_index =
            tdAjaxSearch._last_request_results_count)
        : tdAjaxSearch._current_selection_index--;
      tdAjaxSearch._repaintCurrentElement();
    },
    move_prompt_down: function () {
      !0 === tdAjaxSearch._first_down_up
        ? (tdAjaxSearch._first_down_up = !1)
        : tdAjaxSearch._current_selection_index ===
          tdAjaxSearch._last_request_results_count
        ? (tdAjaxSearch._current_selection_index = 0)
        : tdAjaxSearch._current_selection_index++;
      tdAjaxSearch._repaintCurrentElement();
    },
    _repaintCurrentElement: function () {
      jQuery(".td_module_wrap").removeClass("td-aj-cur-element");
      tdAjaxSearch._current_selection_index >
      tdAjaxSearch._last_request_results_count - 1
        ? jQuery(".td-search-form").fadeTo(100, 1)
        : (tdAjaxSearch.td_aj_search_input_remove_focus(),
          jQuery(".td_module_wrap")
            .eq(tdAjaxSearch._current_selection_index)
            .addClass("td-aj-cur-element"));
    },
    td_aj_search_input_focus: function () {
      tdAjaxSearch._current_selection_index = 0;
      tdAjaxSearch._first_down_up = !0;
      jQuery(".td-search-form").fadeTo(100, 1);
      jQuery(".td_module_wrap").removeClass("td-aj-cur-element");
    },
    td_aj_search_input_remove_focus: function () {
      0 !== tdAjaxSearch._last_request_results_count &&
        jQuery(".td-search-form").css("opacity", 0.5);
    },
    process_ajax_response: function (a) {
      var b = jQuery("#td-header-search").val();
      "" === b
        ? jQuery("#td-aj-search").empty()
        : ((a = jQuery.parseJSON(a)),
          a.td_search_query === b &&
            ((tdAjaxSearch._current_selection_index = 0),
            (tdAjaxSearch._last_request_results_count = a.td_total_in_list),
            (tdAjaxSearch._first_down_up = !0),
            jQuery("#td-aj-search").html(a.td_data),
            "undefined" !== typeof window.tdAnimationStack &&
              !0 === window.tdAnimationStack.activated &&
              (window.tdAnimationStack.check_for_new_items(
                "#td-aj-search .td-animation-stack",
                window.tdAnimationStack.SORTED_METHOD.sort_left_to_right,
                !0,
                !1
              ),
              window.tdAnimationStack.compute_items(!1))));
    },
    process_ajax_response_mob: function (a) {
      var b = jQuery("#td-header-search-mob").val();
      "" === b
        ? jQuery("#td-aj-search-mob").empty()
        : ((a = jQuery.parseJSON(a)),
          a.td_search_query === b &&
            (jQuery("#td-aj-search-mob").html(a.td_data),
            "undefined" !== typeof window.tdAnimationStack &&
              !0 === window.tdAnimationStack.activated &&
              (window.tdAnimationStack.check_for_new_items(
                "#td-aj-search-mob .td-animation-stack",
                window.tdAnimationStack.SORTED_METHOD.sort_left_to_right,
                !0,
                !1
              ),
              window.tdAnimationStack.compute_items(!1))));
    },
    do_ajax_call: function () {
      var a = jQuery("#td-header-search").val();
      "" === a
        ? tdAjaxSearch.td_aj_search_input_focus()
        : tdLocalCache.exist(a)
        ? tdAjaxSearch.process_ajax_response(tdLocalCache.get(a))
        : jQuery.ajax({
            type: "POST",
            url: td_ajax_url,
            data: { action: "td_ajax_search", td_string: a },
            success: function (b, c, d) {
              tdLocalCache.set(a, b);
              tdAjaxSearch.process_ajax_response(b);
            },
            error: function (a, c, d) {},
          });
    },
    do_ajax_call_mob: function () {
      var a = jQuery("#td-header-search-mob").val();
      "" !== a &&
        (tdLocalCache.exist(a)
          ? tdAjaxSearch.process_ajax_response_mob(tdLocalCache.get(a))
          : jQuery.ajax({
              type: "POST",
              url: td_ajax_url,
              data: {
                action: "td_ajax_search",
                atts: this._blockAtts,
                td_string: a,
              },
              success: function (b, c, d) {
                tdLocalCache.set(a, b);
                tdAjaxSearch.process_ajax_response_mob(b);
              },
              error: function (a, c, d) {},
            }));
    },
  };
})();
