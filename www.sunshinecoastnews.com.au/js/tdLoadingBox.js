var tdLoadingBox = {};
(function () {
  tdLoadingBox = {
    speed: 40,
    arrayColorsTemp:
      "rgba(99, 99, 99, 0);rgba(99, 99, 99, 0.05);rgba(99, 99, 99, 0.08);rgba(99, 99, 99, 0.2);rgba(99, 99, 99, 0.3);rgba(99, 99, 99, 0.5);rgba(99, 99, 99, 0.6);rgba(99, 99, 99, 1)".split(
        ";"
      ),
    arrayColors: [],
    statusAnimation: "stop",
    stop: function () {
      tdLoadingBox.statusAnimation = "stop";
    },
    init: function (a, b) {
      !1 === tdUtil.isUndefined(b) && (tdLoadingBox.speed = b);
      b = /^#[a-zA-Z0-9]{3,6}$/;
      a && b.test(a)
        ? ((a = tdLoadingBox.hexToRgb(a)),
          (a = "rgba(" + a.r + ", " + a.g + ", " + a.b + ", "),
          (tdLoadingBox.arrayColors[7] = a + " 0.9)"),
          (tdLoadingBox.arrayColors[6] = a + " 0.7)"),
          (tdLoadingBox.arrayColors[5] = a + " 0.5)"),
          (tdLoadingBox.arrayColors[4] = a + " 0.3)"),
          (tdLoadingBox.arrayColors[3] = a + " 0.15)"),
          (tdLoadingBox.arrayColors[2] = a + " 0.15)"),
          (tdLoadingBox.arrayColors[1] = a + " 0.15)"),
          (tdLoadingBox.arrayColors[0] = a + " 0.15)"))
        : (tdLoadingBox.arrayColors = tdLoadingBox.arrayColorsTemp.slice(0));
      "stop" === tdLoadingBox.statusAnimation &&
        ((tdLoadingBox.statusAnimation = "display"), this.render());
    },
    render: function (a) {
      tdLoadingBox.animationDisplay(
        '<div class="td-lb-box td-lb-box-1" style="background-color:' +
          tdLoadingBox.arrayColors[0] +
          '"></div><div class="td-lb-box td-lb-box-2" style="background-color:' +
          tdLoadingBox.arrayColors[1] +
          '"></div><div class="td-lb-box td-lb-box-3" style="background-color:' +
          tdLoadingBox.arrayColors[2] +
          '"></div><div class="td-lb-box td-lb-box-4" style="background-color:' +
          tdLoadingBox.arrayColors[3] +
          '"></div><div class="td-lb-box td-lb-box-5" style="background-color:' +
          tdLoadingBox.arrayColors[4] +
          '"></div><div class="td-lb-box td-lb-box-6" style="background-color:' +
          tdLoadingBox.arrayColors[5] +
          '"></div><div class="td-lb-box td-lb-box-7" style="background-color:' +
          tdLoadingBox.arrayColors[6] +
          '"></div><div class="td-lb-box td-lb-box-8" style="background-color:' +
          tdLoadingBox.arrayColors[7] +
          '"></div>'
      );
      a = [
        tdLoadingBox.arrayColors[0],
        tdLoadingBox.arrayColors[1],
        tdLoadingBox.arrayColors[2],
        tdLoadingBox.arrayColors[3],
        tdLoadingBox.arrayColors[4],
        tdLoadingBox.arrayColors[5],
        tdLoadingBox.arrayColors[6],
        tdLoadingBox.arrayColors[7],
      ];
      tdLoadingBox.arrayColors[0] = a[7];
      tdLoadingBox.arrayColors[1] = a[0];
      tdLoadingBox.arrayColors[2] = a[1];
      tdLoadingBox.arrayColors[3] = a[2];
      tdLoadingBox.arrayColors[4] = a[3];
      tdLoadingBox.arrayColors[5] = a[4];
      tdLoadingBox.arrayColors[6] = a[5];
      tdLoadingBox.arrayColors[7] = a[6];
      "display" === tdLoadingBox.statusAnimation
        ? setTimeout(tdLoadingBox.render, tdLoadingBox.speed)
        : tdLoadingBox.animationDisplay("");
    },
    animationDisplay: function (a) {
      jQuery(".td-loader-gif").html(a);
    },
    hexToRgb: function (a) {
      return (a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))
        ? {
            r: parseInt(a[1], 16),
            g: parseInt(a[2], 16),
            b: parseInt(a[3], 16),
          }
        : null;
    },
  };
})();
