/**
 * @description 地址级联
 * @param {*} url - 关联的地址js文件（或json文件）
 * @param {*} prov - 省
 * @param {*} city - 市
 * @param {*} dist - 区
 */
(function ($) {
  $.fn.cascade = function (settings) {
    settings = $.extend({
      url: './city.min.js',
      prov: null,
      city: null,
      dist: null
    }, settings);

    var _this = this;
    // 获取省市区的元素
    var _prov = _this.find('.prov'),
      _city = _this.find('.city'),
      _dist = _this.find('.dist');
    // 获取settings中的值
    var _prov_val = settings.prov,
      _city_val = settings.city,
      _dist_val = settings.dist;
    // jsonData 省市区数据
    var jsonData = {};

    // 初始化城市
    var initCity = function () {
      var city_html = '';
      // 获取当前选中的prov的index值
      var _index = _prov.get(0).selectedIndex;

      // 将city和dist的选择框都选为false
      _city.empty().css('disabled', true);
      _dist.empty().css('disabled', true);

      // 如果_index小于-1或是该省没有城市，那么隐藏city和dist的选择框
      if (_index < -1 || jsonData.citylist[_index].c === undefined) {
        _city.css('display', 'none');
        _dist.css('display', 'none');
        return;
      }

      // 展示当前省的城市列表
      $.each(jsonData.citylist[_index].c, function (i, item) {
        city_html += '<option value="' + item.n + '">' + item.n + '</option>'
      });

      _city.html(city_html);
    };

    // 初始化地区
    var initDist = function () {
      var dist_html = '';
      var _provIndex = _prov.get(0).selectedIndex;
      var _cityIndex = _city.get(0).selectedIndex;

      // 将dist的选择框不可选
      _dist.css('disabled', true);

      // 如果dist不存在，则隐藏该选择框
      if (_provIndex < -1 || _cityIndex < -1 || jsonData.citylist[_provIndex].c[_cityIndex].a === undefined) {
        _dist.css('display', 'none');
      }

      // 显示当前区的城市列表
      $.each(jsonData.citylist[_provIndex].c[_cityIndex].a, function (i, item) {
        dist_html += '<option value="' + item.s + '">' + item.s + '</option>'
      });

      _dist.html(dist_html);
    };

    // change时间
    _prov.change(function () {
      initCity();
    });

    _city.change(function () {
      initDist();
    });

    // 初始化数据
    var init = function () {
      // 首先遍历prov的数据
      var prov_html = '';
      $.each(jsonData.citylist, function (i, item) {
        prov_html += '<option value="' + item.p + '">' + item.p + '</option>';
      });
      _prov.html(prov_html);

      initCityAndDist();
    };

    // 初始化城市和区域
    var initCityAndDist = () => {
      // 如果有传过来省市的话，则选中
      setTimeout(function () {
        if (settings.prov !== null) {
          _prov.val(settings.prov);
          initCity();
          setTimeout(function () {
            if (settings.city !== null) {
              _city.val(settings.city);
            }
            initDist();
            setTimeout(function () {
              if (settings.dist !== null) {
                _dist.val(settings.dist);
              }
            }, 1);
          }, 1);
        }
      }, 1);
    };

    // 初始化jsonData，如果是String类型，那么就调用接口，如果不是string类型就直接引用本地数据
    if (settings.url && typeof settings.url === 'string') {
      $.getJSON(settings.url, function (json) {
        jsonData = json;
        init();
      })
    } else {
      jsonData = settings.url;
      init();
    }
  };
})(jQuery);